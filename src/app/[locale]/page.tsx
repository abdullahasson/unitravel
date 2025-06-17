// Next Inlt
// Section
import Hero from "./_section/hero"
import MobileApp from "./_section/mobile-app";
// Components
import Header from "@/components/header";
import Searchweghit from "@/components/search-weghit";
import Footer from "@/components/footer";


export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Searchweghit />
      <MobileApp />
      <Footer />
    </div>
  );
}
