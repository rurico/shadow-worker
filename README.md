# shadow-worker

[![NPM version](https://img.shields.io/badge/npm-0.0.1-brightgreen.svg)](https://www.npmjs.com/package/shadow-worker)
[![License](https://img.shields.io/github/license/TenkaiRuri/compute.svg)](https://github.com/TenkaiRuri/compute)

Use the performance capabilities of `web worker` in the browser to avoid blocking the main thread

### Usage:

```js
npm i shadow-worker #or
npm install shadow-worker --save
```

### Example:

#### async/await

```js
import { compute } from 'shadow-worker';

await compute(() => [1, 2, 3, 4].map(x => x * 2));
// [2,4,6,8]

const fn = arr => arr.map(x => x * 2);

await compute(fn, [1, 2, 3, 4]);
// [2,4,6,8]

// # debug options
await compute(fn, [1, 2, 3, 4], { label: 'fn', printScript: true });
// data:text/javascript;charset=UTF-8,onmessage=(()=>({data})=>postMessage((arr => {arr.map(x=>x*2)})(data)))(postMessage);
// fn: 16.487060546875ms
// [2, 4, 6, 8]
```

#### Promise then

```js
import { compute } from 'shadow-worker';

compute(() => [1, 2, 3, 4].map(x => x * 2)).then(console.log);
// [2, 4, 6, 8]
```

### Browser test

<div style="text-align:center">
<!-- <figure> -->
  <img src="res/DA9E8612C96139720D80BFBB1A5DD184.jpg" height="500">
  <span>use compute() api</span>
<!-- </figure> -->
</div>

<div style="text-align:center">
<!-- <figure> -->
  <img src="res/CABA5DEE15143DE172EC75B328C46AD2.jpg" height="500">
  <span>not use</span>
<!-- </figure> -->
</div>

## API:

### compute()

```ts
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
```

Note: Just in browser **_node.js_** side can't use

## TODO

- [ ] add test case
- [ ] spuer node side