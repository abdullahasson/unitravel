interface OffersSectionProps {
    heading: string;
    subheading: string;
    children: React.ReactNode;
}

const OffersSection = ({heading , subheading , children } : OffersSectionProps) => {
    return (
        <section className="section py-24">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="section-header text-center mb-16">
                    <h2 className="section-title text-3xl md:text-4xl font-extrabold mb-5 relative inline-block opacity-0 translate-y-20">
                        {heading}
                    </h2>
                    <p className="section-subtitle text-gray-500 max-w-2xl mx-auto opacity-0 translate-y-5">
                        {subheading}
                    </p>
                </div>
                <div className="deals-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="featured-deals">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default OffersSection;