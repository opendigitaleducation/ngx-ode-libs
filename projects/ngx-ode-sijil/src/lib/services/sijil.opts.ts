/**
 * Contains Sijil options.
 *
 * @export
 */
export abstract class SijilOpts {
    /** Fallback language when a translation is not available in the current language. */
    defaultLanguage: string;
}

export let defaultSijilOpts : SijilOpts = {
    defaultLanguage: window ? window.navigator.language.split('-')[0] : undefined
};
