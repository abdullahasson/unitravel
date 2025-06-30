"use client";

// React
import { useState } from "react";
// Next Intl
import { useTranslations } from "next-intl"
// Components
import HomeFlightsSearch from "./flights/HomeFlightsSearch"

const Search = () => {

    const t = useTranslations("Hero")

    const [isFlights, setIsFlights] = useState(true)

    const handleFlights = () => {
        setIsFlights(true)
    }

    const handleHotels = () => {
        setIsFlights(false)
    }

    return (
        <div>
            <div className="flex justify-center gap-5 mb-8 opacity-0 translate-y-5 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <button
                    onClick={() => handleFlights()}
                    className={`
                            btn cursor-pointer btn-outline border-2 border-white text-white bg-transparent py-3 px-8 rounded-full font-semibold
                            hover:btn-[var(--color-primary)] hover:bg-linear-0 hover:from-[var(--color-primary)] hover:to-[var(--color-secondary)] hover:shadow-md hover:shadow-blue-500/20
                            ${isFlights ? "btn-[var(--color-primary)] bg-linear-0 from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-3 px-8 rounded-full font-semibold shadow-md shadow-blue-500/20" : ""}
                        `}
                >
                    {t("JoinPartner")}
                </button>
                <button
                    onClick={() => handleHotels()}
                    className={`
                            btn cursor-pointer btn-outline border-2 border-white text-white bg-transparent py-3 px-8 rounded-full font-semibold
                            hover:btn-[var(--color-primary)] hover:bg-linear-0 hover:from-[var(--color-primary)] hover:to-[var(--color-secondary)] hover:shadow-md hover:shadow-blue-500/20
                            ${!isFlights ? "btn-[var(--color-primary)] bg-linear-0 from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-3 px-8 rounded-full font-semibold shadow-md shadow-blue-500/20" : ""}
                        `}>
                    {t("BrowseOffers")}
                </button>
            </div>


            {
                isFlights ?
                    <HomeFlightsSearch />
                    :
                    <HomeFlightsSearch />
            }
        </div>
    )
}

export default Search;