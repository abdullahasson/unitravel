// app/page.tsx
'use client';

// Types
import { Article } from '@/types/article';
// Components
import Hero from "./_section/hero";
import MobileApp from "./_section/mobile-app"
import WhyUs from "./_section/whyUs"
import TripIdeasSection from '@/components/TripIdeas/TripIdeasSection';
import PopularAirlines from '@/components/popular-airlines';
import ArticlesCarousel from '@/components/ArticlesCarousel';


export default function Home() {

  const articles: Article[] = [
    {
      id: 1,
      title: "مستقبل السفر في عالم ما بعد الجائحة",
      description: "استكشاف كيفية تكيُّف صناعة السفر مع التحديات الجديدة وتغيُّر سلوكيات المسافرين في المشهد العالمي الحالي.",
      department: "اتجاهات السفر",
      blogName: "رؤى وندرلست"
    },
    {
      id: 2,
      title: "10 جواهر خفية في جنوب شرق آسيا يجب أن تزورها",
      description: "اكتشف الوجهات غير المطروقة في جنوب شرق آسيا التي تقدّم تجارب فريدة بعيداً عن الزحام السياحي.",
      department: "دليل الوجهات",
      blogName: "يوميات المستكشف"
    },
    {
      id: 3,
      title: "السفر المستدام: كيفية تقليل بصمتك الكربونية",
      description: "نصائح واستراتيجيات عملية للمسافرين الواعين بيئياً لتقليل تأثيرهم على البيئة أثناء استكشاف العالم.",
      department: "السياحة البيئية",
      blogName: "المسافر الأخضر"
    },
    {
      id: 4,
      title: "الدليل الشامل لوجهات الرحّال الرقمي",
      description: "أفضل مدن العالم للرحّالين الرقميين توفر إنترنت موثوقاً ومساحات عمل مشتركة ومجتمعات نابضة بالحياة.",
      department: "العمل والسفر",
      blogName: "حياة الرحّال"
    },
    {
      id: 5,
      title: "مغامرات الطهي: جولات طعام الشارع حول العالم",
      description: "رحلة ذواق عبر أفضل أسواق طعام الشارع عالمياً وما يجب تذوقه في كل وجهة.",
      department: "الطعام والثقافة",
      blogName: "تذوّق العالم"
    },
    {
      id: 6,
      title: "حيل السفر العائلي: إجازات خالية من التوتر مع الأطفال",
      description: "نصائح الخبراء في التخطيط للعطلات العائلية والاستمتاع بها بما يناسب جميع الأعمار والاهتمامات.",
      department: "السفر العائلي",
      blogName: "رحلات سعيدة"
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <Hero />
      {/* With Us */}
      <WhyUs />
      {/* Articals */}
      <ArticlesCarousel articles={articles} />
      {/* Popular Airlines */}
      <PopularAirlines />
      {/* Trip Ideas Section */}
      <TripIdeasSection />

      {/* Mobile App */}
      <MobileApp />

    </div>
  );
}