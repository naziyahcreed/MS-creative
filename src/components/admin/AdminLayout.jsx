import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import StatusBanner from './StatusBanner'
import './admin.css'

export default function AdminLayout({ children }) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { to: '/admin', label: 'Overview', icon: '✦' },
    { to: '/admin/templates', label: 'Template Gallery', icon: '❖' },
    { to: '/admin/create', label: 'Create Invitation', icon: '✚' },
    { to: '/admin/manage', label: 'Manage Invitations', icon: '🗂' },
  ]

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="admin-theme min-h-screen flex flex-col bg-[#faf7f2] text-[#251d18]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#e6dcce] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#c5a869] to-[#8c6d34] flex items-center justify-center text-[#ffffff] font-serif text-xl font-bold shadow-md shadow-[#c5a869]/20 group-hover:scale-105 transition-transform">
                MS
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#251d18] tracking-wide leading-tight">
                  MS CREATIVE
                </h1>
                <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#8c6d34] font-medium">
                  Wedding Invitation Management System
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5 bg-[#f4ece0]/70 p-1.5 rounded-xl border border-[#e6dcce]">
              {navLinks.map((link) => {
                const active = isActive(link.to)
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 ${
                      active
                        ? 'bg-[#ffffff] text-[#1a1411] shadow-xs border border-[#c5a869]/40'
                        : 'text-[#63544b] hover:text-[#1a1411] hover:bg-[#ffffff]/50'
                    }`}
                  >
                    <span className="text-[#c5a869]">{link.icon}</span>
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Quick Action Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/admin/create"
                className="hidden sm:inline-flex btn-gold-primary text-xs py-2 px-4 shadow-sm"
              >
                <span>✚</span> New Invitation
              </Link>

              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="md:hidden p-2 rounded-lg border border-[#e6dcce] text-[#251d18] hover:bg-[#f4ece0]"
                aria-label="Toggle Navigation Menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen ? (
          <div className="md:hidden bg-[#ffffff] border-b border-[#e6dcce] px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.to)
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                    active
                      ? 'bg-[#f7f1e4] text-[#8c6d34] font-semibold'
                      : 'text-[#63544b] hover:bg-[#faf7f2]'
                  }`}
                >
                  <span className="mr-2 text-[#c5a869]">{link.icon}</span>
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-2">
              <Link
                to="/admin/create"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-gold-primary text-xs py-2.5 text-center block"
              >
                ✚ New Invitation
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      {/* Persistence Status Alert */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
        <StatusBanner />
      </div>

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#e6dcce] bg-[#ffffff] py-6 px-4 text-center text-xs text-[#75675e]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-serif tracking-wider text-[#3d2e25]">
            © MS Creative Wedding Invitations • Project-Based Local Storage Architecture
          </p>
          <p className="text-[11px] text-[#8c7a6e]">
            Local Folder Mode: <code className="bg-[#f4ece0] px-1.5 py-0.5 rounded text-[#251d18]">public/invitations/</code>
          </p>
        </div>
      </footer>
    </div>
  )
}
