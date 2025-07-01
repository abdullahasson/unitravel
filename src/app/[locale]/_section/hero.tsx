import Search from "@/components/Search"

const Hero = () => {
    // const t = useTranslations("Hero")

    return (
        <section className="hero mt-[77px] relative flex flex-col justify-center items-center min-h-[calc(100vh-77px)] text-white text-center overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <Search />
            </div>
        </section>
    )
}

export default Hero;