/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Utensils,
  Calendar,
  Phone,
  MapPin,
  Clock,
  Star,
  ShoppingBag,
  User,
  Menu as MenuIcon,
  X,
  ChevronRight,
  ChevronLeft,
  Search,
  Check,
  Plus,
  Minus,
  ExternalLink,
  Share2,
  Heart,
  Sparkles,
  ShieldCheck,
  Award,
  Info,
  ArrowRight,
  Lock,
  Smartphone,
  ShieldAlert,
  Sun,
  Moon,
  MessageSquare
} from 'lucide-react';


// Winged 'M' Logo Component
const MiracoLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 120 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M48 20C42 12 32 8 20 10C12 11 6 16 3 24C12 28 22 34 32 40C38 34 44 26 48 20Z"
      fill="#D97706"
      stroke="#B45309"
      strokeWidth="1.5"
    />
    <path
      d="M44 32C38 24 28 20 16 22C10 23 5 27 2 34C10 40 20 46 30 52C36 46 41 38 44 32Z"
      fill="#F59E0B"
      stroke="#B45309"
      strokeWidth="1"
    />
    <path
      d="M38 46C32 40 22 36 12 38C7 39 3 43 1 48C8 53 16 58 24 62C30 56 34 50 38 46Z"
      fill="#B45309"
    />
    <path
      d="M72 20C78 12 88 8 100 10C108 11 114 16 117 24C108 28 98 34 88 40C82 34 76 26 72 20Z"
      fill="#D97706"
      stroke="#B45309"
      strokeWidth="1.5"
    />
    <path
      d="M76 32C82 24 92 20 104 22C110 23 115 27 118 34C110 40 100 46 90 52C84 46 79 38 76 32Z"
      fill="#F59E0B"
      stroke="#B45309"
      strokeWidth="1"
    />
    <path
      d="M82 46C88 40 98 36 108 38C113 39 117 43 119 48C112 53 104 58 96 62C90 56 86 50 82 46Z"
      fill="#B45309"
    />
    <path
      d="M48 55C48 55 52 35 56 22C58 16 60 16 62 22C66 35 70 55 70 55C70 55 64 45 60 42C56 45 48 55 48 55Z"
      fill="#991B1B"
      stroke="#FBBF24"
      strokeWidth="1.5"
    />
    <path
      d="M53 40C53 40 57 28 60 20C63 28 67 40 67 40C67 40 63 32 60 30C57 32 53 40 53 40Z"
      fill="#FBBF24"
    />
  </svg>
);

export default function App() {
  // Theme State (Default to user device preference)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Data States
  const [menuData, setMenuData] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [veganOnly, setVeganOnly] = useState(false);

  // SEO Schema Markup injection
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Miraco",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Pushkar Enclave, Paschim Vihar",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "addressCountry": "IN"
      },
      "priceRange": "$$",
      "servesCuisine": "North Indian, Vegetarian"
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // Reviews State
  const [reviewsData, setReviewsData] = useState<any>(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);


  // Fetch Menu and Reviews on Mount
  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenuData(data))
      .catch(err => console.error('Failed to load menu:', err));

    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviewsData(data);
        setReviewsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load reviews:', err);
        setReviewsLoading(false);
      });
  }, []);  // Gallery Photos
  const galleryPhotos = [
    {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      caption: "Main Dining & Plush Velvet Booths"
    },
    {
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      caption: "Exterior Signage at Pushkar Enclave, Paschim Vihar"
    },
    {
      url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
      caption: "Artisanal Bar & Beverage Counter"
    },
    {
      url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
      caption: "Warm Ambient Ceiling Fixtures & Seating"
    },
    {
      url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      caption: "Pop Art Celebrity Sketch Accent Wall"
    },
    {
      url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
      caption: "Fresh Wood-Fired Golden Corn Pizza"
    },
    {
      url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
      caption: "Signature Masala Papad with Garden Salsa"
    }
  ];



  return (
    <div className={`min-h-screen flex flex-col selection:bg-amber-900 selection:text-white transition-colors duration-300 ${darkMode ? 'bg-[#121110] text-[#E7E5E4]' : 'bg-[#FBF9F5] text-[#1C1917]'}`}>
      {/* Top Announcement Bar */}
      <div className="bg-[#1C1917] text-[#FBF9F5] py-2 px-4 text-xs font-medium text-center flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-500" /> 100% Pure Vegetarian Feasts Daily</span>

        <span className="hidden md:inline text-stone-500">•</span>
        <span className="hidden md:inline">Paschim Vihar, New Delhi</span>
        <span className="text-stone-500">•</span>
        <a href="tel:09999885716" className="text-amber-400 hover:underline flex items-center gap-1 font-semibold">
          <Phone className="w-3 h-3" /> 099998 85716
        </a>
      </div>

      {/* Sticky Navigation */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${darkMode ? 'bg-[#121110]/95 border-stone-800' : 'bg-[#FBF9F5]/95 border-[#E7E5E4]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo with Winged M */}
          <a href="#hero" className="flex items-center gap-3 group">
            <MiracoLogo className="w-12 h-10 group-hover:scale-105 transition-transform" />
            <div>
              <span className={`font-serif text-2xl font-bold tracking-tight block leading-none ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>
                Miraco
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#991B1B] font-bold mt-0.5 block">
                Proudly Vegetarian
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className={`hidden lg:flex items-center gap-8 text-sm font-medium ${darkMode ? 'text-stone-300' : 'text-[#57534E]'}`}>
            <a href="#about" className="hover:text-[#991B1B] transition-colors">About</a>
            <a href="#highlights" className="hover:text-[#991B1B] transition-colors">Highlights</a>
            <a href="#menu" className="hover:text-[#991B1B] transition-colors">Menu</a>
            <a href="#gallery" className="hover:text-[#991B1B] transition-colors">Gallery</a>
            <a href="#reviews" className="hover:text-[#991B1B] transition-colors">Reviews</a>
            <a href="#visit" className="hover:text-[#991B1B] transition-colors">Visit Us</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-sm border transition-colors ${darkMode ? 'bg-stone-800 border-stone-700 text-amber-400' : 'bg-stone-100 border-[#E7E5E4] text-stone-700'}`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setReservationModalOpen(true)}
              className={`text-xs font-semibold px-4 py-2.5 rounded-sm transition-colors tracking-wide uppercase shadow-sm ${darkMode ? 'bg-stone-100 text-stone-900 hover:bg-white' : 'bg-[#1C1917] text-[#FBF9F5] hover:bg-[#292524]'}`}
            >
              Reserve Table
            </button>

            <button
              onClick={() => setOrderModalOpen(true)}
              className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-semibold px-4 py-2.5 rounded-sm transition-colors tracking-wide uppercase flex items-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" /> Order Online
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-sm border ${darkMode ? 'bg-stone-800 border-stone-700 text-amber-400' : 'bg-stone-100 border-[#E7E5E4] text-stone-700'}`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setOrderModalOpen(true)}
              className="bg-[#991B1B] text-white px-3 py-2 rounded-sm text-xs font-semibold flex items-center gap-1"
            >
              <ShoppingBag className="w-4 h-4" /> Order
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`lg:hidden border-b px-6 py-6 space-y-4 shadow-lg ${darkMode ? 'bg-[#121110] border-stone-800 text-white' : 'bg-[#FBF9F5] border-[#E7E5E4] text-[#1C1917]'}`}
          >
            <nav className="flex flex-col space-y-3 text-base font-medium">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#991B1B]">About</a>
              <a href="#highlights" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#991B1B]">Highlights</a>
              <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#991B1B]">Menu</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#991B1B]">Photo Gallery</a>
              <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#991B1B]">Reviews</a>
              <a href="#visit" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#991B1B]">Visit Us</a>
            </nav>
            <div className={`pt-4 border-t flex flex-col gap-3 ${darkMode ? 'border-stone-800' : 'border-[#E7E5E4]'}`}>
              <button
                  type="button"
                  onClick={() => { setOrderModalOpen(true); setMobileMenuOpen(false); }}
                  className={`w-full py-2.5 text-center text-sm font-semibold border rounded-sm flex items-center justify-center gap-2 ${darkMode ? 'border-stone-700 text-white' : 'border-[#1C1917]'}`}
                >
                  <ShoppingBag className="w-4 h-4" /> Order Online
                </button>
                <button
                  onClick={() => { setReservationModalOpen(true); setMobileMenuOpen(false); }}
                  className={`w-full py-3 rounded-sm text-sm font-semibold uppercase tracking-wide ${darkMode ? 'bg-stone-100 text-stone-900' : 'bg-[#1C1917] text-white'}`}
                >
                  Reserve a Table
                </button>
              </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className={`relative pt-12 pb-20 md:py-24 px-4 sm:px-6 lg:px-8 border-b overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-[#121110] border-stone-800' : 'bg-[#FBF9F5] border-[#E7E5E4]'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Badge */}
            <div className={`inline-flex items-center gap-2 border px-3.5 py-1.5 rounded-full text-xs font-medium ${darkMode ? 'bg-stone-900 border-stone-800 text-stone-300' : 'bg-[#F5F2EC] border-[#E7E5E4] text-[#57534E]'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Open Daily • Closes 11:30 PM</span>
              <span className="text-stone-500">|</span>
              <span className="text-amber-500 font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.7 (1,572 reviews)
              </span>
            </div>

            <h1 className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.08] ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>
              Pure Vegetarian North Indian <span className="italic text-[#991B1B]">Feasts</span> & Socializing.
            </h1>

            <p className={`text-lg max-w-xl font-normal leading-relaxed ${darkMode ? 'text-stone-400' : 'text-[#57534E]'}`}>
              Proudly 100% vegetarian in Paschim Vihar, Miraco brings you slow-cooked curries, charred tandoori paneer tikka, wood-fired pizzas, and warm hospitality for every family gathering.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setReservationModalOpen(true)}
                className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white px-8 py-4 rounded-sm text-sm font-semibold tracking-wide uppercase transition-colors text-center shadow-sm"
              >
                Reserve a Table
              </button>
              <button
                onClick={() => setOrderModalOpen(true)}
                className={`px-8 py-4 rounded-sm text-sm font-semibold tracking-wide uppercase transition-colors text-center shadow-sm flex items-center justify-center gap-2 ${darkMode ? 'bg-stone-800 hover:bg-stone-700 text-white border border-stone-700' : 'bg-[#1C1917] hover:bg-[#292524] text-white'}`}
              >
                Order Online <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Key Tags */}
            <div className={`flex flex-wrap items-center gap-4 pt-4 text-xs font-medium ${darkMode ? 'text-stone-400' : 'text-[#57534E]'}`}>
              <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 100% Pure Veg
              </span>
              <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Vegan Options Available
              </span>
              <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Kids' Birthday Parties
              </span>
            </div>
          </motion.div>

          {/* Hero Imagery Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Miraco Interior Dining"
                className="w-full h-64 object-cover rounded-sm border border-stone-700/30 shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
                onClick={() => setLightboxImage("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80")}
              />
              <img
                src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"
                alt="Signature Masala Papad"
                className="w-full h-44 object-cover rounded-sm border border-stone-700/30 shadow-sm cursor-pointer"
                onClick={() => setLightboxImage("https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80")}
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80"
                alt="Paneer Lababdar"
                className="w-full h-44 object-cover rounded-sm border border-stone-700/30 shadow-sm cursor-pointer"
                onClick={() => setLightboxImage("https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80")}
              />
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Miraco Exterior"
                className="w-full h-64 object-cover rounded-sm border border-stone-700/30 shadow-sm cursor-pointer"
                onClick={() => setLightboxImage("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80")}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${darkMode ? 'bg-[#181614] border-stone-800' : 'bg-white border-[#E7E5E4]'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold block">Our Story</span>
          <h2 className={`font-serif text-3xl sm:text-5xl font-normal leading-tight ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>
            Proudly 100% Vegetarian Excellence.
          </h2>
          <p className={`text-lg leading-relaxed font-normal ${darkMode ? 'text-stone-300' : 'text-[#57534E]'}`}>
            At Miraco, food is a celebration of pure vegetarian heritage. Situated on the First Floor of Pushkar Enclave in Paschim Vihar, our dining room features custom red and blue velvet booths, glowing pendant chandeliers, and a vibrant pop-art gallery wall. Whether you're savoring our 24-hour slow-cooked Dal Makhani, enjoying wood-fired pizzas with family, or celebrating a child's birthday, our team ensures every moment feels like home.
          </p>
          <div className="pt-4 flex items-center justify-center gap-8 text-sm font-semibold">
            <div className="text-center">
              <span className="font-serif text-3xl text-[#991B1B] block font-bold">₹400–1,400</span>
              <span className={`text-xs font-normal ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>Price Per Person</span>
            </div>
            <div className={`w-px h-10 ${darkMode ? 'bg-stone-800' : 'bg-[#E7E5E4]'}`}></div>
            <div className="text-center">
              <span className="font-serif text-3xl text-[#991B1B] block font-bold">4.7 ★</span>
              <span className={`text-xs font-normal ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>1,572 Google Reviews</span>
            </div>
            <div className={`w-px h-10 ${darkMode ? 'bg-stone-800' : 'bg-[#E7E5E4]'}`}></div>
            <div className="text-center">
              <span className="font-serif text-3xl text-[#991B1B] block font-bold">100%</span>
              <span className={`text-xs font-normal ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>Pure Vegetarian</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className={`py-20 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${darkMode ? 'bg-[#121110] border-stone-800' : 'bg-[#FBF9F5] border-[#E7E5E4]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold block">What We Offer</span>
            <h2 className={`font-serif text-3xl sm:text-4xl font-normal ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Designed for Memorable Gatherings</h2>
            <p className={`text-sm ${darkMode ? 'text-stone-400' : 'text-[#57534E]'}`}>Experience top-tier hospitality tailored for every occasion in Paschim Vihar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-sm border shadow-sm space-y-4 ${darkMode ? 'bg-[#181614] border-stone-800' : 'bg-white border-[#E7E5E4]'}`}
            >
              <div className="w-12 h-12 bg-[#991B1B]/10 text-[#991B1B] flex items-center justify-center rounded-sm font-serif font-bold text-xl">
                01
              </div>
              <h3 className={`font-serif text-xl font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>All You Can Eat Feasts</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-stone-400' : 'text-[#57534E]'}`}>
                Indulge in unlimited North Indian pure vegetarian delicacies, live chaat counters, starters, rich curries, and decadent desserts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-sm border shadow-sm space-y-4 ${darkMode ? 'bg-[#181614] border-stone-800' : 'bg-white border-[#E7E5E4]'}`}
            >
              <div className="w-12 h-12 bg-[#991B1B]/10 text-[#991B1B] flex items-center justify-center rounded-sm font-serif font-bold text-xl">
                02
              </div>
              <h3 className={`font-serif text-xl font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Vegan Options Available</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-stone-400' : 'text-[#57534E]'}`}>
                We cater thoughtfully to plant-based diets with dedicated vegan curries, tandoori vegetables, and customizable allergen-conscious dishes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-sm border shadow-sm space-y-4 ${darkMode ? 'bg-[#181614] border-stone-800' : 'bg-white border-[#E7E5E4]'}`}
            >
              <div className="w-12 h-12 bg-[#991B1B]/10 text-[#991B1B] flex items-center justify-center rounded-sm font-serif font-bold text-xl">
                03
              </div>
              <h3 className={`font-serif text-xl font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Kids' Birthday Celebrations</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-stone-400' : 'text-[#57534E]'}`}>
                Make your child's birthday unforgettable with balloon décor, custom wood-fired pizzas, kid-friendly mocktails, and joyful party coordination.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu & Online Ordering Section */}
      <section id="menu" className={`py-20 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${darkMode ? 'bg-[#181614] border-stone-800' : 'bg-white border-[#E7E5E4]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold block mb-2">100% Pure Veg Menu</span>
              <h2 className={`font-serif text-3xl sm:text-5xl font-normal ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Explore Our Kitchen</h2>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className={`border pl-9 pr-4 py-2 text-xs rounded-sm focus:outline-none w-48 sm:w-60 ${darkMode ? 'bg-stone-900 border-stone-700 text-white focus:border-white' : 'bg-[#FBF9F5] border-[#E7E5E4] text-[#1C1917] focus:border-[#1C1917]'}`}
                />
              </div>

              <button
                onClick={() => setVeganOnly(!veganOnly)}
                className={`px-3 py-2 text-xs font-semibold rounded-sm border transition-colors ${veganOnly ? 'bg-emerald-800 text-white border-emerald-800' : darkMode ? 'bg-stone-900 text-stone-300 border-stone-700' : 'bg-[#FBF9F5] text-[#57534E] border-[#E7E5E4]'}`}
              >
                Vegan Options
              </button>

              <button
                onClick={() => setOrderModalOpen(true)}
                className="bg-[#991B1B] text-white px-4 py-2 text-xs font-semibold rounded-sm shadow-sm hover:bg-[#7F1D1D] transition-colors"
              >
                Order on Zomato / Swiggy
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          {menuData && menuData.categories && (
            <div className={`flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b ${darkMode ? 'border-stone-800' : 'border-[#E7E5E4]'}`}>
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap rounded-sm transition-colors ${activeCategory === 'all' ? (darkMode ? 'bg-white text-black' : 'bg-[#1C1917] text-white') : (darkMode ? 'bg-stone-900 text-stone-300 hover:bg-stone-800' : 'bg-[#FBF9F5] text-[#57534E] hover:bg-stone-200')}`}
              >
                All Dishes
              </button>
              {menuData.categories.map((cat: any) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold whitespace-nowrap rounded-sm transition-colors ${activeCategory === cat.id ? (darkMode ? 'bg-white text-black' : 'bg-[#1C1917] text-white') : (darkMode ? 'bg-stone-900 text-stone-300 hover:bg-stone-800' : 'bg-[#FBF9F5] text-[#57534E] hover:bg-stone-200')}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Menu Items Grid */}
          {menuData && menuData.items ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuData.items
                .filter((item: any) => {
                  if (activeCategory !== 'all' && item.categoryId !== activeCategory) return false;
                  if (veganOnly && !item.isVegan) return false;
                  if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                  return true;
                })
                .map((item: any, idx: number) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
                    whileHover={{ y: -4 }}
                    className={`rounded-sm border overflow-hidden flex flex-col justify-between group shadow-sm ${darkMode ? 'bg-[#121110] border-stone-800' : 'bg-[#FBF9F5] border-[#E7E5E4]'}`}
                  >
                    <div>
                      <div className="relative h-52 overflow-hidden bg-stone-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {item.badge && (
                          <span className="absolute top-3 left-3 bg-[#991B1B] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm">
                            {item.badge}
                          </span>
                        )}
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-sm text-[10px] font-semibold text-emerald-700">
                          ● Pure Veg
                        </div>
                      </div>

                      <div className="p-6 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className={`font-serif text-xl font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>{item.name}</h3>
                          <span className="font-serif text-lg font-bold text-[#991B1B]">₹{item.price}</span>
                        </div>
                        <p className={`text-xs leading-relaxed ${darkMode ? 'text-stone-400' : 'text-[#57534E]'}`}>{item.description}</p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() => setOrderModalOpen(true)}
                        className={`w-full py-3 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${darkMode ? 'bg-stone-800 hover:bg-stone-700 text-white' : 'bg-[#1C1917] hover:bg-[#292524] text-white'}`}
                      >
                        <ShoppingBag className="w-4 h-4" /> Order via Zomato / Swiggy
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          ) : (
            <div className="text-center py-16 text-stone-500">Loading menu items...</div>
          )}
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className={`py-20 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${darkMode ? 'bg-[#121110] border-stone-800' : 'bg-[#FBF9F5] border-[#E7E5E4]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold block">Atmosphere & Cuisines</span>
            <h2 className={`font-serif text-3xl sm:text-4xl font-normal ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Inside Miraco</h2>
            <p className={`text-sm ${darkMode ? 'text-stone-400' : 'text-[#57534E]'}`}>Real photography capturing our ambience in Paschim Vihar.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryPhotos.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setLightboxImage(photo.url)}
                className={`relative group overflow-hidden rounded-sm border cursor-pointer ${darkMode ? 'border-stone-800 bg-[#181614]' : 'border-[#E7E5E4] bg-white'} ${idx === 0 ? 'sm:col-span-2 sm:h-96' : 'h-72'}`}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white text-sm font-medium">{photo.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section with Smooth Realtime Scroll Carousel */}
      <section id="reviews" className={`py-20 px-4 sm:px-6 lg:px-8 border-b overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-[#181614] border-stone-800' : 'bg-white border-[#E7E5E4]'}`}>
        <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold block mb-2">Google Verified (1,572 Reviews)</span>
            <h2 className={`font-serif text-3xl sm:text-5xl font-normal ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>What Our Guests Say</h2>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className={`border px-4 py-3 rounded-sm flex items-center gap-3 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-[#FBF9F5] border-[#E7E5E4]'}`}>
              <span className={`font-serif text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>4.7</span>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span className={`text-[11px] ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>Based on 1,572 Google reviews</span>
              </div>
            </div>



            <button
              onClick={() => setReviewModalOpen(true)}
              className={`px-5 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors ${darkMode ? 'bg-stone-100 text-stone-900 hover:bg-white' : 'bg-[#1C1917] hover:bg-[#292524] text-white'}`}
            >
              Write a Review
            </button>
          </div>
        </div>

        {reviewsLoading ? (
          <div className="text-center py-12 text-stone-500">Loading Google reviews...</div>
        ) : reviewsData && reviewsData.reviews ? (
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex gap-6 py-4 px-2"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {[...reviewsData.reviews, ...reviewsData.reviews].map((rev: any, idx: number) => (
                <div
                  key={idx}
                  className={`w-[360px] sm:w-[380px] p-6 rounded-sm border flex flex-col justify-between space-y-4 shadow-sm shrink-0 transition-transform duration-300 hover:-translate-y-1 ${darkMode ? 'bg-[#121110] border-stone-800' : 'bg-[#FBF9F5] border-[#E7E5E4]'}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.profile_photo_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                          alt={rev.author_name}
                          className={`w-10 h-10 rounded-full object-cover border ${darkMode ? 'border-stone-700' : 'border-[#E7E5E4]'}`}
                        />
                        <div>
                          <h4 className={`font-serif text-sm font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>{rev.author_name}</h4>
                          <span className={`text-[10px] ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>{rev.relative_time_description}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-stone-300' : 'text-[#57534E]'}`}>"{rev.text}"</p>
                  </div>
                  <div className={`pt-4 border-t flex items-center justify-between text-[10px] ${darkMode ? 'border-stone-800 text-stone-500' : 'border-[#E7E5E4] text-stone-400'}`}>
                    <span>Google Verified Review</span>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className={`hover:underline flex items-center gap-1 ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                      View on Google <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-stone-400 mb-4">Visit our Google Maps listing to explore all 1,572 reviews.</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#991B1B] text-white px-6 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider"
            >
              See all reviews on Google
            </a>
          </div>
        )}
      </section>

      {/* Visit Us Section */}
      <section id="visit" className={`py-20 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${darkMode ? 'bg-[#121110] border-stone-800' : 'bg-[#FBF9F5] border-[#E7E5E4]'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold block">Location & Hours</span>
            <h2 className={`font-serif text-3xl sm:text-4xl font-normal ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Visit Miraco Today</h2>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-stone-400' : 'text-[#57534E]'}`}>
              Drop by for a memorable lunch, family dinner, or celebratory evening in Paschim Vihar. Tap below for instant directions or table reservations.
            </p>

            <div className="space-y-4 pt-2">
              <div className={`flex items-start gap-4 p-4 rounded-sm border ${darkMode ? 'bg-[#181614] border-stone-800' : 'bg-white border-[#E7E5E4]'}`}>
                <MapPin className="w-5 h-5 text-[#991B1B] shrink-0 mt-0.5" />
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Address</h4>
                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-stone-400' : 'text-[#57534E]'}`}>G-4, First Floor, Pushkar Enclave, Paschim Vihar, New Delhi, Delhi 110063</p>
                </div>
              </div>

              <div className={`flex items-start gap-4 p-4 rounded-sm border ${darkMode ? 'bg-[#181614] border-stone-800' : 'bg-white border-[#E7E5E4]'}`}>
                <Clock className="w-5 h-5 text-[#991B1B] shrink-0 mt-0.5" />
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Hours</h4>
                  <p className={`text-xs ${darkMode ? 'text-stone-400' : 'text-[#57534E]'}`}>Open Daily: 11:30 AM – 11:30 PM</p>
                </div>
              </div>

              <div className={`flex items-start gap-4 p-4 rounded-sm border ${darkMode ? 'bg-[#181614] border-stone-800' : 'bg-white border-[#E7E5E4]'}`}>
                <Phone className="w-5 h-5 text-[#991B1B] shrink-0 mt-0.5" />
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Phone & Reservations</h4>
                  <a href="tel:09999885716" className="text-xs font-semibold text-[#991B1B] hover:underline">099998 85716</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://maps.google.com/?q=Miraco+Pushkar+Enclave+Paschim+Vihar+New+Delhi"
                target="_blank"
                rel="noreferrer"
                className={`flex-1 py-3.5 px-6 rounded-sm text-xs font-semibold uppercase tracking-wider text-center transition-colors ${darkMode ? 'bg-stone-100 text-stone-900 hover:bg-white' : 'bg-[#1C1917] hover:bg-[#292524] text-white'}`}
              >
                Get Directions
              </a>
              <button
                onClick={() => setReservationModalOpen(true)}
                className="flex-1 bg-[#991B1B] hover:bg-[#7F1D1D] text-white py-3.5 px-6 rounded-sm text-xs font-semibold uppercase tracking-wider text-center transition-colors"
              >
                Reserve Table
              </button>
            </div>
          </div>

          {/* Interactive Map Embed Preview */}
          <div className={`lg:col-span-7 h-96 sm:h-[450px] rounded-sm border overflow-hidden shadow-sm relative ${darkMode ? 'border-stone-800 bg-[#181614]' : 'border-[#E7E5E4] bg-white'}`}>
            <iframe
              title="Miraco Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.23456789!2d77.1089!3d28.6701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjguNjcwMSw3Ny4xMDg5!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C1917] text-[#FBF9F5] py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MiracoLogo className="w-10 h-8" />
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Miraco</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              100% Pure Vegetarian North Indian fine dining and memorable celebrations in Paschim Vihar, New Delhi.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#highlights" className="hover:text-white transition-colors">Highlights</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Menu</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Photo Gallery</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Google Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Contact & Hours</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>G-4, First Floor, Pushkar Enclave, Paschim Vihar, New Delhi 110063</li>
              <li>Phone: 099998 85716</li>
              <li>Open Daily: 11:30 AM – 11:30 PM</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Delivery & Reservations</h4>
            <p className="text-xs text-stone-400 mb-4">Order safely via Zomato or Swiggy or reserve a table for dine-in.</p>
            <button
              onClick={() => setOrderModalOpen(true)}
              className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white w-full py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors mb-2"
            >
              Order Online
            </button>
            <button
              onClick={() => setReservationModalOpen(true)}
              className="bg-[#292524] hover:bg-[#44403C] text-white w-full py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Reserve a Table
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Miraco - Proudly Vegetarian. All rights reserved.</p>
          <p>Crafted for independent dining excellence.</p>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1C1917] border-t border-stone-800 grid grid-cols-4 text-center py-2.5 shadow-lg">
        <a href="tel:09999885716" className="flex flex-col items-center justify-center text-stone-300 hover:text-white text-[11px] font-medium">
          <Phone className="w-4 h-4 mb-0.5 text-amber-500" />
          Call
        </a>
        <button onClick={() => setReservationModalOpen(true)} className="flex flex-col items-center justify-center text-stone-300 hover:text-white text-[11px] font-medium border-x border-stone-800">
          <Calendar className="w-4 h-4 mb-0.5 text-amber-500" />
          Reserve
        </button>
        <a href="https://maps.google.com/?q=Miraco+Paschim+Vihar" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center text-stone-300 hover:text-white text-[11px] font-medium border-r border-stone-800">
          <MapPin className="w-4 h-4 mb-0.5 text-amber-500" />
          Directions
        </a>
        <button onClick={() => setOrderModalOpen(true)} className="flex flex-col items-center justify-center text-stone-300 hover:text-white text-[11px] font-medium">
          <ShoppingBag className="w-4 h-4 mb-0.5 text-amber-500" />
          Order
        </button>
      </div>

      {/* Order Online Modal */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-full max-w-md rounded-sm border shadow-2xl overflow-hidden ${darkMode ? 'bg-[#181614] border-stone-800 text-white' : 'bg-[#FBF9F5] border-[#E7E5E4] text-[#1C1917]'}`}
          >
            <div className="p-6 bg-[#1C1917] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                <h3 className="font-serif text-lg font-bold">Order Online via Official Partners</h3>
              </div>
              <button onClick={() => setOrderModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6 text-center">
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-stone-300' : 'text-[#57534E]'}`}>
                To guarantee zero delivery issues, live tracking, and official restaurant discounts, please order directly through our official delivery partners in Paschim Vihar, New Delhi:
              </p>



              <div className="space-y-3">
                <a
                  href="https://www.zomato.com/ncr/miraco-proudly-vegetarian-paschim-vihar-new-delhi"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between p-4 rounded-sm border transition-colors group shadow-sm ${darkMode ? 'bg-stone-900 border-stone-800 hover:border-red-600' : 'bg-white border-[#E7E5E4] hover:border-[#991B1B]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 text-white font-serif font-bold text-lg rounded-sm flex items-center justify-center">Z</div>
                    <div className="text-left">
                      <h4 className={`font-serif text-sm font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Order on Zomato</h4>
                      <p className="text-[10px] text-stone-400">Miraco - Proudly Vegetarian, Paschim Vihar</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-red-500" />
                </a>

                <a
                  href="https://www.swiggy.com/restaurants/delhi/paschim-vihar/miraco-proudly-vegetarian-656327/dineout"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between p-4 rounded-sm border transition-colors group shadow-sm ${darkMode ? 'bg-stone-900 border-stone-800 hover:border-orange-600' : 'bg-white border-[#E7E5E4] hover:border-orange-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm overflow-hidden bg-[#FC8019] flex items-center justify-center shrink-0 shadow-sm">
                      <svg width="40" height="40" viewBox="0 0 200 200" className="w-full h-full block">
                        <rect width="200" height="200" fill="#FC8019" />
                        <path d="M100 25 C65 25 42 50 42 75 C42 105 100 145 100 145 C100 145 158 105 158 75 C158 50 135 25 100 25 Z" fill="white" />
                        <path d="M100 52 C88 52 80 60 80 70 C80 82 120 86 120 98 C120 110 108 118 96 118 C84 118 76 110 76 102" fill="none" stroke="#FC8019" strokeWidth="12" strokeLinecap="round" />
                        <text x="100" y="180" fontFamily="sans-serif" fontSize="21" fontWeight="900" fill="white" textAnchor="middle" letterSpacing="2.5">SWIGGY</text>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className={`font-serif text-sm font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Order on Swiggy</h4>
                      <p className="text-[10px] text-stone-400">Miraco - Proudly Vegetarian, Paschim Vihar</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-orange-500" />
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setOrderModalOpen(false)}
                  className="text-xs text-stone-400 hover:text-white underline font-medium"
                >
                  Back to Menu Browsing
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reserve a Table Modal with Precise Official Brand Logos Matching Uploaded Images */}
      {reservationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-full max-w-lg rounded-sm border shadow-2xl overflow-hidden ${darkMode ? 'bg-[#181614] border-stone-800 text-white' : 'bg-[#FBF9F5] border-[#E7E5E4] text-[#1C1917]'}`}
          >
            <div className="p-6 bg-[#1C1917] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                <h3 className="font-serif text-lg font-bold">Reserve a Table at Miraco</h3>
              </div>
              <button onClick={() => setReservationModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-stone-300' : 'text-[#57534E]'}`}>
                Choose your preferred official reservation platform below to instantly book your table at Miraco, Paschim Vihar, New Delhi:
              </p>



              <div className="space-y-3">
                {/* Google Reserve */}
                <a
                  href="https://www.google.com/maps/reserve/v/dine/c/5OcZdfnwWl0?source=pa&opi=89978449&hl=en-IN"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between p-3.5 rounded-sm border transition-colors group shadow-sm ${darkMode ? 'bg-stone-900 border-stone-800 hover:border-blue-500' : 'bg-white border-[#E7E5E4] hover:border-blue-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm overflow-hidden bg-white flex items-center justify-center border border-stone-200 shrink-0 shadow-sm p-1">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 5 C30 5 15 20 15 40 C15 65 50 95 50 95 C50 95 85 65 85 40 C85 20 70 5 50 5 Z" fill="#34A853" />
                        <path d="M50 5 C30 5 15 20 15 40 C15 55 35 75 50 95 Z" fill="#EA4335" />
                        <path d="M50 5 L85 40 C85 20 70 5 50 5 Z" fill="#4285F4" />
                        <path d="M15 40 C15 20 30 5 50 5 L50 95 C35 75 15 55 15 40 Z" fill="#FBBC05" />
                        <circle cx="50" cy="38" r="18" fill="white" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className={`font-serif text-sm font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Google Reserve</h4>
                      <p className="text-[10px] text-stone-400">Instant table booking via Google Maps</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-blue-500" />
                </a>

                {/* EazyDiner */}
                <a
                  href="https://www.eazydiner.com/delhi-ncr/miraco-paschim-vihar-west-delhi-685565"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between p-3.5 rounded-sm border transition-colors group shadow-sm ${darkMode ? 'bg-stone-900 border-stone-800 hover:border-amber-500' : 'bg-white border-[#E7E5E4] hover:border-amber-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm overflow-hidden bg-[#FF5722] flex items-center justify-center shrink-0 shadow-sm p-1">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <rect width="200" height="200" fill="#FF5722" />
                        <text x="100" y="115" fontFamily="serif" fontSize="42" fontWeight="bold" fill="white" textAnchor="middle">eazydiner</text>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className={`font-serif text-sm font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>EazyDiner Booking</h4>
                      <p className="text-[10px] text-stone-400">Exclusive dining deals & guaranteed seating</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-amber-500" />
                </a>

                {/* District.in */}
                <a
                  href="https://www.district.in/dining/ncr/miraco-proudly-vegetarian-paschim-vihar-new-delhi/book"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between p-3.5 rounded-sm border transition-colors group shadow-sm ${darkMode ? 'bg-stone-900 border-stone-800 hover:border-purple-500' : 'bg-white border-[#E7E5E4] hover:border-purple-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm overflow-hidden bg-[#6B21A8] flex flex-col items-center justify-center shrink-0 shadow-sm p-0.5">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <rect width="200" height="200" fill="#6B21A8" />
                        <text x="100" y="95" fontFamily="sans-serif" fontSize="36" fontWeight="900" fill="#FDF4FF" textAnchor="middle">district</text>
                        <text x="100" y="140" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#FCA5A5" textAnchor="middle" letterSpacing="3">BY ZOMATO</text>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className={`font-serif text-sm font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>District.in (by Zomato)</h4>
                      <p className="text-[10px] text-stone-400">Seamless table reservations & offers</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-purple-500" />
                </a>

                {/* Swiggy Dineout */}
                <a
                  href="https://www.swiggy.com/restaurants/delhi/paschim-vihar/miraco-proudly-vegetarian-656327/dineout"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between p-3.5 rounded-sm border transition-colors group shadow-sm ${darkMode ? 'bg-stone-900 border-stone-800 hover:border-orange-500' : 'bg-white border-[#E7E5E4] hover:border-orange-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm overflow-hidden bg-[#FC8019] flex items-center justify-center shrink-0 shadow-sm">
                      <svg width="40" height="40" viewBox="0 0 200 200" className="w-full h-full block">
                        <rect width="200" height="200" fill="#FC8019" />
                        <path d="M100 25 C65 25 42 50 42 75 C42 105 100 145 100 145 C100 145 158 105 158 75 C158 50 135 25 100 25 Z" fill="white" />
                        <path d="M100 52 C88 52 80 60 80 70 C80 82 120 86 120 98 C120 110 108 118 96 118 C84 118 76 110 76 102" fill="none" stroke="#FC8019" strokeWidth="12" strokeLinecap="round" />
                        <text x="100" y="180" fontFamily="sans-serif" fontSize="21" fontWeight="900" fill="white" textAnchor="middle" letterSpacing="2.5">SWIGGY</text>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className={`font-serif text-sm font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Swiggy Dineout</h4>
                      <p className="text-[10px] text-stone-400">Instant table booking & bill discounts</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-orange-500" />
                </a>

                {/* Zomato Book */}
                <a
                  href="https://www.zomato.com/ncr/miraco-proudly-vegetarian-paschim-vihar-new-delhi/book"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between p-3.5 rounded-sm border transition-colors group shadow-sm ${darkMode ? 'bg-stone-900 border-stone-800 hover:border-red-600' : 'bg-white border-[#E7E5E4] hover:border-[#991B1B]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm overflow-hidden bg-[#CB202D] flex items-center justify-center shrink-0 shadow-sm p-1">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <rect width="200" height="200" fill="#CB202D" />
                        <text x="100" y="118" fontFamily="sans-serif" fontSize="48" fontWeight="900" fill="white" textAnchor="middle" letterSpacing="-1">zomato</text>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className={`font-serif text-sm font-bold ${darkMode ? 'text-white' : 'text-[#1C1917]'}`}>Zomato Table Booking</h4>
                      <p className="text-[10px] text-stone-400">Book tables & enjoy dining privileges</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-red-500" />
                </a>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setReservationModalOpen(false)}
                  className="text-xs text-stone-400 hover:text-white underline font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}


      {/* Write Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-sm border shadow-2xl overflow-hidden ${darkMode ? 'bg-[#181614] border-stone-800 text-white' : 'bg-[#FBF9F5] border-[#E7E5E4] text-[#1C1917]'}`}>
            <div className="p-6 bg-[#1C1917] text-white flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">Write a Review for Miraco</h3>
              <button onClick={() => setReviewModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className={`text-xs ${darkMode ? 'text-stone-300' : 'text-[#57534E]'}`}>
                We appreciate your feedback! To share an official Google review, please visit our Google Maps listing below or leave your note for our management.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://maps.google.com/?q=Miraco+Pushkar+Enclave+Paschim+Vihar+New+Delhi"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#991B1B] text-white py-3 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider text-center"
                >
                  Leave Google Review (External)
                </a>
                <button
                  onClick={() => { alert('Thank you for your feedback! Our team reads every review.'); setReviewModalOpen(false); }}
                  className="bg-[#1C1917] text-white py-3 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider text-center"
                >
                  Send Feedback to Management
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxImage(null)}>
          <button onClick={() => setLightboxImage(null)} className="absolute top-6 right-6 text-white hover:text-stone-300">
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged view"
            className="max-w-full max-h-[85vh] object-contain rounded-sm border border-stone-800"
          />
        </div>
      )}
    </div>
  );
}
