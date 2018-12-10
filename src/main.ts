/**
 * debug options
 * @interface debugOptions
 */
export interface debugOptions {
  label?: string;
  printScript?: boolean;
}

export function compute<T>(callback: (value?: T) => T): Promise<T>;
export function compute<T>(callback: (value?: T) => T, value: T): Promise<T>;
export function compute<T>(callback: (value?: T) => T, options: debugOptions): Promise<T>;
export function compute<T>(callback: (value?: T) => T, value: T, options: debugOptions): Promise<T>;

export function compute<T>(callback: (value?: T) => T, cb: (value: T) => void): void;

export function compute<T>(callback: (value?: T) => T, value: T, options: debugOptions, cb: (value: T) => void): void;

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
export function compute<T>(callback: (value?: T) => T, value?: T, options: debugOptions = {}, cb?: (value?: T) => void): Promise<T> | T {
  if (value instanceof Object && (value['label'] || value['printScript'])) {
    options = value;
  }
  if (value instanceof Function) {
    cb = value as any;
  }
  options.label && console.time(`${options.label}`);
  if (Worker) {
    return new Promise((resolve, reject) => {
      try {
        const script = `data:text/javascript;charset=UTF-8,onmessage=(()=>({data})=>postMessage((${callback.toString()})(data)))(postMessage);`;
        options.printScript && console.log(script);
        const worker = new Worker(script);
        value && worker.postMessage(value);
        worker.onmessage = ({ data }) => {
          options.label && console.timeEnd(`${options.label}`);
          resolve(data);
          worker.terminate();
        };
      } catch (e) {
        reject(e);
      }
    });
  } else {
    options.label && console.timeEnd(`${options.label}`);
    return value ? callback(value) : callback();
  }
}
