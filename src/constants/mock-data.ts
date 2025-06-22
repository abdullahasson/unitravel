// بيانات وهمية للعروض (في التطبيق الحقيقي سيتم جلبها من Travelpayouts API)
export const featuredDeals = [
    {
        id: 1,
        type: "flight",
        title: "الرياض إلى دبي - رحلة اقتصادية",
        image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=1000",
        badge: "عرض محدود",
        from: "الرياض",
        to: "دبي",
        duration: "3h 20m",
        date: "15 يوليو - 20 يوليو",
        originalPrice: 1200,
        price: 899,
        currency: "ريال",
        airline: "الطيران السعودي"
    },
    {
        id: 2,
        type: "hotel",
        title: "فندق برج العرب - دبي",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
        badge: "خصم 30%",
        location: "دبي، الإمارات",
        rating: "4.8",
        nights: "5 ليالي",
        originalPrice: 4500,
        price: 3150,
        currency: "ريال",
        features: ["واي فاي مجاني", "مسبح", "إفطار"]
    },
    {
        id: 3,
        type: "package",
        title: "باقة إسطنبول الكاملة",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000",
        badge: "العرض الأفضل",
        location: "إسطنبول، تركيا",
        duration: "7 أيام",
        originalPrice: 5600,
        price: 3999,
        currency: "ريال",
        includes: ["طيران", "فندق 5 نجوم", "جولات سياحية"]
    }
];

export const flightDeals = [
    {
        id: 4,
        type: "flight",
        title: "الرياض إلى لندن",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000",
        badge: "توفير 25%",
        from: "الرياض",
        to: "لندن",
        duration: "6h 45m",
        date: "20 أغسطس - 27 أغسطس",
        originalPrice: 2800,
        price: 2100,
        currency: "ريال",
        airline: "الخطوط البريطانية"
    },
    {
        id: 5,
        type: "flight",
        title: "جدة إلى باريس",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000",
        badge: "عرض خاص",
        from: "جدة",
        to: "باريس",
        duration: "5h 50m",
        date: "10 سبتمبر - 17 سبتمبر",
        originalPrice: 3200,
        price: 2500,
        currency: "ريال",
        airline: "الخطوط الفرنسية"
    },
    {
        id: 6,
        type: "flight",
        title: "الدمام إلى إسطنبول",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000",
        badge: "توفير 30%",
        from: "الدمام",
        to: "إسطنبول",
        duration: "4h 10m",
        date: "5 سبتمبر - 12 سبتمبر",
        originalPrice: 2200,
        price: 1540,
        currency: "ريال",
        airline: "الخطوط التركية"
    }
];

export const hotelDeals = [
    {
        id: 7,
        type: "hotel",
        title: "فندق شيراتون إسطنبول",
        image: "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?q=80&w=1000",
        badge: "خصم 40%",
        location: "إسطنبول، تركيا",
        rating: "4.7",
        nights: "4 ليالي",
        originalPrice: 3200,
        price: 1920,
        currency: "ريال",
        features: ["إطلالة رائعة", "سبا", "صالة ألعاب رياضية"]
    },
    {
        id: 8,
        type: "hotel",
        title: "فندق ريتز كارلتون - باريس",
        image: "https://images.unsplash.com/photo-1551632436-7a879920dd46?q=80&w=1000",
        badge: "عرض العائلة",
        location: "باريس، فرنسا",
        rating: "4.9",
        nights: "6 ليالي",
        originalPrice: 7800,
        price: 6240,
        currency: "ريال",
        features: ["5 نجوم", "مطاعم فاخرة", "موقع مميز"]
    },
    {
        id: 9,
        type: "hotel",
        title: "فندق أتلانتس النخلة - دبي",
        image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=1000",
        badge: "عرض خاص",
        location: "دبي، الإمارات",
        rating: "4.9",
        nights: "5 ليالي",
        originalPrice: 8500,
        price: 6800,
        currency: "ريال",
        features: ["شاطئ خاص", "أكواريوم", "منتجع متكامل"]
    }
];


// /api/aviasales/prices_for_dates?origin=LED&destination=HKT&currency=usd
// const Result = [
//     {
//         flight_number: "7966",
//         link: "/search/LED2109HKT1?t=HU17584854001758571500001195LEDPEKHKT_a6911dbba745ef398a3481c1f952b2fb_26669&search_date=17062025&expected_price_uuid=7a1640a0-e59b-451e-9696-38f0ca1ad102&expected_price_source=share&expected_price_currency=usd&expected_price=339",
//         origin_airport: "LED",
//         destination_airport: "HKT",
//         departure_at: "2025-09-21T20:10:00+03:00",
//         airline: "HU",
//         destination: "HKT",
//         origin: "LED",
//         price: 339,
//         return_transfers: 0,
//         duration: 1195,
//         duration_to: 830,
//         duration_back: 0,
//         transfers: 1
//     }
// ]
