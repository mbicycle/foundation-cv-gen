export const getKeyOf = <T>(value: keyof T): keyof T => value;

export type Debaunce<R extends CallableFunction> = {
  handleChange: R;
  cancel: VoidFunction;
};

type DebaunceReturnType<K extends []> = {
  handleChange: (...args: K) => void, cancel: VoidFunction;
};

export function debounce<R extends CallableFunction, K extends []>(cb: R, wait = 20): DebaunceReturnType<K> {
  let handleChange: NodeJS.Timeout;
  const callable = (...args: K): void => {
    clearTimeout(handleChange);
    handleChange = setTimeout(() => cb(...args), wait);
  };
  const cancel = (): void => {
    if (handleChange) clearTimeout(handleChange);
  };
  return {
    handleChange: callable,
    cancel,
  };
}
