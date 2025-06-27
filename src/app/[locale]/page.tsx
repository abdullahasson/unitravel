// Section
import Hero from "./_section/hero"
// Components
import Search from "@/components/Search";

export default function Home() {
  return (
    <div>
      <Hero />
      <Search  />
      {/*<Deals /> */}
      {/* <FlightDealsCarousel /> */}
    </div>
  );
}