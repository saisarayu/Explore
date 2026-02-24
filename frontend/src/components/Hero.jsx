import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero-mountain.png";
import logoImg from "../assets/logo.png";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/40 pointer-events-none"></div>

      {/* Header with Logo and Sign Up */}
      <header className="absolute top-0 left-0 right-0 z-20 px-8 py-6 flex items-center justify-between">
        <img
          src={logoImg}
          alt="Explore Spot Logo"
          className="h-12 w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />
      </header>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-8 flex items-center justify-start text-left">
        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white/90 leading-tight tracking-tighter uppercase opacity-90">
            Explore Spot
          </h1>

          <p className="mt-2 text-xl sm:text-2xl md:text-3xl text-white/90 font-semibold tracking-wide">
            Travel More. Explore Deeper. Share Better.
          </p>

          <div className="mt-10 flex items-center justify-start space-x-6">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3.5 bg-[#d97706] hover:bg-[#b45309] text-white rounded-2xl shadow-xl font-bold text-xl transition-transform hover:scale-105"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/explore")}
              className="px-8 py-3.5 border border-white/40 text-white rounded-2xl bg-white/5 hover:bg-white/10 font-medium text-xl backdrop-blur-sm transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
