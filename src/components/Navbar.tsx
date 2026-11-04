import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShoppingBag, Utensils, Lock } from 'lucide-react';
import { RestaurantSettings } from '../types/restaurant';

interface NavbarProps {
  settings: RestaurantSettings;
  onOpenAdmin: () => void;
  onOrderOnlineClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ settings, onOpenAdmin, onOrderOnlineClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Online Order', href: '#online-order' },
    { label: 'Train Food', href: '#train-food' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#183B2B]/95 backdrop-blur-md shadow-lg shadow-black/15 py-3 border-b border-[#24533C]'
          : 'bg-gradient-to-b from-[#102B1F]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-3 group whitespace-nowrap shrink-0 text-white"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8C547] flex items-center justify-center text-[#183B2B] shadow-sm font-serif font-bold text-lg">
              <Utensils className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#FAF8F5] group-hover:text-[#E8C547] transition-colors leading-tight">
                {settings.name}
              </span>
              <span className="text-[11px] font-telugu text-[#E8C547] font-medium leading-none">
                {settings.teluguName}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-emerald-100/90">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#E8C547] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E8C547] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Call */}
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-emerald-100 hover:text-white px-3 py-2 rounded-lg bg-[#24533C]/70 hover:bg-[#24533C] transition-colors whitespace-nowrap shrink-0"
              title="Call Sri Sai Ramana Hotel"
            >
              <Phone className="w-3.5 h-3.5 text-[#E8C547]" />
              <span className="tabular-nums">{settings.phone}</span>
            </a>

            {/* Highlighted Order Online CTA */}
            <button
              onClick={onOrderOnlineClick}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#183B2B] bg-[#E8C547] hover:bg-[#F2D368] active:scale-[0.98] rounded-lg shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Online</span>
            </button>

            {/* Owner Admin Access Button */}
            <button
              onClick={onOpenAdmin}
              className="p-2 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800/40 transition-colors"
              title="Owner Admin Dashboard"
              aria-label="Owner Admin Dashboard"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-emerald-100 hover:text-white rounded-lg hover:bg-emerald-800/40 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#183B2B] border-b border-[#24533C] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-emerald-100 hover:text-white hover:bg-[#24533C]/60 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#24533C] flex flex-col gap-2.5">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-emerald-100 bg-[#24533C] rounded-lg"
            >
              <Phone className="w-4 h-4 text-[#E8C547]" />
              <span>Call: {settings.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderOnlineClick();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-[#183B2B] bg-[#E8C547] rounded-lg shadow"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Online (Swiggy / Zomato)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-1.5 w-full py-2 text-xs text-emerald-200/80 hover:text-white"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Owner Admin Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
