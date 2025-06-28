// Section
import Hero from "./_section/hero"
import MobileApp from "./_section/mobile-app"
import WhyUs from "./_section/whyUs"
// import Deals from "./_section/deals";
import Insights from "./_section/Insights";
// Components
import Search from "@/components/Search";

export default function Home() {
  return (
    <div>
      <Hero />
      <Search  />
      <WhyUs />
      {/* <Deals /> */}
      <Insights />
      {/* <FlightDealsCarousel /> */}
      <MobileApp />
    </div>
  );
}