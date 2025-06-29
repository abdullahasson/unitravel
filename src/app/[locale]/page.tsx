// app/page.tsx
'use client';

// Framer Motion
import { motion } from 'framer-motion';
// Components
import WhyUs from "./_section/whyUs"
import Hero from "./_section/hero";
import MobileApp from "./_section/mobile-app"
import Search from "@/components/Search"
// Icons
import { 
  Plane, 
  ArrowLeft, 
} from 'lucide-react';


// Mock data for featured destinations
const featuredDestinations = [
  { id: 1, name: "بالي، إندونيسيا", price: "$589", image: "bali" },
  { id: 2, name: "باريس، فرنسا", price: "$429", image: "paris" },
  { id: 3, name: "طوكيو، اليابان", price: "$799", image: "tokyo" },
  { id: 4, name: "سانتوريني، اليونان", price: "$659", image: "santorini" },
];

// Mock flight deals
const flightDeals = [
  { id: 1, from: "NYC", to: "LON", price: "$299", duration: "7h 15m", airline: "خطوط أتلانتيك الجوية" },
  { id: 2, from: "LAX", to: "SYD", price: "$899", duration: "15h 20m", airline: "خطوط باسيفيك الجوية" },
  { id: 3, from: "CHI", to: "ROM", price: "$549", duration: "9h 45m", airline: "يورو كونيكت" },
  { id: 4, from: "SFO", to: "BKK", price: "$749", duration: "17h 30m", airline: "آسيا إكسبريس" },
];

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      {/* Hero Section */}
      <Hero />

      <Search />

      {/* Flight Deals */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">أفضل عروض السفر اليوم</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              عروض لفترة محدود
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flightDeals.map((deal) => (
              <motion.div
                key={deal.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                      <Plane className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{deal.from} → {deal.to}</h3>
                      <p className="text-gray-600">{deal.airline} • {deal.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{deal.price}</div>
                    <div className="text-sm text-gray-500">رحلة ذهاب وعودة</div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                  <div className="text-sm text-gray-600">مقاعد محدودة بهذا السعر</div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    احجز الأن <ArrowLeft className="mr-1" size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


      {/* Featured Destinations */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">وجهات سياحية</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              اكتشف وجهات رائعة مع أفضل عروض رحلاتنا  
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className={`h-48 bg-gradient-to-br from-blue-400 to-cyan-500 relative`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                      <p className="text-white">{destination.price}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    Save 20%
                  </div>
                </div>
                <div className="p-6">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all">
                    عرض العروض
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>



      {/* Benefits Section */}
      <WhyUs />


      {/* Mobile App */}
      <MobileApp />

    </div>
  );
}