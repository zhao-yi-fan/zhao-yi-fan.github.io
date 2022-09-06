import { useState } from 'react';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  data: null,
  error: null,
  stat: 'idle',
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      stat: 'success',
      data,
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      stat: 'error',
      data: null,
      error,
    });

  // run用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 promise 类型数据');
    }

    setState({ ...state, stat: 'loading' });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        // catch会劫持异常，不主动抛出，外面是接收不到异常的
        setError(error);
        if (config.throwOnError) return Promise.reject(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state,
  };
};
