import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import travelImg from "../assets/travel.png";
import Navbar from "../components/Navbar";

export default function ShareExperience({ showNavbar = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        review: "",
        image: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("location", formData.location);
        data.append("review", formData.review);
        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}/spots`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                navigate("/thank-you");
            }
        } catch (error) {
            console.error("Error sharing experience:", error);
            alert("Failed to share experience. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center p-6 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${travelImg})` }}
        >
            {showNavbar && <Navbar />}
            {/* Dark Overlay for better contrast */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Glassmorphism Form */}
            <form
                onSubmit={handleSubmit}
                className="relative z-10 bg-white/20 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-2xl w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-md">
                    Share Your Experience
                </h2>

                {/* Image Upload */}
                <input
                    type="file"
                    onChange={handleImage}
                    className="mb-4 w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-900"
                />

                {/* Title */}
                <input
                    type="text"
                    name="title"
                    placeholder="Place Name"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-white/50 p-3 rounded-lg mb-4 bg-white/80 focus:outline-none focus:ring-2 focus:ring-slate-500 text-slate-900"
                    required
                />

                {/* Location */}
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-white/50 p-3 rounded-lg mb-4 bg-white/80 focus:outline-none focus:ring-2 focus:ring-slate-500 text-slate-900"
                    required
                />

                {/* Review */}
                <textarea
                    name="review"
                    placeholder="Write your experience..."
                    value={formData.review}
                    onChange={handleChange}
                    className="w-full border border-white/50 p-3 rounded-lg mb-4 h-32 bg-white/80 focus:outline-none focus:ring-2 focus:ring-slate-500 text-slate-900"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-800 text-white py-3 rounded-lg font-bold text-lg hover:bg-slate-900 transition duration-300 shadow-lg disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Share Experience"}
                </button>
            </form>
        </div>
    );
}
