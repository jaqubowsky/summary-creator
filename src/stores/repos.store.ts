import { create } from 'zustand';

interface ReposStore {
  repos: string[];
  addRepo: (repo: string) => void;
  removeRepo: (repo: string) => void;
}

const useReposStore = create<ReposStore>((set) => ({
  repos: [],
  addRepo: (repo: string) => {
    if (repo === '') return;

    set((state) => {
      if (state.repos.includes(repo)) return state;

      return {
        repos: [...state.repos, repo],
      };
    });
  },
  removeRepo: (repo: string) => {
    set((state) => ({
      repos: state.repos.filter((r) => r !== repo),
    }));
  },
}));

export { useReposStore };
