import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = ({ onSearch }) => {
    const navigate = useNavigate();

    return (
        <nav className="bg-[#0f172a] px-4 md:px-6 py-4 border-b border-white/5 sticky top-0 z-50 flex flex-wrap items-center justify-between gap-y-4">
            
            {/* Logo Section (Order 1) */}
            <div className="w-auto order-1">
                <a 
                    onClick={() => navigate('/')} 
                    className="text-2xl md:text-3xl font-black tracking-tighter text-white cursor-pointer select-none"
                >
                    Snippet<span className="text-blue-500">Hub</span>
                </a>
            </div>

            {/* Action Button Section (Order 2 on Mobile, Order 3 on Desktop) */}
            <div className="w-auto order-2 md:order-3 flex justify-end">
                <button 
                    onClick={() => navigate('/create')}
                    className="bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm border-none outline-none transition-transform active:scale-95 shadow-lg shadow-blue-500/20 whitespace-nowrap"
                >
                    + Add Snippet
                </button>
            </div>

            {/* Search Bar Section (Order 3 on Mobile, Order 2 on Desktop) */}
            {onSearch && (
                <div className="w-full md:w-auto md:flex-1 flex justify-center md:max-w-lg order-3 md:order-2 md:mx-4">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text"
                            placeholder="Search by tags (e.g., react)..."
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full bg-[#1e293b] border border-white/10 text-white text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                        />
                    </div>
                </div>
            )}
            
        </nav>
    );
};

export default Navbar;