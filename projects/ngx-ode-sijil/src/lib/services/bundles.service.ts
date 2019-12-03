import { RequireService } from './require/require.interface';
import { Parser } from './parser/parser.interface';
import { SijilOpts } from './sijil.opts';

/**
 * Defines a BundlesService, whice is the main entry point for Sijil operations.
 *
 * A BundlesServices has three dependencies :
 * - RequireService : Used to fetch bundles
 * - Parser : Used to parse logic inside bundle values
 * - SijilOpts : An object containing custom settings
 */
export class BundlesService {

    constructor(private requireService: RequireService, private parser: Parser, sijilOpts: SijilOpts) {
        this.defaultLanguage = sijilOpts.defaultLanguage;
        if(!this.defaultLanguage && typeof window !== 'undefined') {
            this.defaultLanguage = window.navigator.language.split('-')[0];
        }
        this.currentLanguage = this.defaultLanguage;
    }

    private bundles: Object = {};
    /**
     * Fallback language.
     */
    defaultLanguage: string;
    /**
     * Current language.
     */
    currentLanguage: string;

    /**
     * Add keys/values to an existing bundle, or create it if missing.
     *
     * @param bundle An object containing translations as key / values.
     * @param lang The language to map the bundle with, or the current langugage if omitted.
     */
    addToBundle(bundle: Object, lang?: string) : void {
        const targetLanguage = lang || this.currentLanguage || this.defaultLanguage || 'en';

        if(!this.bundles[targetLanguage]) {
            this.bundles[targetLanguage] = {};
        }

        this.bundles[targetLanguage] = Object.assign({}, this.bundles[targetLanguage], bundle);

        if(!this.currentLanguage) {
            this.currentLanguage = lang;
        }
    }

    /**
     * Loads a bundle and associates it with a language.
     * If the target language already contains key/values, then we mixin the new bundle and the existing one.
     *
     * @param where The path, or whatever the RequireService needs to fetch the bundle.
     * @param lang The target language, or the current language if omitted.
     * @returns A Promise, because the RequireService can be (is - by default) asynchronous.
     */
    loadBundle(where, lang?: string) : Promise<void> {
        return this.requireService.load(where)
            .then(bundle => {
                this.addToBundle(bundle, lang);
            })
    }
    /**
     * Loads multiple bundles and associates then with a language.
     *
     * @see {@link loadBundle}
     */
    loadBundles(specs: { lang: string, where: any }[]): Promise<void[]> {
        return Promise.all(specs.map((spec) => {
            return this.loadBundle(spec.where, spec.lang);
        }))
    }

    /**
     * Removes a bundle from the bundles list.
     *
     * @param lang Language to remove.
     */
    unloadBundle(lang: string): void {
        delete this.bundles[lang];
    }

    /**
     * @returns Returns a list of all loaded languages.
     */
    getLoadedLanguages() : string[] {
        return Object.keys(this.bundles);
    }

    /**
     * Translates a single key into a target language, using the parameters provided if needed.
     *
     * @param key Key to translate
     * @param parameters Parameters to use if the translation contains logic.
     * @param lang Target language, of the current language if omitted.
     * @returns The computed translation, or the key if no match was found in the bundles (including the fallback language bundle).
     */
    translate(key: string, parameters?: Object | any[], lang?: string) : string {
        const targetLanguage = lang || this.currentLanguage;

        const rawTranslation : string = this.bundles[targetLanguage] &&
            this.bundles[targetLanguage][key] ||
            this.defaultLanguage &&
            this.bundles[this.defaultLanguage] &&
            this.bundles[this.defaultLanguage][key] ||
            key;

        if(rawTranslation !== key && parameters) {
            return this.parser.compile(rawTranslation, parameters, (e) => { console.error(e); return key; });
        } else {
            return rawTranslation;
        }
    }
}
