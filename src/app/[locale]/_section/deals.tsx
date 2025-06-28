// Next Intl
import { useTranslations } from "next-intl";

export default function Deals() {

    const t = useTranslations("Deals");

    return (
        <section className="py-0 ">
            <div className="container mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold  text-gray-800 mb-4">{t("title")}</h2>
                    <p className="text-xl text-gray-600 mt-6">{t("subtitle")}</p>
                </div>
                <div className="flex justify-center mb-10">
                    <button className="deals-tab active">{t("tabs.flights")}</button>
                    <button className="deals-tab">{t("tabs.hotels")}</button>
                </div>
                <div className="deals-grid">
                    <div className="deal-card rounded-lt-2xl rounded-br-2xl overflow-hidden">
                        <div className="deal-image" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1546436836-07a91091f160?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")' }} />
                        <div className="deal-content">
                            <span className="badge badge-primary">Flight</span>
                            <h3>New York to Paris</h3>
                            <p className="deal-price">$459 <span className="text-muted">round trip</span></p>
                            <p>Direct flight with premium amenities. Limited seats available.</p>
                            <div className="deal-meta">
                                <span><i className="far fa-calendar" /> May - Oct 2024</span>
                                <span><i className="far fa-clock" /> 7h 30m</span>
                            </div>
                        </div>
                    </div>
                    <div className="deal-card rounded-lt-2xl rounded-br-2xl overflow-hidden">
                        <div className="deal-image" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")' }} />
                        <div className="deal-content">
                            <span className="badge badge-primary">Hotel</span>
                            <h3>Luxury Resort in Bali</h3>
                            <p className="deal-price">$129 <span className="text-muted">per night</span></p>
                            <p>5-star resort with private beach and spa. Includes breakfast.</p>
                            <div className="deal-meta">
                                <span><i className="fas fa-star" /> 4.8 (120 reviews)</span>
                                <span><i className="fas fa-swimming-pool" /> Pool</span>
                            </div>
                        </div>
                    </div>
                    <div className="deal-card rounded-lt-2xl rounded-br-2xl overflow-hidden">
                        <div className="deal-image" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")' }} />
                        <div className="deal-content">
                            <span className="badge badge-primary">Package</span>
                            <h3>Rome City Break</h3>
                            <p className="deal-price">$799 <span className="text-muted">per person</span></p>
                            <p>Flight + 4 nights in a central hotel with guided tours included.</p>
                            <div className="deal-meta">
                                <span><i className="far fa-calendar" /> Sep - Dec 2024</span>
                                <span><i className="fas fa-utensils" /> Breakfast</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}