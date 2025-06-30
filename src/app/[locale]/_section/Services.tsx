// app/components/PremiumTravelServices.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, ChevronRight, Search, MapPin, Calendar, User, Settings, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
const TravelServices = () => {
    const t = useTranslations('Services');
    const [activeTab, setActiveTab] = useState<'flights' | 'hotels'>('flights');
    const [searchQuery, setSearchQuery] = useState('');
  
    const services = [
      {
        id: 'flights',
        title: t('flights'),
        description: t('flightsDescription'),
        icon: <Plane className="w-6 h-6" />,
        features: [
          t('feature1'),
          t('feature2'),
          t('feature3')
        ]
      },
      {
        id: 'hotels',
        title: t('hotels'),
        description: t('hotelsDescription'),
        icon: <Hotel className="w-6 h-6" />,
        features: [
          t('feature4'),
          t('feature5'),
          t('feature6')
        ]
      }
    ];
  
    const activeService = services.find(service => service.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Search Card */}
        <motion.div 
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-1 mb-16 max-w-4xl mx-auto border border-gray-700/50 shadow-2xl shadow-black/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="flex border-b border-gray-700/50 mb-6">
            {services.map((service) => (
              <button
                key={service.id}
                className={`relative px-8 py-4 text-lg font-medium transition-colors ${
                  activeTab === service.id 
                    ? 'text-white' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab(service.id as 'flights' | 'hotels')}
              >
                {service.title}
                {activeTab === service.id && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="px-6 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <div className="absolute left-3 top-3.5 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-10 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <div className="absolute left-3 top-3.5 text-gray-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder={t('destinationPlaceholder')}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-10 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute left-3 top-3.5 text-gray-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder={t('datesPlaceholder')}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-10 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute left-3 top-3.5 text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder={t('travelersPlaceholder')}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-10 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <button className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
                <Settings className="w-5 h-5 mr-2" />
                {t('filters')}
              </button>
              
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30">
                {t('searchButton')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Service Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl shadow-black/50"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl mr-4">
                {activeService?.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{activeService?.title}</h3>
            </div>
            
            <p className="text-gray-400 mb-8">{activeService?.description}</p>
            
            <div className="space-y-5">
              {activeService?.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-cyan-500/10 p-1.5 rounded-lg mt-0.5 mr-4">
                    <ChevronRight className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
            
            <button className="mt-8 flex items-center text-cyan-400 hover:text-cyan-300 group transition-colors">
              <span className="mr-2">{t('learnMore')}</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl blur-xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700/50 h-full">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{t('statsTitle')}</h3>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">1.2M+</div>
                    <div className="text-gray-400">{t('bookings')}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">98%</div>
                    <div className="text-gray-400">{t('satisfaction')}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                    <div className="text-gray-400">{t('support')}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">150+</div>
                    <div className="text-gray-400">{t('destinations')}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div 
                        key={item}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 border-2 border-gray-900 flex items-center justify-center text-xs text-white font-bold"
                      >
                        +{item * 5}K
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400">{t('travelers')}</p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Global Partners */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <p className="text-gray-500 mb-8 uppercase tracking-widest text-sm">{t('partners')}</p>
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 w-24 h-24 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              >
                <Globe className="w-10 h-10 text-cyan-400" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TravelServices;