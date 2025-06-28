// Next Intl
import { useTranslations } from "next-intl"

export default function Insights() {

    const t = useTranslations("Insights")

    return (
        <section className="py-20">
            <div className="container mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold  text-gray-800 mb-4">{t("title")}</h2>
                    <p className="text-xl text-gray-600 mt-6">{t("subtitle")}</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8 mb-15 mx-auto">
                    <div className="text-center p-[30px] bg-white rounded-xl shadow-md">
                        <div className="text-5xl font-bold text-indigo-600 mb-2.5">1.2M+</div>
                        <p>{t("card4.title")}</p>
                    </div>
                    <div className="text-center p-[30px] bg-white rounded-xl shadow-md">
                        <div className="text-5xl font-bold text-indigo-600 mb-2.5">$42M+</div>
                        <p>{t("card3.title")}</p>
                    </div>
                    <div className="text-center p-[30px] bg-white rounded-xl shadow-md">
                        <div className="text-5xl font-bold text-indigo-600 mb-2.5">24K+</div>
                        <p>{t("card2.title")}</p>
                    </div>
                    <div className="text-center p-[30px] bg-white rounded-xl shadow-md">
                        <div className="text-5xl font-bold text-indigo-600 mb-2.5">98%</div>
                        <p>{t("card1.title")}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}