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
                    <h2 className="section-title text-3xl md:text-4xl font-extrabold mb-7 relative inline-block">
                        {heading}
                    </h2>
                    <p className="section-subtitle text-gray-500 max-w-2xl text-2xl mx-auto">
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