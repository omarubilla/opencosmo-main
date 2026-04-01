import TopNav from "../_components/TopNav";
import SMBsLanding from "./_components/SMBsLanding";
import LandingFooter from "../_components/LandingFooter";

export default function SMBsPage() {
  return (
    <div className="min-h-screen bg-[#f4efe6]">
      <TopNav />
      <SMBsLanding />
      <LandingFooter />
    </div>
  );
}
