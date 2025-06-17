// Next
import Link from "next/link";
// Next Intl
import { useTranslations } from "next-intl"

const Footer = () => {

    const t = useTranslations("Footer")

    return (
        <footer className="relative pt-22 pb-10 bg-[var(--color-darker)] text-white overflow-hidden">
            <div className="footer-wave" />
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                    <div className="footer-col">
                        <h3 className="text-xl mb-6 pb-3 relative">{t("AboutUs.Title")}</h3>
                        <p className="mb-5">{t("AboutUs.Text")}</p>

                        <div className="social-links flex gap-4">
                            <Link href="#" className="social-link w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white text-lg transition-all duration-400">
                                <i className="fab fa-facebook-f" />
                            </Link>
                            <Link href="#" className="social-link w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white text-lg transition-all duration-400">
                                <i className="fab fa-twitter" />
                            </Link>
                            <Link href="#" className="social-link w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white text-lg transition-all duration-400">
                                <i className="fab fa-instagram" />
                            </Link>
                            <Link href="#" className="social-link w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white text-lg transition-all duration-400">
                                <i className="fab fa-youtube" />
                            </Link>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h3 className="text-xl mb-6 pb-3 relative">{t("QuickLinks.Title")}</h3>
                        <ul className="footer-links">
                            <li className="mb-4">
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-chevron-left text-accent" />
                                    {t("QuickLinks.Home")}
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-chevron-left text-accent" />
                                    {t("QuickLinks.Flight")}
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-chevron-left text-accent" />
                                    {t("QuickLinks.Hotel")}
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-chevron-left text-accent" />
                                    {t("QuickLinks.FeaturedDeals")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-chevron-left text-accent" />
                                    {t("QuickLinks.Contact")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3 className="text-xl mb-6 pb-3 relative">{t("PopularDestinations.Title")}</h3>
                        <ul className="footer-links">
                            <li className="mb-4">
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-map-marker-alt text-accent" />
                                    {t("PopularDestinations.c1")}
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-map-marker-alt text-accent" />
                                    {t("PopularDestinations.c2")}
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-map-marker-alt text-accent" />
                                    {t("PopularDestinations.c3")}
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-map-marker-alt text-accent" />
                                    {t("PopularDestinations.c4")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-map-marker-alt text-accent" />
                                    {t("PopularDestinations.c5")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3 className="text-xl mb-6 pb-3 relative">{t("ContactUs.Title")}</h3>
                        <ul className="footer-links">
                            <li className="mb-4">
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-envelope text-accent" />
                                    info@rahhalati.com
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-phone text-accent" />
                                    +966 123 456 789
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <i className="fas fa-map-marker-alt text-accent" />
                                    {t("ContactUs.Location")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="copyright text-center pt-8 border-t border-white/10 text-slate-400">
                    <p>{t("BootomFooter")}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;