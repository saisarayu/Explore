import exploreBg from "../assets/Explore.png";
import Navbar from "../components/Navbar";
import PlanTrip from "./PlanTrip";
import ShareExperience from "./ShareExperience";
import BusinessPromotion from "./BusinessPromotion";
import SpotList from "../components/SpotList";
import BusinessList from "../components/BusinessList";

export default function Explore() {
  return (
    <div className="relative bg-black">
      <Navbar />

      {/* Hero / Hero section for Explore */}
      <section id="explore" className="h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${exploreBg})` }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white pt-20">
          {/* Quick Preview in Hero */}
          <div className="mt-12 w-full max-w-5xl overflow-hidden px-4 animate-fade-in-up">
            <SpotList isHeroPreview={true} limit={3} />
          </div>
        </div>
      </section>

      {/* Discover Section / Plan Trip */}
      <section id="discover">
        <PlanTrip showNavbar={false} />
      </section>

      {/* Business Promotions List */}
      <section id="featured-businesses">
        <BusinessList />
      </section>

      {/* Share Section Form */}
      <section id="share">
        <ShareExperience showNavbar={false} />
      </section>

      {/* Business Section Form */}
      <section id="business">
        <BusinessPromotion showNavbar={false} />
      </section>
    </div>
  );
}