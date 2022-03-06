import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? true : !!value);
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (!isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
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
