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
export function useSend(dispatch: import("react").Dispatch<any>): (msg: (Function: any, data?: any) => Message, data?: any) => void;
export type Message = {
    type: string;
    data?: any;
};
