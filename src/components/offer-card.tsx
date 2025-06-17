
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
    airline: string;}

interface OfferCardProps {
    deal: DealDataType
}

const OfferCard = ({ deal } : OfferCardProps) => {
    return (
        <div>
            <div className="deal-badge absolute top-5 right-5 bg-accent-gradient text-white py-2 px-5 rounded-full text-sm font-semibold z-10 animate-pulse">
                {deal.badge}
            </div>
            <h3 className="deal-title text-xl font-bold mb-4 text-darker">
                {deal.title}
            </h3>
            <div className="deal-info flex items-center gap-3 text-gray-500 mb-3 text-base">
                <i className="fas fa-plane text-primary" />
                <span>
                    {deal.from} → {deal.to}
                </span>
            </div>
            <div className="deal-info flex items-center gap-3 text-gray-500 mb-3 text-base">
                <i className="fas fa-clock text-primary" />
                <span>
                    {deal.duration}
                </span>
            </div>
            <div className="deal-info flex items-center gap-3 text-gray-500 mb-3 text-base">
                <i className="fas fa-calendar text-primary" />
                <span>
                    {deal.date}
                </span>
            </div>
            <div className="deal-info flex items-center gap-3 text-gray-500 mb-4 text-base">
                <i className="fas fa-building text-primary" />
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
                <a href="" className="book-btn bg-gradient text-white py-3 px-6 rounded-lg font-semibold shadow shadow-blue-500/30">احجز الآن</a>
            </div>
        </div>
    )
}

export default OfferCard;