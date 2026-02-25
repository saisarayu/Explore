import { useState, useEffect } from "react";
import axios from "axios";

export default function SpotList({ isHeroPreview = false, limit = 0 }) {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const rootUrl = baseUrl.replace("/api", "");


    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const response = await axios.get(`${baseUrl}/spots`);
                let data = response.data;
                if (limit > 0) data = data.slice(0, limit);
                setSpots(data);
            } catch (error) {
                console.error("Error fetching spots:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpots();
    }, [limit]);

    if (loading) {
        return (
            <div className={`flex justify-center items-center ${isHeroPreview ? 'py-4' : 'py-20'} ${isHeroPreview ? '' : 'bg-slate-900'}`}>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
            </div>
        );
    }

    if (isHeroPreview) {
        if (spots.length === 0) return null;
        return (
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar max-w-full px-4">
                {spots.map((spot) => (
                    <div
                        key={spot._id}
                        className="flex-shrink-0 w-64 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden hover:border-sky-400/50 transition-all shadow-2xl"
                    >
                        <div className="h-32 relative">
                            {spot.imageUrl ? (
                                <img
                                    src={`${rootUrl}${spot.imageUrl}`}
                                    alt={spot.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-2xl">📸</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-2 left-2">
                                <span className="bg-sky-500 text-[8px] font-bold px-2 py-0.5 rounded text-white uppercase">{spot.location}</span>
                            </div>
                        </div>
                        <div className="p-3">
                            <h4 className="text-white font-bold text-sm truncate">{spot.title}</h4>
                            <p className="text-gray-300 text-[10px] line-clamp-1 italic mt-1">"{spot.review}"</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <section className="py-20 bg-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Recent Experiences</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover the latest hidden gems and travel stories shared by our community of explorers.
                    </p>
                </div>

                {spots.length === 0 ? (
                    <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-gray-400">No experiences shared yet. Be the first to share yours!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {spots.map((spot) => (
                            <div
                                key={spot._id}
                                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-2 shadow-xl"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    {spot.imageUrl ? (
                                        <img
                                            src={`${rootUrl}${spot.imageUrl}`}
                                            alt={spot.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                            <span className="text-4xl">📸</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            {spot.location}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                                        {spot.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed mb-4 italic">
                                        "{spot.review}"
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-gray-500">
                                        <span>Shared by Community</span>
                                        <span>{new Date(spot.createdAt).toLocaleDateString()}</span>
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
