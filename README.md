# redux-observable-adapter-rxjs-v4

Use [RxJS v4](https://github.com/Reactive-Extensions/RxJS) with [redux-observable](https://github.com/redux-observable/redux-observable)

## Please upgrade to 100% RxJS v5 ASAP

This library is meant as a stop gap to help ease migration progressively, not as a band-aid for indefinite interop.

## Install

This has a peer dependency of `rx@4.*.*`, which will have to be installed as well.

```sh
npm install --save redux-observable-adapter-rxjs-v4
```

## Usage

This library basically will convert the v5 `ActionsObservable` provided to your Epics into a v4 version. Then the v4 Observable you return will be converted back to v5 inside the middleware.

```js
import v4Adapter from 'redux-observable-adapter-rxjs-v4';

const epicMiddleware = createEpicMiddleware(rootEpic, { adapter: v4Adapter });

// your Epics are now v4 streams

const fetchUserEpic = action$ =>
  action$.ofType(FETCH_USER)
    .select(fetchUserFulfilled); // .select() is a v4-only operator for .map()
```

### Upgrading to RxJS v5

We suggest you upgrade your app to use RxJS v5 as soon as possible. To ease that migration, you can also include the [rxjs-compatibility](https://github.com/jayphelps/rxjs-compatibility) library to start using RxJS v5 in your Epics while you transition the rest of your app away from v4.

After you've run `patchObservables()`, you can opt Epics into v5 (or v4) version with the new operators:

```js
const exampleEpic = action$ =>
  action$.v4().anyV4Operators().v5();
```
