/**
 * debug options
 * @interface debugOptions
 */
export interface debugOptions {
    label?: string;
    printScript?: boolean;
}
/**
 * You can easily use `web worker`.
 * Using `web worker` is as easy as using a function, as natural as breathing.
 * The function will `dynamically` help you generate functions that communicate with the worker channel
 * It will be automatically closed when you are finished, so you don't have to worry about the performance problems.
 *
 * @template T
 * @param {(value?: T) => T} callback Function used for `calculation`
 * @param {T} [value] Parameters used for calculation
 * @param {debugOptions} [options={}] Debug option label:`string`,printScript:`boolean`
 * @returns {(Promise<T> | T)} Calculated result
 */
export declare function compute<T>(callback: (value?: T) => T, value?: T, options?: debugOptions): Promise<T> | T;
