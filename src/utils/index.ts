import { useEffect, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === '';
/* 
// object类型是所有的类型
let a: object;
a = { name: 'jack' };
a = () => {};
a = new RegExp('');

// 如果是一个函数结构的时候没有意义
{...()=>{}}
 */
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/* export const debounce = (func, delay) => {
  let timeout;
  return (...param) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    setTimeout(() => {
      func(...param);
    }, delay);
  };
};
 */
export const useDebounce = <V>(value: V, delay?: number): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);

  const add = (item: T) => {
    setValue([...value, item]);
  };

  const clear = () => {
    setValue([]);
  };

  const removeIndex = (index: number) => {
    const copy = [...value];
    copy.splice(index, 1);
    setValue(copy);
  };
  return {
    value,
    clear,
    removeIndex,
    add,
  };
};

export const useDocumentTitle = (title: string, keepUnmount: boolean) => {
  const oldTitle = document.title
  console.log('渲染时的title', oldTitle);
  
  useEffect(()=>{
    document.title = title
  },[title])

  useEffect(()=>{
    return ()=>{
      if(!keepUnmount){
        document.title = oldTitle
        console.log('卸载时的title', oldTitle);
      }
    }
  },[])
};
