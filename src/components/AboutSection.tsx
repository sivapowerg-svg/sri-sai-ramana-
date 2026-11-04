import React from 'react';
import { Star, ShieldCheck, HeartHandshake, ChefHat } from 'lucide-react';
import { RestaurantSettings } from '../types/restaurant';

interface AboutSectionProps {
  settings: RestaurantSettings;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings }) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0D261B]/80 backdrop-blur-xs text-[#FAF8F5] relative border-b border-[#1E4D36]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Visual Composition (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image: Puri Bhaji on Steel Thali */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#E8C547]/30 bg-black">
                <img
                  src="/src/assets/images/food_puri_bhaji_poori_1793807867360.jpg"
                  alt="Traditional Puri Bhaji prepared at Sri Sai Ramana Hotel"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlapping Secondary Card: Authentic Commitment */}
              <div className="mt-4 sm:-mt-12 sm:ml-8 bg-[#183B2B] text-white p-5 rounded-xl shadow-2xl border border-[#2B6D4F] relative z-10 max-w-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-[#E8C547] text-[#183B2B] flex items-center justify-center font-bold">
                    <ChefHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-serif text-[#FAF8F5]">Handcrafted Daily</h4>
                    <p className="text-[11px] text-emerald-200">Fresh batters, pure ingredients</p>
                  </div>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  "No artificial flavors, no preservatives. Traditional Andhra vegetarian culinary techniques perfected over years of dedicated service."
                </p>
              </div>
            </div>
          </div>

          {/* Right: Editorial Content & Statistics (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#E8C547] block">
                Our Heritage & Values
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF8F5] tracking-tight">
                Tradition, Taste & Hospitality
              </h2>
              <p className="font-telugu text-[#E8C547] text-sm sm:text-base font-medium">
                శ్రీ సాయి రమణ హోటల్ – సాంప్రదాయం, పరిశుభ్రత, మరియు ఆత్మీయ ఆతిథ్యం
              </p>
            </div>

            <p className="text-emerald-100/90 text-base sm:text-lg leading-relaxed font-light">
              Nestled in Swarna Bharathi Nagar, West Gudur Rural, <strong className="text-white font-semibold">Sri Sai Ramana Hotel</strong> is a premier destination for lovers of authentic South Indian vegetarian cuisine. From dawn till late night, our kitchen simmers with fresh chutneys, steaming sambar, golden puris, and hot filter coffee.
            </p>

            <p className="text-emerald-200/80 text-sm sm:text-base leading-relaxed">
              We believe that honest food shouldn't cost a fortune. Whether you are a local resident craving morning tiffins, a highway traveler taking a refreshing break, or a railway passenger ordering food during a brief stop at Gudur Junction, we serve you with warm hospitality, impeccable hygiene, and generous portions.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#143527]/90 border border-[#23583F] shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#E8C547] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Hygienic Preparation</h4>
                  <p className="text-xs text-emerald-200/70 mt-0.5">Strict kitchen cleanliness and quality drinking water standards.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#143527]/90 border border-[#23583F] shadow-sm">
                <HeartHandshake className="w-5 h-5 text-[#E8C547] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Warm Family Service</h4>
                  <p className="text-xs text-emerald-200/70 mt-0.5">Polite, attentive staff dedicated to customer satisfaction.</p>
                </div>
              </div>
            </div>

            {/* Genuine Business Statistics Bar */}
            <div className="pt-4 border-t border-[#1E4D36]/60">
              <div className="grid grid-cols-3 gap-4 text-center sm:text-left">
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#143527]/90 border border-[#23583F]">
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-[#E8C547] font-bold text-2xl sm:text-3xl font-serif tabular-nums">
                    <span>{settings.googleRating}</span>
                    <Star className="w-5 h-5 text-[#E8C547] fill-[#E8C547]" />
                  </div>
                  <p className="text-xs text-emerald-200/80 mt-1 font-medium">Google Rating</p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#143527]/90 border border-[#23583F]">
                  <div className="text-[#E8C547] font-bold text-2xl sm:text-3xl font-serif tabular-nums">
                    {settings.googleReviewsCount}+
                  </div>
                  <p className="text-xs text-emerald-200/80 mt-1 font-medium">Google Reviews</p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#143527]/90 border border-[#23583F]">
                  <div className="text-[#E8C547] font-bold text-2xl sm:text-3xl font-serif tabular-nums">
                    ₹1–₹200
                  </div>
                  <p className="text-xs text-emerald-200/80 mt-1 font-medium">Reported Price / Person</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
