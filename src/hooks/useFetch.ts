import React, { useEffect, useReducer, useRef } from 'react';

// Maintains its own state
// Use Reducers to dispatch an action
// Update the state
// Use Cache to store data
// Prevent state updates when component is unmounting

export interface State<T> {
  data?: T;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

/**
 *
 */
function useFetch<T = unknown>(
  url?: string,
  refetch?: boolean,
  options?: RequestInit
): State<T> {
  const cache = useRef<Cache<T>>({});
  const initialState: State<T> = {
    error: undefined,
    data: undefined
  };

  const reducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({ type: 'fetched', payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = (await response.json()) as T;
        cache.current[url] = data;

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        dispatch({ type: 'error', payload: error as Error });
      }
    };
    fetchData();
  }, [url, refetch]);

  return initialState;
}

export default useFetch;
