// Next
import { useTranslations } from 'next-intl';
// Icons
import {
    Percent, 
    ShieldCheck,
    Headset
} from "lucide-react"


export default function WhyUs() {
    const t = useTranslations("WhyUs");

    return (
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            {/* Static fallback while loading */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold  text-gray-800 mb-4">
                    {t('title')}
                </h2>
                <p className="text-xl text-gray-600 mt-6">
                    {t('subtitle')}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 ">
                    <div
                        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100">
                                <Percent
                                    className="h-12 w-12 text-indigo-600" 
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {t('card1.title')}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {t('card1.text')}
                            </p>
                        </div>
                    </div>

                    <div
                        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100">
                                <ShieldCheck
                                    className="h-12 w-12 text-indigo-600" 
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {t('card2.title')}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {t('card2.text')}
                            </p>
                        </div>
                    </div>

                    <div
                        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100">
                                <Headset
                                    className="h-12 w-12 text-indigo-600" 
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {t('card3.title')}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {t('card3.text')}
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    </section>
    )


}