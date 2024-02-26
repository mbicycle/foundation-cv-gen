import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Store = {
    guestToken: string | null
    setGuestToken: (token: string) => void
    clearGuestToken: () => void
}

const useGuestTokenStore = create<Store>()(
  devtools(
    (set) => ({
      guestToken: null,
      setGuestToken: (token) => set({ guestToken: token }),
      clearGuestToken: () => set({ guestToken: null }),
    }),
    { name: 'GuestTokenStore' },
  ),
);

export default useGuestTokenStore;
