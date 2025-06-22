// Next
import Link from "next/link";
// Next Intl
import { useTranslations } from "next-intl";

const Hero = () => {

    const t = useTranslations("Hero")

    return (
        <section className="hero relative flex flex-col justify-center items-center py-48 text-white text-center overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="hero-content relative z-10 max-w-4xl mx-auto">
                    <h1 className="hero-title text-4xl md:text-5xl font-extrabold mb-5 text-shadow opacity-0 translate-y-5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        {t("Heading")}
                    </h1>
                    <p className="hero-subtitle text-xl opacity-0 translate-y-5 animate-fadeInUp max-w-2xl mx-auto" style={{ animationDelay: '0.4s' }}>
                        {t("SubHeading")}
                    </p>
                    <div className="hero-btns flex justify-center gap-5 mt-8 opacity-0 translate-y-5 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                    <Link href="" className="btn-[var(--color-primary)] bg-linear-0 from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-3 px-8 rounded-full font-semibold shadow-md shadow-blue-500/20">
                            {t("JoinPartner")}
                        </Link>
                        <Link href="" className="btn btn-outline border-2 border-white text-white bg-transparent py-3 px-8 rounded-full font-semibold">
                            {t("BrowseOffers")}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;