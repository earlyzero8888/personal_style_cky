import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: '홈', emoji: '🏠' },
  { to: '/categories', label: '카테고리', emoji: '📂' },
  { to: '/saved', label: '저장함', emoji: '🔖' },
];

export default function Layout() {
  return (
    <div className="flex flex-col min-h-dvh">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl">💬</span>
            <h1 className="text-lg font-bold text-text">톡메이트</h1>
          </NavLink>
          <p className="text-xs text-text-secondary">스몰토크 도우미</p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-5">
        <Outlet />
      </main>

      {/* Bottom Nav */}
      <nav className="bg-white border-t border-border sticky bottom-0 z-50">
        <div className="max-w-lg mx-auto flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-2.5 text-xs no-underline transition-colors ${
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-text-secondary'
                }`
              }
            >
              <span className="text-xl mb-0.5">{item.emoji}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
