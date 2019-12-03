/**
 * Service used to fetch bundles.
 *
 * @export
 */
export abstract class RequireService {
    /**
     * Fetch a bundle.
     * @memberOf RequireService
     */
    load: (from: any) => Promise<Object>;
}
