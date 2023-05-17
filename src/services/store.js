import { create } from "zustand";

export const useCurrentUser = create((set) => ({
  currentUser: null,
  setCurrentUser: (value) => set({ currentUser: { ...value } }),
}));

export const useUserList = create((set, get) => ({
  userList: [],
  isLoading: false,
  error: null,
  page: 1,
  setUserList: (value) => set({ userList: [...value] }),

  addUserList: (value) => {
    if (value.length > 0) {
      set((state) => ({
        userList: [...state.userList, ...value],
        page: state.page + 1,
      }));
    }
  },

  setFollowing: (value) => {
    set((state) => ({
      userList: [
        ...state.userList.map((user) => {
          if (user.id !== value.id) {
            return { ...user };
          } else {
            let fls = user.followers;
            value.following ? (fls += 1) : (fls -= 1);
            return { ...user, following: value.following, followers: fls };
          }
        }),
      ],
    }));
  },

  setIsLoading: (value) => set({ isLoading: value }),
  setError: (value) => set({ error: value }),
  incPage: () => set((state) => ({ page: state.page + 1 })),
  setPage: (value) => set({ page: value }),
  getPage: () => {
    return get().page;
  },
}));

export const useFilter = create((set) => ({
  filter: "all",
  setFilter: (value) => set({ filter: value }),
}));
