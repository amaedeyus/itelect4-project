import { NavLink, Outlet } from "react-router";

import { useAuthStore } from "../store/authStore";
import { useUIStore } from "../store/uiStore";

function Layout() {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);

  const token = useAuthStore((state) => state.token);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  const navLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }): string =>
    `rounded px-3 py-2 text-sm font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
        <nav className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div>
              <NavLink
                to="/"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                Campus Lost & Found
              </NavLink>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <NavLink
                to="/"
                end
                className={navLinkClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/items"
                className={navLinkClass}
              >
                Items
              </NavLink>

              <NavLink
                to="/claims"
                className={navLinkClass}
              >
                Claims
              </NavLink>

              {!token ? (
                <NavLink
                  to="/login"
                  className={navLinkClass}
                >
                  Login
                </NavLink>
              ) : (
                <button
                  onClick={logout}
                  className="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Logout ({userName})
                </button>
              )}

              <button
                onClick={toggleDarkMode}
                className="rounded bg-gray-800 px-3 py-2 text-sm text-white hover:bg-black dark:bg-gray-200 dark:text-gray-900"
              >
                {isDarkMode ? "☀ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;