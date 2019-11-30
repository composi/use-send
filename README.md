# @composi/useSend

## Send Messages

This is a hook for use with React functional components. Its sole purpose is to be used with the `union` method from `@composi/runtime`.

Using this with `union` and `useReducer` allows you to set up a state management solution similar to the Elm Architecture as implemented in `@composi/runtime`. It gives you a simple messaging loop that provides robust state management through tagged unions.

To make `send` work, you need to pass it the `dispatch` function returned by `useReducer`.

Example:

```javascript
import React, {userReducer} from 'react'
import {union} from '@composi/runtime/src/union'
import {useSend} from '@composi/use-send'

const initialState = {count: 0};

const {match, increment, decrement, reset} = union('increment', 'decrement', 'reset')

const actions = (state, msg) => match(msg, {
  increment: () => ({count: state.count + 1}),
  decrement: () => ({count: state.count - 1}),
  reset: () => ({count: 0})
})

function Counter() {
  const [state, dispatch] = useReducer(actions, initialState)
  // Convert dispatch to send:
  const send = useSend(dispatch)
  return (
    <>
      Count: {state.count}
      <button onClick={() => send(decrement)}>-</button>
      <button onClick={() => send(increment)}>+</button>
      <button onClick={() => send(reset)}>Reset</button>
    </>
  );
}
```

## Using send

`send` takes upto two parameters: a tagged union function and some optiona data as a payload. The tagged untion functions are destructured from the message object returned by the `union` function: 

```javascript
const {match, increment, decrement} = union('increment', 'decrement')
```

With these we can send them as the first argument of `send`:

```javascript
onClick={() => send(decrement)}
```
The `send` function takes that and calls it. Doing so returns a message object of this format:

```javascript
{
  type: 'whatever',
  data: 'stuff'
}
```

Data is an optional property. To get data in the message, you pass it as the second argument of `send`:

```javascript
onClick={() => send(increment, 5)}
```

Sending this message will return the following object:

```javascript
{
  type: 'increment',
  data: 5
}
```

You would use the `match` function destructured from the messages object to match the message to an action:

```javascript
const actions = (state, msg) => match(msg, {
  increment: () => ({count: state.count + 1}),
  decrement: () => ({count: state.count - 1}),
  reset: () => ({count: 0})
})
```
