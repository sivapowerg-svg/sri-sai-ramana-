import React, { useState } from 'react';
import {
  X,
  Lock,
  LogOut,
  Utensils,
  Store,
  ShoppingBag,
  Image as ImageIcon,
  Database,
  Save,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Copy,
} from 'lucide-react';
import { MenuItem, RestaurantSettings, GalleryItem } from '../types/restaurant';
import { RestaurantService } from '../services/restaurantService';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  settings: RestaurantSettings;
  onUpdateSettings: (newSettings: RestaurantSettings) => void;
  menuItems: MenuItem[];
  onUpdateMenuItems: (items: MenuItem[]) => void;
  gallery: GalleryItem[];
  onUpdateGallery: (items: GalleryItem[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  menuItems,
  onUpdateMenuItems,
  gallery,
  onUpdateGallery,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => RestaurantService.checkAuth());
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'menu' | 'business' | 'ordering' | 'gallery' | 'database'>('menu');

  // Form states for business settings
  const [editSettings, setEditSettings] = useState<RestaurantSettings>(settings);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  // Form state for adding/editing a menu item
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [newItemForm, setNewItemForm] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    teluguName: '',
    category: 'breakfast',
    description: '',
    price: 50,
    isVegetarian: true,
    isVerified: true,
    isAvailable: true,
    imageUrl: '/src/assets/images/hero_south_indian_feast_1793807865658.jpg',
    servesCount: '1 person',
  });

  // Gallery add state
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (RestaurantService.login(passcode)) {
      setIsAuthenticated(true);
      setAuthError('');
      setEditSettings(RestaurantService.getSettings());
    } else {
      setAuthError('Incorrect passcode. Default is "sairamana2024".');
    }
  };

  const handleLogout = () => {
    RestaurantService.logout();
    setIsAuthenticated(false);
  };

  const handleSaveSettings = () => {
    RestaurantService.saveSettings(editSettings);
    onUpdateSettings(editSettings);
    setSettingsSavedNotice(true);
    setTimeout(() => setSettingsSavedNotice(false), 2500);
  };

  const handleToggleItemAvailability = (id: string, current: boolean) => {
    RestaurantService.updateMenuItem(id, { isAvailable: !current });
    onUpdateMenuItems(RestaurantService.getMenuItems());
  };

  const handleToggleItemVerified = (id: string, current: boolean) => {
    RestaurantService.updateMenuItem(id, { isVerified: !current });
    onUpdateMenuItems(RestaurantService.getMenuItems());
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      RestaurantService.deleteMenuItem(id);
      onUpdateMenuItems(RestaurantService.getMenuItems());
    }
  };

  const handleSaveEditedItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMenuItem) return;
    RestaurantService.updateMenuItem(editingMenuItem.id, editingMenuItem);
    onUpdateMenuItems(RestaurantService.getMenuItems());
    setEditingMenuItem(null);
  };

  const handleCreateNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    RestaurantService.addMenuItem(newItemForm);
    onUpdateMenuItems(RestaurantService.getMenuItems());
    setIsAddingNewItem(false);
    setNewItemForm({
      name: '',
      teluguName: '',
      category: 'breakfast',
      description: '',
      price: 50,
      isVegetarian: true,
      isVerified: true,
      isAvailable: true,
      imageUrl: '/src/assets/images/hero_south_indian_feast_1793807865658.jpg',
      servesCount: '1 person',
    });
  };

  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryTitle || !newGalleryUrl) return;
    RestaurantService.addGalleryItem({
      title: newGalleryTitle,
      category: 'breakfast',
      imageUrl: newGalleryUrl,
      caption: newGalleryCaption || newGalleryTitle,
    });
    onUpdateGallery(RestaurantService.getGallery());
    setNewGalleryTitle('');
    setNewGalleryUrl('');
    setNewGalleryCaption('');
  };

  const handleDeleteGalleryItem = (id: string) => {
    RestaurantService.deleteGalleryItem(id);
    onUpdateGallery(RestaurantService.getGallery());
  };

  const handleResetToFactory = () => {
    if (
      window.confirm(
        'Warning: This will reset all menu items, settings, and gallery to defaults. Continue?'
      )
    ) {
      RestaurantService.resetToDefaults();
      onUpdateSettings(RestaurantService.getSettings());
      onUpdateMenuItems(RestaurantService.getMenuItems());
      onUpdateGallery(RestaurantService.getGallery());
      setEditSettings(RestaurantService.getSettings());
      alert('Reset to defaults complete!');
    }
  };

  const supabaseSqlSchema = `-- Supabase PostgreSQL Schema & Row Level Security Policies
-- Sri Sai Ramana Hotel Database Setup

create type menu_category as enum ('breakfast', 'specials', 'meals', 'rice', 'beverages');

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  telugu_name text not null,
  category menu_category not null default 'breakfast',
  description text not null,
  price numeric(10, 2) not null,
  is_vegetarian boolean not null default true,
  is_verified boolean not null default false,
  is_available boolean not null default true,
  image_url text not null,
  badge text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.restaurant_settings (
  id text primary key default 'primary_restaurant',
  name text not null default 'Sri Sai Ramana Hotel',
  telugu_name text not null default 'శ్రీ సాయి రమణ హోటల్',
  tagline text not null,
  telugu_tagline text not null,
  phone text not null default '090304 18169',
  address text not null,
  opening_hours text not null default '06:30 AM – 11:30 PM (Daily)',
  closing_time text not null default '11:30 PM',
  swiggy_url text,
  swiggy_enabled boolean default true,
  zomato_url text,
  zomato_enabled boolean default true
);

alter table public.menu_items enable row level security;
alter table public.restaurant_settings enable row level security;

create policy "Public menu read" on public.menu_items for select using (true);
create policy "Public settings read" on public.restaurant_settings for select using (true);
create policy "Admin menu modify" on public.menu_items for all to authenticated using (true);
create policy "Admin settings modify" on public.restaurant_settings for all to authenticated using (true);
`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#0A2016] text-[#FAF8F5] rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#23583F] my-auto">
        {/* Modal Top Bar */}
        <div className="bg-[#123023] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-[#1E4D36]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8C547] text-[#183B2B] flex items-center justify-center font-bold">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#FAF8F5] leading-tight">
                Owner Business Management Portal
              </h2>
              <p className="text-xs text-[#E8C547]">Sri Sai Ramana Hotel · Gudur</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14382A] text-emerald-200 hover:text-white text-xs font-semibold border border-[#23583F] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-emerald-200 hover:text-white p-1 rounded-md"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Login View - Themed Emerald */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#14382A] text-[#E8C547] border border-[#23583F] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-[#FAF8F5]">Owner Authentication</h3>
              <p className="text-xs text-emerald-200/80">
                Please enter your hotel owner security passcode to access business settings and menu controls.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full px-4 py-3 rounded-xl border border-[#23583F] text-center text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-[#E8C547] bg-[#102B1F] text-[#FAF8F5]"
                  autoFocus
                />
                {authError && <p className="text-xs text-rose-400 mt-2 font-medium">{authError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 text-sm font-bold text-[#183B2B] bg-[#E8C547] hover:bg-[#F2D368] active:scale-[0.98] rounded-xl shadow-md transition-all cursor-pointer"
              >
                Unlock Dashboard
              </button>

              <p className="text-[11px] text-emerald-300/60">
                Default Owner Passcode: <code className="bg-[#14382A] border border-[#23583F] px-1.5 py-0.5 rounded text-[#E8C547]">sairamana2024</code>
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs */
          <div className="flex-1 flex flex-col min-h-0">
            {/* Tabs Bar */}
            <div className="bg-[#081811] border-b border-[#1E4D36] px-6 py-2.5 flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('menu')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'menu'
                    ? 'bg-[#E8C547] text-[#183B2B] font-bold shadow-xs'
                    : 'text-emerald-100 hover:text-white hover:bg-white/5'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Menu Items ({menuItems.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('ordering')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'ordering'
                    ? 'bg-[#E8C547] text-[#183B2B] font-bold shadow-xs'
                    : 'text-emerald-100 hover:text-white hover:bg-white/5'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Swiggy & Zomato URLs</span>
              </button>

              <button
                onClick={() => setActiveTab('business')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'business'
                    ? 'bg-[#E8C547] text-[#183B2B] font-bold shadow-xs'
                    : 'text-emerald-100 hover:text-white hover:bg-white/5'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Hotel Info & Hours</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-[#E8C547] text-[#183B2B] font-bold shadow-xs'
                    : 'text-emerald-100 hover:text-white hover:bg-white/5'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Gallery ({gallery.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('database')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'database'
                    ? 'bg-[#E8C547] text-[#183B2B] font-bold shadow-xs'
                    : 'text-emerald-100 hover:text-white hover:bg-white/5'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Supabase / SQL Schema</span>
              </button>

              {settingsSavedNotice && (
                <span className="ml-auto inline-flex items-center gap-1 text-xs text-[#E8C547] bg-[#14382A] border border-[#23583F] px-2.5 py-1 rounded-md font-semibold animate-pulse">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Saved to Database!
                </span>
              )}
            </div>

            {/* Tab Panes */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: MENU MANAGEMENT */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-[#FAF8F5]">Food Menu Management</h3>
                      <p className="text-xs text-emerald-200/80">
                        Update dish names, verified prices, descriptions, and toggle daily availability.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingNewItem(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#183B2B] bg-[#E8C547] hover:bg-[#F2D368] rounded-xl shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Dish</span>
                    </button>
                  </div>

                  {/* Add New Item Form */}
                  {isAddingNewItem && (
                    <form
                      onSubmit={handleCreateNewItem}
                      className="p-5 rounded-2xl bg-[#0F2E21] border border-[#23583F] shadow-lg space-y-4"
                    >
                      <h4 className="font-bold text-sm text-[#E8C547] flex items-center justify-between">
                        <span>Create New Menu Item</span>
                        <button
                          type="button"
                          onClick={() => setIsAddingNewItem(false)}
                          className="text-emerald-200/70 hover:text-white text-xs"
                        >
                          Cancel
                        </button>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-emerald-100 mb-1">
                            Dish Name (English)
                          </label>
                          <input
                            type="text"
                            required
                            value={newItemForm.name}
                            onChange={(e) => setNewItemForm({ ...newItemForm, name: e.target.value })}
                            placeholder="e.g. Rava Dosa"
                            className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-emerald-100 mb-1">
                            Telugu Name (తెలుగు)
                          </label>
                          <input
                            type="text"
                            required
                            value={newItemForm.teluguName}
                            onChange={(e) =>
                              setNewItemForm({ ...newItemForm, teluguName: e.target.value })
                            }
                            placeholder="e.g. రవ్వ దోశ"
                            className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-[#E8C547] font-telugu"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-emerald-100 mb-1">
                            Category
                          </label>
                          <select
                            value={newItemForm.category}
                            onChange={(e) =>
                              setNewItemForm({
                                ...newItemForm,
                                category: e.target.value as MenuItem['category'],
                              })
                            }
                            className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                          >
                            <option value="breakfast">Breakfast & Tiffins</option>
                            <option value="specials">South Indian Specials</option>
                            <option value="meals">Meals (Thali)</option>
                            <option value="rice">Rice Items</option>
                            <option value="beverages">Beverages</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-emerald-100 mb-1">
                            Price (₹ in INR)
                          </label>
                          <input
                            type="number"
                            required
                            value={newItemForm.price}
                            onChange={(e) =>
                              setNewItemForm({ ...newItemForm, price: Number(e.target.value) })
                            }
                            className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-[#E8C547] font-mono"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-emerald-100 mb-1">
                            Description
                          </label>
                          <textarea
                            rows={2}
                            value={newItemForm.description}
                            onChange={(e) =>
                              setNewItemForm({ ...newItemForm, description: e.target.value })
                            }
                            placeholder="Fresh ingredients, traditional preparation..."
                            className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-emerald-100 mb-1">
                            Image URL / Asset Path
                          </label>
                          <input
                            type="text"
                            value={newItemForm.imageUrl}
                            onChange={(e) =>
                              setNewItemForm({ ...newItemForm, imageUrl: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingNewItem(false)}
                          className="px-4 py-2 text-xs font-medium text-emerald-200 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 text-xs font-bold text-[#183B2B] bg-[#E8C547] rounded-lg shadow-xs"
                        >
                          Save New Dish
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Edit Item Form */}
                  {editingMenuItem && (
                    <form
                      onSubmit={handleSaveEditedItem}
                      className="p-5 rounded-2xl bg-[#0F2E21] border border-[#E8C547]/50 shadow-xl space-y-4"
                    >
                      <h4 className="font-bold text-sm text-[#E8C547] flex items-center justify-between">
                        <span>Edit Dish: {editingMenuItem.name}</span>
                        <button
                          type="button"
                          onClick={() => setEditingMenuItem(null)}
                          className="text-emerald-200/70 hover:text-white text-xs"
                        >
                          Close
                        </button>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-emerald-100 mb-1">
                            Dish Name (English)
                          </label>
                          <input
                            type="text"
                            value={editingMenuItem.name}
                            onChange={(e) =>
                              setEditingMenuItem({ ...editingMenuItem, name: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-emerald-100 mb-1">
                            Telugu Name
                          </label>
                          <input
                            type="text"
                            value={editingMenuItem.teluguName}
                            onChange={(e) =>
                              setEditingMenuItem({ ...editingMenuItem, teluguName: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-[#E8C547] font-telugu"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-emerald-100 mb-1">
                            Category
                          </label>
                          <select
                            value={editingMenuItem.category}
                            onChange={(e) =>
                              setEditingMenuItem({
                                ...editingMenuItem,
                                category: e.target.value as MenuItem['category'],
                              })
                            }
                            className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                          >
                            <option value="breakfast">Breakfast & Tiffins</option>
                            <option value="specials">South Indian Specials</option>
                            <option value="meals">Meals (Thali)</option>
                            <option value="rice">Rice Items</option>
                            <option value="beverages">Beverages</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-emerald-100 mb-1">
                            Price (₹ in INR)
                          </label>
                          <input
                            type="number"
                            value={editingMenuItem.price}
                            onChange={(e) =>
                              setEditingMenuItem({
                                ...editingMenuItem,
                                price: Number(e.target.value),
                              })
                            }
                            className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-[#E8C547] font-mono"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-emerald-100 mb-1">
                            Description
                          </label>
                          <textarea
                            rows={2}
                            value={editingMenuItem.description}
                            onChange={(e) =>
                              setEditingMenuItem({
                                ...editingMenuItem,
                                description: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                          />
                        </div>

                        <div className="flex items-center gap-4 sm:col-span-2">
                          <label className="flex items-center gap-2 text-xs font-medium text-emerald-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingMenuItem.isVerified}
                              onChange={(e) =>
                                setEditingMenuItem({
                                  ...editingMenuItem,
                                  isVerified: e.target.checked,
                                })
                              }
                              className="rounded text-[#E8C547]"
                            />
                            <span>Verified Specialty (hide 'Sample' notice)</span>
                          </label>

                          <label className="flex items-center gap-2 text-xs font-medium text-emerald-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingMenuItem.isAvailable}
                              onChange={(e) =>
                                setEditingMenuItem({
                                  ...editingMenuItem,
                                  isAvailable: e.target.checked,
                                })
                              }
                              className="rounded text-[#E8C547]"
                            />
                            <span>Available in Kitchen Today</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingMenuItem(null)}
                          className="px-4 py-2 text-xs font-medium text-emerald-200 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 text-xs font-bold text-[#183B2B] bg-[#E8C547] rounded-lg shadow-xs"
                        >
                          Update Dish
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Menu Items Table - Themed */}
                  <div className="rounded-2xl border border-[#23583F] overflow-hidden bg-[#0F2E21] shadow-md">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-emerald-100">
                        <thead className="bg-[#081811] text-[#E8C547] uppercase font-semibold text-[10px] tracking-wider border-b border-[#1E4D36]">
                          <tr>
                            <th className="px-4 py-3">Dish</th>
                            <th className="px-3 py-3">Category</th>
                            <th className="px-3 py-3">Price</th>
                            <th className="px-3 py-3">Verification</th>
                            <th className="px-3 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A4231]">
                          {menuItems.map((item) => (
                            <tr key={item.id} className="hover:bg-[#14382A]/70">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-10 h-10 rounded-lg object-cover border border-[#23583F] shrink-0"
                                  />
                                  <div>
                                    <strong className="text-[#FAF8F5] font-semibold block text-xs">
                                      {item.name}
                                    </strong>
                                    <span className="font-telugu text-[11px] text-[#E8C547]">
                                      {item.teluguName}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              <td className="px-3 py-3 capitalize text-emerald-200">{item.category}</td>

                              <td className="px-3 py-3 font-mono font-bold text-[#E8C547] tabular-nums">
                                ₹{item.price}
                              </td>

                              <td className="px-3 py-3">
                                <button
                                  onClick={() =>
                                    handleToggleItemVerified(item.id, item.isVerified)
                                  }
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded cursor-pointer ${
                                    item.isVerified
                                      ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-600'
                                      : 'bg-amber-950/80 text-amber-200 border border-amber-600'
                                  }`}
                                  title="Click to toggle verified status"
                                >
                                  {item.isVerified ? 'Verified' : 'Sample'}
                                </button>
                              </td>

                              <td className="px-3 py-3">
                                <button
                                  onClick={() =>
                                    handleToggleItemAvailability(item.id, item.isAvailable)
                                  }
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded cursor-pointer ${
                                    item.isAvailable
                                      ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-600'
                                      : 'bg-rose-950/80 text-rose-200 border border-rose-600'
                                  }`}
                                  title="Click to toggle availability"
                                >
                                  {item.isAvailable ? 'Available' : 'Sold Out'}
                                </button>
                              </td>

                              <td className="px-4 py-3 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    onClick={() => setEditingMenuItem(item)}
                                    className="p-1.5 text-emerald-300 hover:text-white rounded hover:bg-[#14382A]"
                                    title="Edit item"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="p-1.5 text-rose-400 hover:text-rose-200 rounded hover:bg-rose-950/40"
                                    title="Delete item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ONLINE ORDERING SETTINGS */}
              {activeTab === 'ordering' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#FAF8F5]">
                      Swiggy & Zomato Online Ordering Configuration
                    </h3>
                    <p className="text-xs text-emerald-200/80 mt-0.5">
                      Enter the direct restaurant listing URLs for Sri Sai Ramana Hotel from Swiggy and Zomato. If a URL is left blank, customer buttons will gracefully display "Coming Soon".
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0F2E21] border border-[#23583F] space-y-6">
                    {/* Swiggy Configuration */}
                    <div className="space-y-3 pb-6 border-b border-[#1E4D36]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-[#FC8019] text-white flex items-center justify-center font-bold text-xs">
                            S
                          </span>
                          <h4 className="text-sm font-bold text-[#FAF8F5]">Swiggy Restaurant Listing</h4>
                        </div>
                        <label className="flex items-center gap-2 text-xs font-semibold text-emerald-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editSettings.swiggyEnabled}
                            onChange={(e) =>
                              setEditSettings({ ...editSettings, swiggyEnabled: e.target.checked })
                            }
                            className="rounded text-[#FC8019]"
                          />
                          <span>Enable Swiggy Integration</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-emerald-200 mb-1">
                          Swiggy Restaurant URL
                        </label>
                        <input
                          type="url"
                          value={editSettings.swiggyUrl}
                          onChange={(e) =>
                            setEditSettings({ ...editSettings, swiggyUrl: e.target.value })
                          }
                          placeholder="https://www.swiggy.com/restaurants/sri-sai-ramana-hotel-gudur-..."
                          className="w-full px-3.5 py-2.5 text-xs border border-[#23583F] rounded-xl bg-[#14382A] text-white focus:border-[#E8C547]"
                        />
                        <p className="text-[11px] text-emerald-300/60 mt-1">
                          When empty, buttons display "Online ordering link coming soon".
                        </p>
                      </div>
                    </div>

                    {/* Zomato Configuration */}
                    <div className="space-y-3 pb-6 border-b border-[#1E4D36]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-[#CB202D] text-white flex items-center justify-center font-bold text-xs italic">
                            Z
                          </span>
                          <h4 className="text-sm font-bold text-[#FAF8F5]">Zomato Restaurant Listing</h4>
                        </div>
                        <label className="flex items-center gap-2 text-xs font-semibold text-emerald-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editSettings.zomatoEnabled}
                            onChange={(e) =>
                              setEditSettings({ ...editSettings, zomatoEnabled: e.target.checked })
                            }
                            className="rounded text-[#CB202D]"
                          />
                          <span>Enable Zomato Integration</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-emerald-200 mb-1">
                          Zomato Restaurant URL
                        </label>
                        <input
                          type="url"
                          value={editSettings.zomatoUrl}
                          onChange={(e) =>
                            setEditSettings({ ...editSettings, zomatoUrl: e.target.value })
                          }
                          placeholder="https://www.zomato.com/gudur/sri-sai-ramana-hotel-west-gudur-rural"
                          className="w-full px-3.5 py-2.5 text-xs border border-[#23583F] rounded-xl bg-[#14382A] text-white focus:border-[#E8C547]"
                        />
                        <p className="text-[11px] text-emerald-300/60 mt-1">
                          When empty, buttons display "Online ordering link coming soon".
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleSaveSettings}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-[#183B2B] bg-[#E8C547] hover:bg-[#F2D368] rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-[#183B2B]" />
                      <span>Save Online Ordering Settings</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: BUSINESS INFORMATION & HOURS */}
              {activeTab === 'business' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#FAF8F5]">
                      Hotel Information, Hours & Contact
                    </h3>
                    <p className="text-xs text-emerald-200/80 mt-0.5">
                      Maintain official hotel contact numbers, closing times, and address.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0F2E21] border border-[#23583F] space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-emerald-100 mb-1">
                          Hotel Name (English)
                        </label>
                        <input
                          type="text"
                          value={editSettings.name}
                          onChange={(e) => setEditSettings({ ...editSettings, name: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-emerald-100 mb-1">
                          Telugu Name (తెలుగు)
                        </label>
                        <input
                          type="text"
                          value={editSettings.teluguName}
                          onChange={(e) =>
                            setEditSettings({ ...editSettings, teluguName: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-[#E8C547] font-telugu"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-emerald-100 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={editSettings.phone}
                          onChange={(e) => setEditSettings({ ...editSettings, phone: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-[#E8C547] tabular-nums"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-emerald-100 mb-1">
                          Closing Time
                        </label>
                        <input
                          type="text"
                          value={editSettings.closingTime}
                          onChange={(e) =>
                            setEditSettings({ ...editSettings, closingTime: e.target.value })
                          }
                          placeholder="e.g. 11:30 PM"
                          className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-emerald-100 mb-1">
                          Daily Opening Hours
                        </label>
                        <input
                          type="text"
                          value={editSettings.openingHours}
                          onChange={(e) =>
                            setEditSettings({ ...editSettings, openingHours: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-emerald-100 mb-1">
                          Address
                        </label>
                        <textarea
                          rows={2}
                          value={editSettings.address}
                          onChange={(e) =>
                            setEditSettings({ ...editSettings, address: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-emerald-100 mb-1">
                          Owner Admin Passcode
                        </label>
                        <input
                          type="text"
                          value={editSettings.adminPasscode}
                          onChange={(e) =>
                            setEditSettings({ ...editSettings, adminPasscode: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-[#E8C547] font-mono"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-5">
                        <label className="flex items-center gap-2 text-xs font-semibold text-emerald-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editSettings.whatsappEnabled}
                            onChange={(e) =>
                              setEditSettings({
                                ...editSettings,
                                whatsappEnabled: e.target.checked,
                              })
                            }
                            className="rounded text-[#E8C547]"
                          />
                          <span>Confirm phone is WhatsApp-enabled</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-[#1E4D36]">
                      <button
                        onClick={handleSaveSettings}
                        className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-[#183B2B] bg-[#E8C547] hover:bg-[#F2D368] rounded-xl shadow-md cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-[#183B2B]" />
                        <span>Save Business Settings</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetToFactory}
                        className="text-xs text-rose-400 hover:underline cursor-pointer"
                      >
                        Reset to Defaults
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: GALLERY MANAGEMENT */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#FAF8F5]">
                      Food & Restaurant Gallery
                    </h3>
                    <p className="text-xs text-emerald-200/80 mt-0.5">
                      Add, view, and manage showcase photography displayed in the customer gallery.
                    </p>
                  </div>

                  {/* Add Image Form */}
                  <form
                    onSubmit={handleAddGalleryItem}
                    className="p-5 rounded-2xl bg-[#0F2E21] border border-[#23583F] space-y-4"
                  >
                    <h4 className="font-bold text-xs text-[#E8C547] uppercase tracking-wider">
                      Add New Photo to Gallery
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          value={newGalleryTitle}
                          onChange={(e) => setNewGalleryTitle(e.target.value)}
                          placeholder="Photo title (e.g., Crispy Masala Dosa)"
                          className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          value={newGalleryUrl}
                          onChange={(e) => setNewGalleryUrl(e.target.value)}
                          placeholder="Image URL / Path"
                          className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={newGalleryCaption}
                          onChange={(e) => setNewGalleryCaption(e.target.value)}
                          placeholder="Caption / Description"
                          className="w-full px-3 py-2 text-xs border border-[#23583F] rounded-lg bg-[#14382A] text-white"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold text-[#183B2B] bg-[#E8C547] rounded-lg shadow-xs"
                    >
                      Upload / Add to Gallery
                    </button>
                  </form>

                  {/* Existing Gallery Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {gallery.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl overflow-hidden border border-[#23583F] bg-[#123023] shadow-md relative group"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2.5">
                          <h5 className="font-bold text-xs text-[#FAF8F5] truncate">{item.title}</h5>
                          <p className="text-[10px] text-emerald-200/70 line-clamp-1">{item.caption}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="absolute top-2 right-2 p-1.5 rounded bg-black/70 text-rose-300 hover:bg-rose-700 hover:text-white transition-colors"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: DATABASE & SUPABASE MIGRATION */}
              {activeTab === 'database' && (
                <div className="space-y-4 max-w-4xl">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#FAF8F5]">
                      Supabase & PostgreSQL Architecture
                    </h3>
                    <p className="text-xs text-emerald-200/80 mt-0.5">
                      Ready-to-run PostgreSQL schema with Row Level Security (RLS) policies for menu items, settings, and gallery storage.
                    </p>
                  </div>

                  <div className="relative rounded-2xl bg-[#081811] text-emerald-300 p-5 font-mono text-xs overflow-x-auto shadow-inner border border-[#1E4D36]">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(supabaseSqlSchema);
                        setCopiedSql(true);
                        setTimeout(() => setCopiedSql(false), 2000);
                      }}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[#14382A] hover:bg-[#1E4D36] text-[#E8C547] text-xs font-sans font-medium flex items-center gap-1.5 border border-[#23583F] cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
                    </button>
                    <pre className="whitespace-pre">{supabaseSqlSchema}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
