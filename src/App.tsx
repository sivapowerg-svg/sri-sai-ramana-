/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ShoppingBag,
  ExternalLink,
  MessageCircle,
  Lock,
  Utensils,
  Search,
  Train,
  Navigation,
  ArrowRight,
} from 'lucide-react';
import { RestaurantService } from './services/restaurantService';
import { MenuItem, RestaurantSettings, MenuCategory } from './types/restaurant';
import { AdminDashboard } from './components/AdminDashboard';
import { OrderModal } from './components/OrderModal';
import { ThreeBackground } from './components/ThreeBackground';

export default function App() {
  const [settings, setSettings] = useState<RestaurantSettings>(() =>
    RestaurantService.getSettings()
  );
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() =>
    RestaurantService.getMenuItems()
  );
  const gallery = RestaurantService.getGallery();

  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<MenuItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    setSettings(RestaurantService.getSettings());
    setMenuItems(RestaurantService.getMenuItems());
  }, []);

  const cleanPhone = settings.phone.replace(/\s+/g, '');

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'breakfast', label: 'Breakfast & Tiffins' },
    { id: 'specials', label: 'Specials' },
    { id: 'meals', label: 'Meals (Thali)' },
    { id: 'rice', label: 'Rice Items' },
    { id: 'beverages', label: 'Beverages' },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.teluguName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenOrder = (item?: MenuItem) => {
    setSelectedOrderItem(item || null);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#071911] text-[#FAF8F5] flex flex-col font-sans relative selection:bg-[#E8C547]/30 selection:text-[#E8C547]">
      {/* 3D WebGL Background Scene */}
      <ThreeBackground />

      {/* 1. TOP STICKY HEADER - Deep Emerald & Golden Amber */}
      <header className="sticky top-0 z-40 bg-[#0A2218]/95 backdrop-blur-md text-white shadow-lg border-b border-[#1E4D36]">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3">
          {/* Hotel Name & Telugu Name */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#E8C547] text-[#183B2B] flex items-center justify-center font-bold shadow-md shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#FAF8F5] group-hover:text-[#E8C547] transition-colors leading-tight">
                {settings.name}
              </h1>
              <p className="font-telugu text-xs text-[#E8C547] font-medium leading-none">
                {settings.teluguName}
              </p>
            </div>
          </a>

          {/* Direct Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#14382A] hover:bg-[#1E4D36] text-emerald-100 hover:text-white text-xs font-semibold border border-[#23583F] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E8C547]" />
              <span className="hidden sm:inline tabular-nums">{settings.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>

            <button
              onClick={() => handleOpenOrder()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#E8C547] hover:bg-[#F2D368] text-[#183B2B] text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Online</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 text-emerald-200/80 hover:text-white hover:bg-[#14382A] rounded-lg transition-colors cursor-pointer"
              title="Owner Admin"
              aria-label="Owner Admin"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO / HOTEL IDENTITY BANNER */}
      <section id="top" className="relative z-10 pt-10 pb-12 px-4 border-b border-[#1E4D36]/40">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-emerald-200">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#123023]/90 border border-[#23583F] text-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              100% Pure Vegetarian
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#123023]/90 border border-[#23583F] text-[#E8C547]">
              <Star className="w-3.5 h-3.5 fill-[#E8C547]" />
              <strong className="font-bold">{settings.googleRating}</strong>
              <span className="text-emerald-200/80">({settings.googleReviewsCount} Reviews)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#123023]/90 border border-[#23583F] text-emerald-200">
              ₹1–₹200 per person
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#123023]/90 border border-[#23583F] text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-[#E8C547]" />
              Gudur, Andhra Pradesh
            </span>
          </div>

          {/* Telugu Heading */}
          <p className="font-telugu text-base sm:text-xl text-[#E8C547] font-semibold tracking-wide">
            {settings.teluguTagline}
          </p>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight max-w-3xl mx-auto leading-tight">
            Authentic South Indian Taste,{' '}
            <span className="italic text-[#E8C547]">Made with Love.</span>
          </h2>

          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {settings.description}
          </p>

          {/* Quick CTA buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#items"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8C547] hover:bg-[#F2D368] text-[#183B2B] font-bold text-xs sm:text-sm shadow-lg transition-all"
            >
              <span>Explore Food Items</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => handleOpenOrder()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#14382A] hover:bg-[#1E4D36] text-white border border-[#2B6D4F] font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#E8C547]" />
              <span>Order on Swiggy / Zomato</span>
            </button>

            <a
              href="#details"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-white/5 text-emerald-100 hover:text-white border border-[#2B6D4F]/80 text-xs sm:text-sm font-medium transition-all"
            >
              <Clock className="w-4 h-4 text-[#E8C547]" />
              <span>Timings & Location ↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. FOOD ITEMS & MENU SECTION (Using theme emerald cards with golden accents) */}
      <main id="items" className="relative z-10 flex-1 max-w-6xl mx-auto px-4 py-12 w-full space-y-10">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8C547]">
                Fresh & Authentic
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F5]">
                Hotel Food Items & Prices
              </h3>
              <p className="font-telugu text-[#E8C547] text-xs sm:text-sm mt-0.5">
                వేడి వేడి టిఫిన్లు, భోజనం మరియు స్పెషల్ వంటకాలు
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-300/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food item..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#23583F] bg-[#102B1F]/90 text-[#FAF8F5] placeholder-emerald-200/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#E8C547]"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#102B1F]/90 border border-[#23583F] rounded-xl mb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#E8C547] text-[#183B2B] font-bold shadow-xs'
                    : 'text-emerald-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Food Items Cards Grid - Themed Emerald & Gold Surfaces (No white!) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#0F2E21]/95 text-[#F3E8D2] rounded-2xl overflow-hidden border border-[#23583F] shadow-xl hover:border-[#E8C547]/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full bg-[#071911] overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Pure Veg Badge - Themed dark badge */}
                    <div className="absolute top-2.5 left-2.5 bg-[#071911]/90 border border-emerald-500/60 p-1 rounded-sm shadow-xs backdrop-blur-xs">
                      <span className="w-3.5 h-3.5 border border-emerald-400 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </span>
                    </div>

                    {item.isVerified && (
                      <span className="absolute top-2.5 right-2.5 bg-[#E8C547] text-[#183B2B] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        Specialty
                      </span>
                    )}

                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-[#071911]/80 backdrop-blur-2xs flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                        Sold Out
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#FAF8F5] group-hover:text-[#E8C547] transition-colors">
                          {item.name}
                        </h4>
                        <p className="font-telugu text-xs text-[#E8C547] font-medium">
                          {item.teluguName}
                        </p>
                      </div>
                      <span className="font-serif font-bold text-lg text-[#E8C547] tabular-nums shrink-0">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs text-emerald-100/80 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-[#1A4231] mt-2">
                  <span className="text-[11px] text-emerald-300/60 capitalize">
                    {item.servesCount || item.category}
                  </span>

                  <button
                    onClick={() => handleOpenOrder(item)}
                    disabled={!item.isAvailable}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 ${
                      item.isAvailable
                        ? 'bg-[#E8C547] hover:bg-[#F2D368] text-[#183B2B] shadow-xs active:scale-95'
                        : 'bg-[#183B2B] text-emerald-300/40 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag className="w-3 h-3 text-[#183B2B]" />
                    <span>Order Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. ONLINE ORDERING SECTION (Swiggy & Zomato - Themed surfaces) */}
        <section className="bg-[#0A2218]/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#1E4D36] shadow-xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8C547]">
              Home & Office Delivery
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF8F5]">
              Order Online on Swiggy & Zomato
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80">
              Fresh, piping-hot South Indian tiffins delivered right to your door in Gudur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Swiggy Card */}
            <div className="p-4 rounded-xl border border-[#FC8019]/40 bg-[#123023]/95 text-[#FAF8F5] shadow-lg flex items-center justify-between hover:border-[#FC8019] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FC8019] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  SW
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FAF8F5]">Swiggy</h4>
                  <p className="text-xs text-emerald-200/80">Doorstep delivery in Gudur</p>
                </div>
              </div>
              {settings.swiggyEnabled && settings.swiggyUrl ? (
                <a
                  href={settings.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 text-xs font-bold text-white bg-[#FC8019] hover:bg-[#e67010] rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <span>Order</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-[11px] font-semibold text-emerald-200/70 bg-[#183B2B] px-2 py-1 rounded border border-[#23583F]">
                  Coming Soon
                </span>
              )}
            </div>

            {/* Zomato Card */}
            <div className="p-4 rounded-xl border border-[#CB202D]/40 bg-[#123023]/95 text-[#FAF8F5] shadow-lg flex items-center justify-between hover:border-[#CB202D] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#CB202D] text-white flex items-center justify-center font-black italic text-sm shadow-xs">
                  Z
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FAF8F5]">Zomato</h4>
                  <p className="text-xs text-emerald-200/80">Live order tracking</p>
                </div>
              </div>
              {settings.zomatoEnabled && settings.zomatoUrl ? (
                <a
                  href={settings.zomatoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 text-xs font-bold text-white bg-[#CB202D] hover:bg-[#b81b27] rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <span>Order</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-[11px] font-semibold text-emerald-200/70 bg-[#183B2B] px-2 py-1 rounded border border-[#23583F]">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        </section>

        {/* 5. HOTEL DETAILS, LOCATION, ADDRESS, CONTACT & MAP (AT THE BOTTOM - THEMED SURFACES) */}
        <section id="details" className="pt-6 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8C547]">
              Hotel Information
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F5]">
              Details, Timings, Address & Contact
            </h3>
            <p className="font-telugu text-[#E8C547] text-xs sm:text-sm">
              స్వర్ణ భారతి నగర్, పశ్చిమ గూడూరు రూరల్, ఆంధ్రప్రదేశ్ 524101
            </p>
          </div>

          {/* Quick Stats & Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-[#102B1F]/90 border border-[#23583F]">
              <span className="text-[#E8C547] font-bold text-lg font-serif">4.1 / 5</span>
              <p className="text-[11px] text-emerald-200/80">Google Rating (262)</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#102B1F]/90 border border-[#23583F]">
              <span className="text-[#E8C547] font-bold text-lg font-serif">11:30 PM</span>
              <p className="text-[11px] text-emerald-200/80">Closing Time (Daily)</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#102B1F]/90 border border-[#23583F]">
              <span className="text-[#E8C547] font-bold text-lg font-serif">₹1–₹200</span>
              <p className="text-[11px] text-emerald-200/80">Price Per Person</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#102B1F]/90 border border-[#23583F]">
              <span className="text-[#E8C547] font-bold text-lg font-serif">100% Pure</span>
              <p className="text-[11px] text-emerald-200/80">Vegetarian Kitchen</p>
            </div>
          </div>

          {/* Train Passenger Food Service Box */}
          <div className="p-5 rounded-2xl bg-[#123023]/95 border border-[#23583F] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8C547] text-[#183B2B] flex items-center justify-center font-bold shrink-0">
                <Train className="w-5 h-5" />
              </div>
              <div className="text-xs text-left">
                <h4 className="font-bold text-[#FAF8F5] text-sm">
                  Gudur Junction (GDR) Train Food Service
                </h4>
                <p className="text-emerald-200/90 leading-relaxed mt-0.5">
                  Travelling by train? Contact Sri Sai Ramana Hotel 45–60 mins in advance to arrange fresh hot parcel food at Gudur.
                </p>
              </div>
            </div>

            <a
              href={`tel:${cleanPhone}`}
              className="px-4 py-2.5 rounded-xl bg-[#E8C547] hover:bg-[#F2D368] text-[#183B2B] font-bold text-xs shrink-0 inline-flex items-center gap-1.5 shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {settings.phone}</span>
            </a>
          </div>

          {/* Contact Details & Embedded Google Map Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Contact & Address Panel (5 cols) - Themed Dark Emerald */}
            <div className="md:col-span-5 bg-[#0F2E21]/95 text-[#F3E8D2] rounded-2xl p-6 border border-[#23583F] shadow-xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#FAF8F5]">
                    {settings.name}
                  </h4>
                  <p className="font-telugu text-[#E8C547] text-xs font-semibold">
                    {settings.teluguName}
                  </p>
                  <p className="text-xs text-emerald-200/70 mt-0.5">Vegetarian Restaurant in Gudur</p>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 text-xs">
                  <MapPin className="w-4 h-4 text-[#E8C547] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#FAF8F5] block font-semibold">Full Address</strong>
                    <span className="text-emerald-100/90 leading-relaxed block mt-0.5">
                      {settings.address}
                    </span>
                    <span className="text-[11px] text-emerald-300/60 block mt-0.5">Pin: 524101 · West Gudur Rural</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 text-xs">
                  <Phone className="w-4 h-4 text-[#E8C547] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#FAF8F5] block font-semibold">Phone / Order Enquiries</strong>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="text-[#E8C547] font-bold text-sm hover:underline tabular-nums block mt-0.5"
                    >
                      {settings.phone}
                    </a>
                    <span className="text-[11px] text-emerald-300/60 block">Click to call directly</span>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-3 text-xs">
                  <Clock className="w-4 h-4 text-[#E8C547] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#FAF8F5] block font-semibold">Opening Hours & Closing</strong>
                    <span className="text-emerald-100/90 block mt-0.5">{settings.openingHours}</span>
                    <span className="text-[#E8C547] font-semibold block text-[11px] mt-0.5">
                      Closing Time: {settings.closingTime} (Open All 7 Days)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-1/2 py-2.5 text-center rounded-xl bg-[#E8C547] hover:bg-[#F2D368] text-[#183B2B] text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full sm:w-1/2 py-2.5 text-center rounded-xl bg-[#14382A] hover:bg-[#1E4D36] text-white text-xs font-bold border border-[#2B6D4F] transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E8C547]" />
                  <span>Call Hotel</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map (7 cols) - Themed Frame */}
            <div className="md:col-span-7 bg-[#0F2E21] rounded-2xl overflow-hidden border border-[#23583F] shadow-xl min-h-[320px] flex flex-col">
              <div className="p-3 bg-[#14382A] border-b border-[#23583F] flex items-center justify-between text-xs text-emerald-100">
                <span className="font-semibold text-[#FAF8F5] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E8C547]" />
                  Google Maps · Gudur, Andhra Pradesh
                </span>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8C547] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <iframe
                title="Sri Sai Ramana Hotel Gudur Map"
                src="https://maps.google.com/maps?q=Sri+Sai+Ramana+Hotel+Swarna+Bharathi+Nagar+West+Gudur+Rural+Andhra+Pradesh+524101&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[300px] flex-1 opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 6. FOOTER - Themed Deep Emerald */}
      <footer className="relative z-10 bg-[#06170F] text-white border-t border-[#183B2B] py-8 px-4 mt-12 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-[#FAF8F5]">
              {settings.name} (<span className="font-telugu text-[#E8C547]">{settings.teluguName}</span>)
            </h4>
            <p className="text-emerald-200/80">
              {settings.address} · Phone: {settings.phone}
            </p>
          </div>

          <div className="flex items-center gap-4 text-emerald-300">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-white inline-flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Admin</span>
            </button>
            <span>·</span>
            <span>100% Pure Vegetarian</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      {settings.whatsappEnabled && (
        <a
          href={`https://wa.me/${settings.whatsappPhone || '919030418169'}?text=${encodeURIComponent(
            'Hello Sri Sai Ramana Hotel! I would like to enquire about your food menu and availability.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-40 w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          title="WhatsApp Enquiry"
          aria-label="WhatsApp Enquiry"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      )}

      {/* Order Modal (Swiggy / Zomato / Direct Call) */}
      <OrderModal
        item={selectedOrderItem}
        settings={settings}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onOpenAdmin={() => {
          setIsOrderModalOpen(false);
          setIsAdminOpen(true);
        }}
      />

      {/* Owner Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
        menuItems={menuItems}
        onUpdateMenuItems={setMenuItems}
        gallery={gallery}
        onUpdateGallery={() => {}}
      />
    </div>
  );
}
