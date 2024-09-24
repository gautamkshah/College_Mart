import {create} from 'zustand'
import { mmkvStorage } from './storage';
import { persist, createJSONStorage } from 'zustand/middleware';


interface authStorage {
    user: Record<string, any> | null;
    setUser: (user:any) => void;
    setCurrentOrder: (user:any) => void;
    currentOrder: Record<string, any> | null;
    logout: () => void;

}

export const useAuthStorage = create<authStorage>()(
    persist (
        (set,get) =>({
            user:null,
            currentOrder: null,
            setCurrentOrder: (order) => set({currentOrder: order}),
            setUser: (user) => set({user: data}),
            logout: () => set({user: null}),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => mmkvStorage),
        }
    ),
)
