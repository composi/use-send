/**
 * @typedef {Object} Message
 * @prop {string} type
 * @prop {any} [data]
 */
/**
 * Function to synthesize the @composi/runtime send function to work with React useReducer hook. It takes one argument, the dispatch function returned by useReduce. This allows you to use the send function with the @composi/runtime union method with React functional components and hooks.
 * @example
 * const [state, dispatch] = useReducer(initialState)
 * const send = sendMessage(dispatch)
 * @param {React.Dispatch<any>} dispatch 
 */
export function useSend(dispatch) {
  if (typeof dispatch !== 'function' || dispatch.name !== 'dispatch') throw new Error(`Was expecting the dispatch function from the useReducer hook.`)
  /**
   * @param {(Function, data?: any) => Message} msg 
   * @param {any} [data] 
   */
  const send = (msg, data) => {
    if (typeof msg !== 'function') throw new Error(`Was expecting a destructured method from a tagged union.`)
    dispatch(msg(data))
  }
  return send
}
