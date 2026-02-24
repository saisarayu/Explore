import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "../assets/logo.png";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (path, id) => {
        if (location.pathname !== path) {
            navigate(`${path}#${id}`);
            // After navigation, we might need a small delay or rely on scroll-margin-top 
            // but for react-router standard hash navigation might not scroll smooth.
            // However, a simple navigate to path#id usually works if the ID exists.
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const navLinks = [
        { name: "Home", path: "/", id: "hero" },
        { name: "Explore", path: "/explore", id: "explore" },
        { name: "Discover", path: "/explore", id: "discover" },
        { name: "Share", path: "/explore", id: "share" },
        { name: "Businesses", path: "/explore", id: "featured-businesses" },
        { name: "Promote", path: "/explore", id: "business" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                <img src={logoImg} alt="Logo" className="h-10 w-auto" />
                <span className="text-white font-black text-xl tracking-tighter uppercase">Explore Spot</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => scrollToSection(link.path, link.id)}
                        className={`text-sm font-bold uppercase tracking-widest transition-colors text-white/80 hover:text-white hover:text-[#d97706]`}
                    >
                        {link.name}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate("/login")}
                    className="px-5 py-2 text-white font-bold border border-white/20 rounded-lg hover:bg-white/10 transition-all text-sm uppercase tracking-widest"
                >
                    Login
                </button>
            </div>
        </nav>
    );
}
