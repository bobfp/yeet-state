# Yeet

Yeet is a fast, boilerplate-free, state management library for JavaScript applications.

It is also:

 * Dependency-Free

 * Tiny (1.3KB)

 * Easy To Learn

   

## Why use Yeet?

Redux is a fantastic library, but it's ideal for every application. The amount of boilerplate makes smaller application tedious to develop. 

With the advent of the React Hooks API, larger apps are starting to move away from a "pure global state" model to a more hybrid nuanced approach. In these applications, developers might find redux to be overkill.

Yeet is designed for these use cases -- to fill in the gaps in applications that strive for a happy medium between pure component state and pure global state.  



## Using Yeet

You will probably want to use the react bindings to interact with a yeet store, but here is a quick example of the low-level API

```js
import {createStore} from 'yeet-state';

const user = {
  name: 'Bob', 
  type: 'Meat Popsicle',
  age: 32
}

const store = createStore({user});

console.log(store.getAtom('user').age)
// 32

store.subscribe('user')(user => console.log(user.age))

store.publish('user')(user => {...user, age: user.age + 1})
// 33
```
