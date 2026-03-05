import TopNav from "../_components/TopNav";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Solutions } from "./components/Solutions";
import { Stats } from "./components/Stats";
import { Mission } from "./components/Mission";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#001121] transition-colors">
      <TopNav />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Solutions />
        <Mission />
        {/* <Testimonials /> */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
