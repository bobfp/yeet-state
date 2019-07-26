# Yeet

Yeet is a fast, boilerplate-free, state management library for JavaScript applications.

It is also:

 * Dependency-Free

 * Tiny (1.3KB)

 * Easy To Learn


## Why use Yeet?

Redux is a fantastic library, but it isn't ideal for every application. The amount of boilerplate makes smaller application tedious to develop.

With the advent of the React Hooks API, larger apps are starting to move away from a "pure global state" model to a more hybrid, nuanced approach where developers might find redux to be overkill.

Yeet is designed for these use cases -- to fill in the gaps in applications that strive for a happy medium between pure component state and pure global state.  

## Basic Concepts

Yeet is based around creating functions that read from a global store, and write to the global store.

In order to improve performance, and partition state data, the store is composed of one or more "atoms", which are just simple JavaScript objects. When a subscription is created, it's not to the entire store, but to a specific atom.

Likewise, when the store is written to, the function is only applied to the state inside the specified atom.

## Using Yeet

`yarn add @bobfp/yeet-state`

You will probably want to use the [React Bindings](https://github.com/bobfp/yeet-react) to interact with a yeet store, but here is a quick example of the low-level API

```js
import {createStore} from 'yeet-state';

const user = {
  name: 'Bob', 
  type: 'Meat Popsicle',
  age: 32
}

const counter = {value: 0}

// createStore returns a store, with atoms corresponding 
// to the keys of the supplied object.
const store = createStore({user, counter});

console.log(store.getAtom('user').age)
// 32

store.subscribe('user')(user => console.log(user.age))

store.publish('user')(user => {...user, age: user.age + 1})
// 33
```
