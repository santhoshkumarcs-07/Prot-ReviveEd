'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Binoculars,
  Brain,
  Bug,
  Trophy,
  ChartLineUp,
  GearSix,
  SignOut,
  List,
  X,
  Bell,
  UserCircle,
} from '@phosphor-icons/react';

interface StudentLayoutShellProps {
  children: ReactNode;
  studentName?: string;
}

const NAV_ITEMS = [
  { href: '/student/home', label: 'Explore', icon: Compass },
  { href: '/student/explore', label: 'Discover', icon: Binoculars },
  { href: '/student/thinking', label: 'Thinking', icon: Brain },
  { href: '/student/bugs', label: 'Bugs', icon: Bug },
  { href: '/student/showcase', label: 'Showcase', icon: Trophy },
  { href: '/student/progress', label: 'Progress', icon: ChartLineUp },
];

const BOTTOM_ITEMS = [
  { href: '/student/settings', label: 'Settings', icon: GearSix },
];

export default function StudentLayoutShell({
  children,
}: StudentLayoutShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-[100dvh] bg-[var(--color-surface)] text-[var(--color-ink)]">
      {/* ---- Desktop Sidebar ---- */}
      <aside className="hidden lg:flex flex-col w-[248px] border-r border-white/[.07] bg-[#111112] shrink-0">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/[.06]">
          <Link href="/student/home" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[10px] bg-[var(--color-amber)] flex items-center justify-center shadow-[0_0_20px_rgba(255,107,61,.25)]">
              <span className="text-[#171312] font-bold text-sm">R</span>
            </div>
            <span className="text-heading text-lg">ReviveEd</span>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)]
                  text-sm font-medium
                  transition-colors duration-[var(--duration-fast)]
                  ${isActive
                    ? 'bg-[var(--color-amber)]/15 text-[var(--color-amber-soft)] shadow-[inset_3px_0_0_var(--color-amber)]'
                    : 'text-[var(--color-gray-500)] hover:text-[var(--color-ink)] hover:bg-white/[.04]'
                  }
                `}
              >
                <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-5 space-y-1 border-t border-white/[.06] pt-4">
          {BOTTOM_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-gray-600)] hover:text-[var(--color-ink)] hover:bg-[var(--color-gray-100)] transition-colors"
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
          <button
            className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-gray-600)] hover:text-[var(--color-coral)] hover:bg-[var(--color-coral)]/5 transition-colors w-full"
          >
            <SignOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ---- Main Content ---- */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/[.07] bg-[#111112]">
          <Link href="/student/home" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[var(--radius-sm)] bg-[var(--color-ink)] flex items-center justify-center">
              <span className="text-[var(--color-surface)] font-bold text-xs">R</span>
            </div>
            <span className="text-heading text-base">ReviveEd</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-[var(--radius-sm)] hover:bg-[var(--color-gray-100)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/30" onClick={() => setMobileMenuOpen(false)}>
            <nav
              className="absolute top-0 right-0 w-[280px] h-full bg-[var(--color-surface-raised)] shadow-[var(--shadow-xl)] p-4 space-y-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-[var(--radius-sm)] hover:bg-[var(--color-gray-100)]"
                >
                  <X size={20} />
                </button>
              </div>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-[var(--radius-md)]
                      text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-[var(--color-ink)] text-[var(--color-surface)]'
                        : 'text-[var(--color-gray-600)] hover:text-[var(--color-ink)] hover:bg-[var(--color-gray-100)]'
                      }
                    `}
                  >
                    <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Desktop utility header */}
        <header className="hidden lg:flex h-[72px] items-center justify-between px-8 border-b border-white/[.07] bg-[#101011]/80">
          <div className="flex items-center gap-2 text-sm text-[var(--color-gray-500)]">
            <span>Workspace</span><span className="text-[var(--color-gray-300)]">/</span><span className="text-[var(--color-ink)]">{pathname.split('/').filter(Boolean).pop() || 'home'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-[var(--radius-sm)] text-[var(--color-gray-500)] hover:text-[var(--color-ink)] hover:bg-white/[.05] transition-colors" aria-label="Notifications"><Bell size={19} /></button>
            <div className="h-7 w-px bg-white/[.08]" />
            <button className="flex items-center gap-2 text-sm text-[var(--color-gray-600)] hover:text-[var(--color-ink)] transition-colors"><UserCircle size={25} weight="duotone" /><span>Profile</span></button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden flex items-center justify-around border-t border-white/[.07] bg-[#111112] px-2 py-2 shrink-0">
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-[var(--radius-sm)]
                  text-[10px] font-medium transition-colors
                  ${isActive
                    ? 'text-[var(--color-ink)]'
                    : 'text-[var(--color-gray-400)]'
                  }
                `}
              >
                <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </main>
    </div>
  );
}
