export class ParserError extends Error {
    constructor(public message: string, public fragment: string) {
        super(message)
    }
}

export type ParserCallback = (_ : ParserError) => string;
/**
 * Parses logic inside translations.
 *
 * @export
 */
export abstract class Parser {
    /**
     * Processes a string, isolating logic fragments and compiling them.
     *
     * @memberOf Parser
     */
    compile: (text: string, parameters: any, error?: ParserCallback) => string;
}
