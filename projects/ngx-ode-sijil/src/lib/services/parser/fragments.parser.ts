import { Parser, ParserCallback, ParserError } from './parser.interface';

/**
 * The default Sijil parser.
 *
 * - Input : bundle value (translation) + parameters (Object or Array)
 * - Output : compiled translation
 *
 * Logic is contained inside mustache blocks : {{ LOGIC BLOCK }}
 *
 * There are two variants :
 *  - A single parameter key (when the params are contained inside an object) or index (params contained inside an array)
 *
 * Examples:
 *
 * {{ key }} + { "key" : "my key" } = my key
 *
 * {{ 1 }} + [1, 2] = 2
 *
 *  - A ternary-like condition
 *
 * {{ condition ? trueValue : falseValue }}
 * Where condition may be : a single parameter key/index, or 2 clauses with the following operators : ==, >, =>, <=, <
 *
 * Examples:
 *
 * (the $ sign to refer to a variable is mandatory when a clause contains more than 1 word)
 *
 * {{ count > 1 ? $count cats : 1 cat }} + {"count": 10} = 10 cats
 * {{ 1 < count ? $count cats : 1 cat }} + {"count": 1} = 1 cat
 *
 * @export
 */
// @dynamic
export class FragmentsParser implements Parser {

    constructor(){}

    private static delimiters: string[] = ['{{', '}}'];
    private static delimRegexp = new RegExp(`${FragmentsParser.delimiters[0]}[^}]+${FragmentsParser.delimiters[1]}`, 'gm');

    private static defaultErrorCallback: ParserCallback = (e: ParserError) => {
        console.error(e);
        return e.fragment;
    }

    private getParameter(parameters: Object | any[], fragment: string, strict?: boolean): string {
        const splittedFrag = fragment.split(/\s+/);
        if(splittedFrag.length === 1) {
            return fragment[0] === '$' ?
                parameters[fragment.substr(1)] :
                strict ?
                    fragment :
                    parameters[fragment] !== undefined ?
                        parameters[fragment] :
                        fragment;
        }
        return fragment.split(/\s+/).reduce((l, r) => {
            l.push(r[0] === '$' ? parameters[r.substr(1)] : r);
            return l;
        }, []).join(' ');
    }

    private compileFragment(fragment: string, parameters: Object | any[]): string {
        fragment = fragment.replace(/{{|}}/g, '');

        let interrogationIndex;
        let dotsIndex;
        if ((interrogationIndex = fragment.indexOf('?')) > 0 && (dotsIndex = fragment.lastIndexOf(':')) > 1) {
            const condition = fragment.substring(0, interrogationIndex).trim();
            const trueReturn = fragment.substring(interrogationIndex + 1, dotsIndex).trim();
            const falseReturn = fragment.substring(dotsIndex + 1).trim();
            const computedTrueReturn = this.getParameter(parameters, trueReturn);
            const computedFalseReturn = this.getParameter(parameters, falseReturn);

            const splittedCondition = condition.split(/\s+/);

            if (splittedCondition.length === 1) {

                // Single variable case

                const variable = parameters[splittedCondition[0]];

                return variable ?
                    computedTrueReturn :
                    computedFalseReturn;

            } else if (splittedCondition.length === 3) {

                // Operator case

                const leftHandParam = this.getParameter(parameters, splittedCondition[0], parameters instanceof Array);
                const rightHand = this.getParameter(parameters, splittedCondition[2], parameters instanceof Array);
                const comparisonOperator = splittedCondition[1];

                switch (comparisonOperator) {
                    case '==':
                        return leftHandParam === rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    case '>':
                        return leftHandParam > rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    case '>=':
                        return leftHandParam >= rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    case '<':
                        return leftHandParam < rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    case '<=':
                        return leftHandParam <= rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    default:
                        throw new ParserError(`Invalid conditional operator for fragment : ${fragment}`, fragment);
                }

            } else {
                throw new ParserError(`Invalid condition for fragment : ${fragment}`, fragment);
            }
        } else {
            fragment = fragment.trim();
            return parameters[fragment];
        }
    }

    compile(rawTranslation: string, parameters: Object, onError?: ParserCallback): string {

        const parts = rawTranslation.split(FragmentsParser.delimRegexp);
        const fragments = rawTranslation.match(FragmentsParser.delimRegexp);

        let compiledTranslation = '';

        if (!onError) {
            onError = FragmentsParser.defaultErrorCallback;
        }

        if (!fragments) {
            compiledTranslation += rawTranslation;
        } else {
            for (let i = 0; i < parts.length; i++) {
                compiledTranslation += parts[i];
                if (i > fragments.length - 1) {
                    continue;
                }
                try {
                    compiledTranslation += this.compileFragment(fragments[i], parameters);
                } catch (e) {
                    compiledTranslation += onError(e);
                }
            }
        }

        return compiledTranslation;

    }

}
