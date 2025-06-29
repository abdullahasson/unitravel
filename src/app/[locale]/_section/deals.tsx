// Next
import Image from "next/image"
// Next Intl
import { useTranslations } from "next-intl";
// Images
import Dubai from "../../../../public/dubai.jpg"
import Switherland from "../../../../public/switherland.jpg"
import Newyork from "../../../../public/newyork.jpg"
// Icons
import { Calendar, Clock, Star, Umbrella, Utensils } from 'lucide-react';

export default function Deals() {

    const t = useTranslations("Deals");

    const dealsData = [
        {
          id: 1,
          type: "طيران",
          image: Dubai,
          destination: "دبي",
          title: "نيويورك إلى باريس",
          price: "$459",
          priceSuffix: "ذهاب وعودة",
          description: "رحلة مباشرة مع وسائل رفاهية فاخرة. مقاعد محدودة متاحة.",
          meta: [
            { icon: <Calendar className="w-4 h-4" />, text: "مايو - أكتوبر 2024" },
            { icon: <Clock className="w-4 h-4" />, text: "7 ساعات 30 دقيقة" }
          ]
        },
        {
          id: 2,
          type: "فندق",
          image: Switherland,
          destination: "سويسرا",
          title: "منتجع فاخر في بالي",
          price: "$129",
          priceSuffix: "للليلة",
          description: "منتجع 5 نجوم مع شاطئ خاص ومنتجع صحي. يتضمن الإفطار.",
          meta: [
            { icon: <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />, text: "4.8 (120 تقييم)" },
            { icon: <Umbrella className="w-4 h-4" />, text: "مسبح" }
          ]
        },
        {
          id: 3,
          type: "باقة",
          image: Newyork,
          destination: "نيويورك",
          title: "عطلة في روما",
          price: "$799",
          priceSuffix: "للشخص",
          description: "رحلة طيران + 4 ليالي في فندق مركزي مع جولات سياحية مرافقة.",
          meta: [
            { icon: <Calendar className="w-4 h-4" />, text: "سبتمبر - ديسمبر 2024" },
            { icon: <Utensils className="w-4 h-4" />, text: "إفطار" }
          ]
        }
      ];

    return (
        <section className="py-10 ">
            <div className="mx-auto container">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold  text-gray-800 mb-4">{t("title")}</h2>
                    <p className="text-xl text-gray-600 mt-6">{t("subtitle")}</p>
                </div>
                <div className="flex justify-center mb-10">
                    <button className="active">{t("tabs.flights")}</button>
                    <button className="">{t("tabs.hotels")}</button>
                </div>


                {/* Deals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {dealsData.map((deal) => (
                        <div
                            key={deal.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-video">
                                <Image
                                    src={deal.image}
                                    alt={deal.destination}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            {/* Content Container */}
                            <div className="p-5 md:p-6 flex flex-col flex-grow">
                                {/* Badge */}
                                <div className="mb-4">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${deal.type === 'Flight' ? 'bg-blue-100 text-blue-800' :
                                        deal.type === 'Hotel' ? 'bg-emerald-100 text-emerald-800' :
                                            'bg-amber-100 text-amber-800'
                                        }`}>
                                        {deal.type}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{deal.title}</h3>

                                {/* Price */}
                                <div className="mb-3 flex items-baseline">
                                    <p className="text-2xl font-bold text-gray-900">{deal.price}</p>
                                    <span className="text-gray-500 text-base ml-2">{deal.priceSuffix}</span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-4 flex-grow">{deal.description}</p>

                                {/* Meta Information */}
                                <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-4">
                                    {deal.meta.map((item, index) => (
                                        <div key={index} className="flex items-center">
                                            <span className="mr-1.5 text-gray-400">{item.icon}</span>
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg">
                                    View Deal
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}