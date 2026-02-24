import { useNavigate } from "react-router-dom";
import travelImg from "../assets/travel.png";

export default function ThankYou() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex justify-center items-center p-6 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${travelImg})` }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 bg-white/20 backdrop-blur-md border border-white/30 p-10 rounded-2xl shadow-2xl text-center max-w-lg">
                <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-md">
                    Thank You!
                </h2>
                <p className="text-lg text-gray-200 mb-8">
                    Your experience has been shared successfully. We appreciate your contribution to the community!
                </p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => navigate("/explore")}
                        className="w-full bg-slate-800 text-white py-3 rounded-lg font-bold text-lg hover:bg-slate-900 transition duration-300 shadow-lg"
                    >
                        Explore More
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full bg-transparent border border-white/50 text-white py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
