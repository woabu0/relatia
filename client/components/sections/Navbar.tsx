'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import Logo from '../icons/Logo';
import { NAV_LINKS } from '../../lib/constants';

export default function Navbar() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-slate-900/80 backdrop-blur-md'
      } border-b border-slate-800`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 md:h-14 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium relative group px-2 md:px-3 py-1.5 rounded-lg hover:bg-slate-800/50"
              >
                {link.name}
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </a>
            ))}
            {user ? (
              <Link
                href="/dashboard"
                className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-3 md:px-5 py-1.5 text-xs md:text-sm font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-3 md:px-5 py-1.5 text-xs md:text-sm font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/50 py-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-2 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800/50">
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800 text-center shadow-lg shadow-blue-500/30"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800 text-center shadow-lg shadow-blue-500/30"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

