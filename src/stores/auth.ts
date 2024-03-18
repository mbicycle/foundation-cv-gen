import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { AuthState } from 'utils/const';

type Store = {
    state: AuthState
    setState: (newState: AuthState) => void
}

const useAuthStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        state: AuthState.Loading,
        setState: (newSate) => set({ state: newSate }),
      }),
      { name: 'AuthStore' },
    ),
  ),
);

export default useAuthStore;
