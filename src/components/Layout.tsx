import { NavLink, Outlet } from 'react-router-dom';

const tabs = [
  { to: '/', label: '토크', icon: '💬', end: true },
  { to: '/trends', label: '트렌드', icon: '🔥', end: false },
  { to: '/guide', label: '가이드', icon: '📖', end: false },
  { to: '/closer', label: '친해지기', icon: '🎯', end: false },
  { to: '/saved', label: '저장', icon: '♥', end: false },
];

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 max-w-lg mx-auto w-full px-5 pt-12 pb-6">
        <Outlet />
      </main>

      {/* Spacer for fixed bottom nav */}
      <div className="h-28 shrink-0" />

      <nav
        className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="max-w-lg mx-auto flex">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] no-underline transition-colors ${
                  isActive ? 'text-accent font-bold' : 'text-text-sub'
                }`
              }
            >
              <span className={`text-[18px] transition-transform ${''}`}>{tab.icon}</span>
              {tab.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
