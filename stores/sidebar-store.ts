import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  isExpanded: boolean;
  toggleSidebar: () => void;
  setSidebarExpanded: (expanded: boolean) => void;
}

interface ContactsStore {
  isExpanded: boolean;
  toggleContacts: () => void;
  setContactsExpanded: (expanded: boolean) => void;
}

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isExpanded: true,
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setSidebarExpanded: (expanded: boolean) => set({ isExpanded: expanded }),
}));

export const useContactsStore = create<ContactsStore>((set) => ({
  isExpanded: false,
  toggleContacts: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setContactsExpanded: (expanded: boolean) => set({ isExpanded: expanded }),
}));

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    },
  ),
);
