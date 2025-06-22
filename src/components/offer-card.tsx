// Next
import Image from "next/image"
// Icons
import {
    Plane,
    Calendar,
    Clock,
    Building
} from "lucide-react"


interface DealDataType {
    id: number;
    type: string;
    title: string;
    image: string;
    badge: string;
    from: string;
    to: string;
    duration: string;
    date: string;
    originalPrice: number,
    price: number,
    currency: string;
    airline: string;
}

interface OfferCardProps {
    deal: DealDataType
}


const OfferCard = ({ deal }: OfferCardProps) => {
    return (
        <div className="deal-card bg-white rounded-2xl overflow-hidden shadow-md relative">
            <div className="deal-image h-56 overflow-hidden relative">
                <Image src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
            </div>
            <div className="deal-content p-6">
                <FlightOfferCardContent deal={deal} />
            </div>
        </div>
    )
}


const FlightOfferCardContent = ({ deal }: OfferCardProps) => (
    <>
        <div className="deal-badge absolute top-3 right-3 bg-linear-0 from-[var(--color-accent)] to-[var(--color-accent-light)] text-white py-2 px-5 rounded-full text-sm font-semibold animate-pulse">
            {deal.badge}
        </div>
        <h3 className="deal-title text-xl font-bold mb-4 text-darker">
            {deal.title}
        </h3>
        <div className="deal-info flex items-center gap-3 text-gray-500 mb-3 text-base">
            <Plane className="text-[var(--color-primary)]" />
            <span>
                {deal.from} → {deal.to}
            </span>
        </div>
        <div className="deal-info flex items-center gap-3 text-gray-500 mb-3 text-base">
            <Clock className="text-[var(--color-primary)]" />

            <span>
                {deal.duration}
            </span>
        </div>
        <div className="deal-info flex items-center gap-3 text-gray-500 mb-3 text-base">
            <Calendar className="text-[var(--color-primary)]" />

            <span>
                {deal.date}
            </span>
        </div>
        <div className="deal-info flex items-center gap-3 text-gray-500 mb-4 text-base">
            <Building className="text-[var(--color-primary)]" />

            <span>
                {deal.airline}
            </span>
        </div>
        <div className="deal-price flex justify-between items-center mt-5 pt-5 border-t border-slate-200">
            <div className="price text-2xl font-extrabold text-primary flex flex-col">
                {deal.price} {deal.currency}

                <small className="text-base font-medium text-gray-500 line-through">
                    {deal.originalPrice}
                </small>
            </div>
            <a href="" className="book-btn bg-linear-0 from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-3 px-6 rounded-lg font-semibold shadow shadow-blue-500/30">احجز الآن</a>
        </div>
    </>
)

// const HotelOfferCardContent = ({ deal }: OfferCardProps) => (
//     <>
//         <div className="deal-badge absolute top-5 right-5 bg-accent-gradient text-white py-2 px-5 rounded-full text-sm font-semibold z-10 animate-pulse">{deal.badge}</div>
//         <h3 className="deal-title text-xl font-bold mb-4 text-darker">{deal.title}</h3>
//         <div className="deal-info flex items-center gap-3 text-gray-500 mb-3 text-base">
//             <i className="fas fa-map-marker-alt text-primary"></i>
//             <span>{deal.location}</span>
//         </div>
//         <div className="deal-info flex items-center gap-3 text-gray-500 mb-3 text-base">
//             <i className="fas fa-star text-primary"></i>
//             <span>التقييم: {deal.rating}</span>
//         </div>
//         <div className="deal-info flex items-center gap-3 text-gray-500 mb-4 text-base">
//             <i className="fas fa-moon text-primary"></i>
//             <span>{deal.nights}</span>
//         </div>
//         <div className="deal-price flex justify-between items-center mt-5 pt-5 border-t border-slate-200">
//             <div className="price text-2xl font-extrabold text-primary flex flex-col">
//                 {deal.price} {deal.currency}
//                 <small className="text-base font-medium text-gray-500 line-through">{deal.originalPrice}</small>
//             </div>
//             <a href="#" className="book-btn bg-gradient text-white py-3 px-6 rounded-lg font-semibold shadow shadow-blue-500/30">احجز الآن</a>
//         </div>
//     </>
// )

export default OfferCard;