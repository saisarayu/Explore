import { useState, useEffect } from "react";
import axios from "axios";

export default function BusinessList() {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;


    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get(`${baseUrl}/business`);
                setBusinesses(response.data);
            } catch (error) {
                console.error("Error fetching businesses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-b from-slate-900 to-black">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Featured Local Businesses</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Support the heart of our community. Explore top-rated local spots, services, and shops.
                    </p>
                </div>

                {businesses.length === 0 ? (
                    <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-gray-400">No business promotions yet. Grow your business with us!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {businesses.map((biz) => (
                            <div
                                key={biz._id}
                                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2 shadow-xl"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    {biz.imageUrl ? (
                                        <img
                                            src={`${baseUrl.replace("/api", "")}${biz.imageUrl}`}
                                            alt={biz.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                            <span className="text-5xl">🏢</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                                            {biz.category}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <div className="flex items-center text-amber-400 text-sm font-bold">
                                            <span className="mr-1">📍</span>
                                            {biz.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                                        {biz.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                                        {biz.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-5 border-t border-white/10">
                                        <div className="text-xs text-gray-500">
                                            <p className="uppercase tracking-widest mb-1 text-[10px]">Contact</p>
                                            <p className="text-gray-300 font-medium">{biz.contact}</p>
                                        </div>
                                        <button className="bg-white/10 hover:bg-amber-500 hover:text-black text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
