import { useState } from "react";
import axios from "axios";
import Aiimg from "../assets/ai.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PlanTrip({ showNavbar = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [formData, setFormData] = useState({
        destination: "",
        days: "",
        budget: "Moderate",
        type: "Solo",
        interests: [],
        month: "",
        pace: "Moderate",
    });


    const interestsOptions = [
        "Nature", "Food", "Adventure", "Culture", "Nightlife", "History", "Relaxation"
    ];

    const handleInterestChange = (interest) => {
        setFormData(prev => {
            const interests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests };
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerateValues = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        console.log("Form Data Submitted:", formData);

        try {
            const response = await axios.post("http://localhost:5000/api/ai-planner/plan", {
                destination: formData.destination,
                days: formData.days,
                budget: formData.budget,
                type: formData.type,
                interests: formData.interests.join(", "),
                month: formData.month,
                pace: formData.pace
            });

            if (response.data.result) {
                setResult(response.data.result);
            }
        } catch (error) {
            console.error("AI Generation Error:", error);
            alert("Failed to generate itinerary. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center p-6 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${Aiimg})` }}
        >
            {showNavbar && <Navbar />}
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-white mb-6">Plan Your Trip</h2>

                    <form onSubmit={handleGenerateValues} className="space-y-4">
                        <div>
                            <label className="block text-gray-300 text-sm mb-1">Destination (Optional)</label>
                            <input
                                type="text"
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                placeholder="e.g. Paris, Tokyo, Bali (Leave blank for suggestions)"
                                className="w-full bg-slate-800/50 border border-white/20 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 text-sm mb-1">Days</label>
                                <input
                                    type="number"
                                    name="days"
                                    value={formData.days}
                                    onChange={handleChange}
                                    placeholder="e.g. 5"
                                    className="w-full bg-slate-800/50 border border-white/20 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm mb-1">Budget</label>
                                <select
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800/50 border border-white/20 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                                >
                                    <option>Budget</option>
                                    <option>Moderate</option>
                                    <option>Luxury</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 text-sm mb-1">Month</label>
                                <select
                                    name="month"
                                    value={formData.month}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800/50 border border-white/20 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                                >
                                    <option value="">Any</option>
                                    <option>January</option>
                                    <option>February</option>
                                    <option>March</option>
                                    <option>April</option>
                                    <option>May</option>
                                    <option>June</option>
                                    <option>July</option>
                                    <option>August</option>
                                    <option>September</option>
                                    <option>October</option>
                                    <option>November</option>
                                    <option>December</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm mb-1">Travel Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800/50 border border-white/20 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                                >
                                    <option>Solo</option>
                                    <option>Couple</option>
                                    <option>Family</option>
                                    <option>Friends</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Interests</label>
                            <div className="flex flex-wrap gap-2">
                                {interestsOptions.map(interest => (
                                    <button
                                        type="button"
                                        key={interest}
                                        onClick={() => handleInterestChange(interest)}
                                        className={`px-3 py-1 rounded-full text-sm border transition ${formData.interests.includes(interest)
                                            ? "bg-sky-500 border-sky-500 text-white"
                                            : "bg-transparent border-white/30 text-gray-300 hover:border-white"
                                            }`}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg transition shadow-lg mt-4 disabled:opacity-50"
                        >
                            {loading ? "Generating Plan..." : "Generate Itinerary"}
                        </button>
                    </form>
                </div>


                {/* Right Section: Itinerary Results */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl overflow-y-auto self-start h-[450px]">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Your Itinerary</h3>
                        {result ? (
                            <div className="text-gray-200 text-left whitespace-pre-wrap text-sm leading-relaxed">
                                {result}
                            </div>
                        ) : (
                            <p className="text-gray-300 text-center">
                                Your personalized travel plan will appear here after AI generation.
                            </p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
