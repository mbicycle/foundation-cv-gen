import { useEffect } from 'react';

const useBeforeUnload = (when: boolean): void => {
  useEffect(() => {
    const message = 'Changes that you made may not be saved.';
    const handleBeforeUnload = (event: BeforeUnloadEvent): string => {
      event.preventDefault();
      // eslint-disable-next-line no-param-reassign
      event.returnValue = message;
      return message;
    };

    if (when) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [when]);
};

export default useBeforeUnload;
