// Next Inlt
// Section
import Hero from "./_section/hero"
// Components
import FlightSearch from "@/components/FlightsSearch"

export default function Home() {
  // <FlightSearch />
  return (
    <div>
      <Hero />
      <FlightSearch />
    </div>
  );
}