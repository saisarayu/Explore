import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import business from "../assets/business.png";
import Navbar from "../components/Navbar";

export default function BusinessPromotion({ showNavbar = true }) {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        location: "",
        description: "",
        contact: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/business`, formData);
            if (response.status === 201) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Business Promotion Error:", error);
            alert("Failed to submit business promotion. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${business})` }}
        >
            {showNavbar && <Navbar />}
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

            <div className="relative z-10 w-full max-w-2xl bg-[#75777A]/90 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-[0_0_40px_-10px_rgba(14,165,233,0.3)] border border-white/10">
                {!submitted ? (
                    <>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-extrabold text-black tracking-tight">
                                Promote Your Business
                            </h2>
                            <p className="mt-2 text-lg text-black">
                                Expand your reach. Connect with travelers on Explore Spot.
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="business-name" className="block text-sm font-semibold text-black mb-1">
                                        Business Name
                                    </label>
                                    <input
                                        id="business-name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/40 border border-gray-500 text-white rounded-lg focus:bg-gray-800/60 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all duration-200 ease-in-out placeholder-gray-300 hover:border-gray-400"
                                        placeholder="e.g. The Grand Hotel"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-semibold text-black mb-1">
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-800/40 border border-gray-500 text-white rounded-lg focus:bg-gray-800/60 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all hover:border-gray-400"
                                        >
                                            <option value="" className="bg-slate-900">Select Category</option>
                                            <option value="hotel" className="bg-slate-900">Hotel</option>
                                            <option value="restaurant" className="bg-slate-900">Restaurant</option>
                                            <option value="guide" className="bg-slate-900">Tour Guide</option>
                                            <option value="experience" className="bg-slate-900">Experience</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="location" className="block text-sm font-semibold text-black mb-1">
                                            Location
                                        </label>
                                        <input
                                            id="location"
                                            name="location"
                                            type="text"
                                            value={formData.location}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-800/40 border border-gray-500 text-white rounded-lg focus:bg-gray-800/60 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all hover:border-gray-400"
                                            placeholder="e.g. Bali, Indonesia"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-semibold text-black mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="3"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/40 border border-gray-500 text-white rounded-lg focus:bg-gray-800/60 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all resize-none placeholder-gray-300 hover:border-gray-400"
                                        placeholder="Briefly describe your services..."
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="contact" className="block text-sm font-semibold text-black mb-1">
                                        Contact Info
                                    </label>
                                    <input
                                        id="contact"
                                        name="contact"
                                        type="text"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/40 border border-gray-500 text-white rounded-lg focus:bg-gray-800/60 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all placeholder-gray-300 hover:border-gray-400"
                                        placeholder="Phone number or email address"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 px-4 bg-black hover:bg-gray-900 text-white font-bold rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
                            >
                                {loading ? "Submitting..." : "Submit Promotion"}
                            </button>

                            <p className="text-xs text-center text-black mt-4">
                                By submitting, you agree to our Terms of Service for business partners.
                            </p>
                        </form>
                    </>
                ) : (
                    <div className="py-12 text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-6">
                            <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-black mb-2">Success!</h2>
                        <p className="text-black mb-8 max-w-sm mx-auto">
                            Your business promotion has been submitted. Our team will review it shortly.
                        </p>

                        <div className="flex flex-col gap-3 max-w-xs mx-auto">
                            <button
                                onClick={() => setSubmitted(false)}
                                className="w-full py-3 px-4 bg-slate-700/50 text-sky-400 font-semibold rounded-lg hover:bg-slate-700 transition-colors border border-slate-600"
                            >
                                Post Another
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="w-full py-3 px-4 border border-slate-600 text-gray-300 font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
