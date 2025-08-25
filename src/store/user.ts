//https://github.com/pmndrs/zustand
import { create } from "zustand"

import { IUser } from "@/utils/types"

interface IUserState {
  user: null | IUser;
  // permissions: string[] | []; 
  setUser: (user: null | IUser) => void;
  // setPermissions: (permissions: string[]) => void;
}
const userStore = create<IUserState>((set) => ({
  user: null,
  // permissions: [],
  setUser: (user) => set({ user }),
  // setPermissions: (permissions) => set({ permissions }),
}))

export default userStore


