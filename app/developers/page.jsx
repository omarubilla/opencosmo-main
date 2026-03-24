import TopNav from "../_components/TopNav";
import HeroSection from "@/components/Hero/HeroSection";
import FeaturesSection from "@/components/Features/FeaturesSection";
import InstallSection from "@/components/Install/InstallSection";
import DashboardDemoSection from "@/components/DashboardDemo/DashboardDemoSection";
import SecuritySection from "@/components/Security/SecuritySection";
import FooterSection from "@/components/Footer/FooterSection";

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <TopNav />
      <main className="pt-16">
        <HeroSection />
        <InstallSection />
        <FeaturesSection />
        <DashboardDemoSection />
        <SecuritySection />
        <FooterSection />
      </main>
    </div>
  );
}
