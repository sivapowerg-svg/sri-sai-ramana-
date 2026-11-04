import React from 'react';
import { Flame, Sparkles, ShieldCheck, IndianRupee, HeartHandshake, MapPin } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      icon: Flame,
      title: 'Authentic South Indian Taste',
      telugu: 'సాంప్రదాయ దక్షిణాది రుచి',
      description:
        'Recipes perfected with pure ghee, authentic sambar masala, freshly grated coconut, and stone-ground batter.',
    },
    {
      icon: Sparkles,
      title: 'Freshly Prepared Food',
      telugu: 'రోజూ తాజా తయారీ',
      description:
        'Every tiffin is steamed and roasted live on order. Never reheated or prepared with chemical leaveners.',
    },
    {
      icon: ShieldCheck,
      title: 'Hygiene & Quality',
      telugu: 'పరిశుభ్రమైన నాణ్యత',
      description:
        'Sanitized food prep counters, RO-purified cooking water, and stainless steel dining equipment maintained to high standards.',
    },
    {
      icon: IndianRupee,
      title: 'Affordable Prices',
      telugu: 'అందుబాటు ధరలు (₹1–₹200)',
      description:
        'Honest, pocket-friendly pricing that guarantees wholesome satisfaction for daily diners, families, and travelers alike.',
    },
    {
      icon: HeartHandshake,
      title: 'Friendly Customer Service',
      telugu: 'ఆత్మీయ సేవ',
      description:
        'Attentive, courteous Andhra hospitality that welcomes you with quick service and warm smiles.',
    },
    {
      icon: MapPin,
      title: 'Convenient Location',
      telugu: 'సులువైన చేరువ',
      description:
        'Located in Swarna Bharathi Nagar, West Gudur Rural, conveniently accessible from the railway junction and town roads.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#091F15]/85 backdrop-blur-xs text-[#FAF8F5] border-b border-[#1E4D36]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#E8C547] block">
            Why Dine With Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight">
            The Sri Sai Ramana Experience
          </h2>
          <p className="font-telugu text-[#E8C547] text-base sm:text-lg">
            మమ్మల్ని ఎందుకు ఎంచుకోవాలి?
          </p>
          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
            Committed to genuine vegetarian purity, authentic flavors, and memorable hospitality every single day.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-[#123023]/90 rounded-2xl p-7 border border-[#23583F] shadow-md hover:border-[#E8C547]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1B4D36] text-[#E8C547] flex items-center justify-center group-hover:bg-[#E8C547] group-hover:text-[#183B2B] transition-colors duration-300 shadow-sm border border-[#2B6D4F]">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#FAF8F5] tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="font-telugu text-xs text-[#E8C547] font-medium">{feat.telugu}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed font-light">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1E4D36]/60 flex items-center justify-between text-[11px] text-emerald-300/60 font-mono">
                  <span>0{idx + 1}</span>
                  <span className="text-[#E8C547] font-medium">Sri Sai Ramana Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
