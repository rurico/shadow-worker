"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function compute(callback, value, options) {
    if (options === void 0) { options = {}; }
    options.label && console.time("" + options.label);
    if (Worker) {
        return new Promise(function (resolve, reject) {
            try {
                var script = "data:text/javascript;charset=UTF-8,onmessage=(()=>({data})=>postMessage((" + callback.toString() + ")(data)))(postMessage);";
                options.printScript && console.log(script);
                var worker_1 = new Worker(script);
                worker_1.postMessage(value);
                worker_1.onmessage = function (_a) {
                    var data = _a.data;
                    options.label && console.timeEnd("" + options.label);
                    resolve(data);
                    worker_1.terminate();
                };
            }
            catch (e) {
                reject(e);
            }
        });
    }
    else {
        options.label && console.timeEnd("" + options.label);
        return value ? callback(value) : callback();
    }
}
exports.compute = compute;
//# sourceMappingURL=main.js.map