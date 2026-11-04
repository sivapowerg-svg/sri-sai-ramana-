import React from 'react';
import { Star, ExternalLink, CheckCircle, MessageSquare } from 'lucide-react';
import { RestaurantSettings, VerifiedReview } from '../types/restaurant';

interface CustomerReviewsSectionProps {
  settings: RestaurantSettings;
  reviews: VerifiedReview[];
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({ settings, reviews }) => {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#091F15]/85 backdrop-blur-xs text-[#FAF8F5] border-b border-[#1E4D36]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#143527] border border-[#23583F] text-[#E8C547] text-xs font-semibold uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Google Verified Business Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="font-telugu text-[#E8C547] text-base sm:text-lg">
            కస్టమర్ల నిజమైన సమీక్షలు మరియు అనుభవాలు
          </p>

          {/* Aggregate Rating Scoreboard */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-[#143527]/90 px-4 py-2 rounded-xl border border-[#23583F] shadow-sm">
              <span className="text-2xl font-serif font-bold text-[#E8C547] tabular-nums">
                {settings.googleRating}
              </span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(settings.googleRating)
                        ? 'text-[#E8C547] fill-[#E8C547]'
                        : star === 5 && settings.googleRating >= 4.1
                        ? 'text-[#E8C547] fill-[#E8C547]/50'
                        : 'text-stone-500'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-emerald-200/80 font-medium ml-1">
                ({settings.googleReviewsCount} Reviews)
              </span>
            </div>

            <a
              href={settings.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#183B2B] bg-[#E8C547] hover:bg-[#F2D368] active:scale-[0.98] rounded-xl shadow-xs transition-all whitespace-nowrap"
            >
              <span>Read All Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4 Theme Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10 text-center">
          <div className="p-3 bg-[#123023]/90 rounded-xl border border-[#23583F] shadow-sm">
            <p className="text-xs font-bold text-white">Hygienic & Tasty</p>
            <p className="text-[11px] text-[#E8C547]">Daily Fresh Batters</p>
          </div>
          <div className="p-3 bg-[#123023]/90 rounded-xl border border-[#23583F] shadow-sm">
            <p className="text-xs font-bold text-white">Generous Quantity</p>
            <p className="text-[11px] text-[#E8C547]">Value for Money</p>
          </div>
          <div className="p-3 bg-[#123023]/90 rounded-xl border border-[#23583F] shadow-sm">
            <p className="text-xs font-bold text-white">Authentic Flavors</p>
            <p className="text-[11px] text-[#E8C547]">South Indian Heritage</p>
          </div>
          <div className="p-3 bg-[#123023]/90 rounded-xl border border-[#23583F] shadow-sm">
            <p className="text-xs font-bold text-white">Train Journey Parcels</p>
            <p className="text-[11px] text-[#E8C547]">Gudur Jn. Travelers</p>
          </div>
        </div>

        {/* Verified Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header: Author & Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#183B2B] text-[#E8C547] flex items-center justify-center font-bold text-sm">
                      {rev.avatarLetter}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                        {rev.author}
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Google Diner
                        </span>
                      </h4>
                      <p className="text-[11px] text-stone-400">{rev.date}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#E8C547] fill-[#E8C547]" />
                    ))}
                  </div>
                </div>

                {/* Theme Kicker */}
                <span className="inline-block text-xs font-semibold text-[#183B2B] bg-stone-100 px-2.5 py-1 rounded-md">
                  Theme: {rev.theme}
                </span>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Verified Google Review
                </span>
                <span className="font-mono">Gudur, AP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
