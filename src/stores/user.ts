import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type User = {
    name: string,
    role: string
}

type Store = {
    user: User | null,
    setUser: (user: User) => void
    removeUser: () => void
}

const useUserStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        removeUser: () => set({ user: null }),
      }),
      { name: 'UserStore' },
    ),
  ),
);

export default useUserStore;
