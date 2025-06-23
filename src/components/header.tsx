// Next 
import Link from "next/link"
// Next Intl
import { useTranslations , useLocale } from "next-intl";
// Components
import SwitchLanguages from "./switch-languages"
// Icons
import {
    Plane
} from "lucide-react"


const Header = () => {
    // Translate
    const t = useTranslations("Header");
    const lang = useLocale();

    return (
        <header id="header" className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/95 shadow-md transition-all duration-400">
            <div className="container mx-auto px-4 xl:px-0 max-w-7xl">
                <div className="navbar flex justify-between items-center py-4 transition-all duration-400">
                    <Link href="" className="logo flex items-center gap-2 text-2xl font-extrabold text-darker transition-all duration-400">
                        <Plane className="text-[var(--color-primary)] transition-all duration-400" />
                        <span>{t("Logo")}</span>
                    </Link>
                    <div className="nav-links hidden lg:flex gap-8">
                        <Link href={`/${lang}/`} className="nav-link relative py-2 text-darker font-medium text-lg transition-all duration-400">
                            {t("Home")}
                        </Link>
                        <Link href={`/${lang}/`} className="nav-link relative py-2 text-darker font-medium text-lg transition-all duration-400">
                            {t("Flight")}
                        </Link>
                        <Link href={`/${lang}/`} className="nav-link relative py-2 text-darker font-medium text-lg transition-all duration-400">
                            {t("Hotel")}
                        </Link>
                        <Link href={`/${lang}/`} className="nav-link relative py-2 text-darker font-medium text-lg transition-all duration-400">
                            {t("FeaturedDeals")}
                        </Link>
                        <Link href={`/${lang}/mobile-app`} className="nav-link relative py-2 text-darker font-medium text-lg transition-all duration-400">
                            {t("App")}
                        </Link>
                    </div>


                    <div className="flex items-center gap-6">
                        {/* تبديل اللغة - نسخة سطح المكتب */}
                        <SwitchLanguages />

                        {/* أزرار المستخدم */}
                        <div className="user-actions flex gap-4">
                            <Link href="" className="btn btn-outline border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent py-3 px-6 rounded-full font-semibold text-base transition-all duration-400">
                                {t("Login")}
                            </Link>
                            <Link href="" className="btn btn-[var(--color-primary)] bg-linear-0 from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-3 px-6 rounded-full font-semibold text-base shadow-md shadow-blue-500/20 transition-all duration-400">
                                {t("Signup")}
                            </Link>
                        </div>
                        {/* قائمة الهامبرجر للجوال */}
                        <button className="md:hidden text-2xl text-gray-700">
                            <i className="fas fa-bars" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;