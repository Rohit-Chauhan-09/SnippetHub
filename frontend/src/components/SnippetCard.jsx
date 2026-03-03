import React from 'react';
import { Pencil, Trash2, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatData } from '../lib/utils'; 

const SnippetCard = ({ snippet, onEdit, onDelete, onViewDetails }) => {
    
    const getDiffColor = (level) => {
        switch(level?.toLowerCase()) {
            case 'easy': return 'text-green-400 bg-green-500/10 border-green-500/20';
            case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            case 'hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
            default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet.codeBlock);
        toast.success("Copied to clipboard.");
    };

    const getFormattedDate = () => {
        try {
            const dateString = snippet.updatedAt || snippet.createdAt;
            if (!dateString) return '';
            const dateObj = new Date(dateString);
            if (isNaN(dateObj.getTime())) return '';
            return formatData(dateObj);
        } catch (error) {
            return '';
        }
    };

    return (
        <div className="card bg-[#1e293b] border border-white/5 shadow-xl rounded-2xl h-[360px] flex flex-col overflow-hidden relative transition-all duration-300">
            <div className="card-body p-6 flex flex-col h-full overflow-hidden">
                
                {/* Top Row: Badges & Actions */}
                <div className="flex justify-between items-center mb-3">
                    
                    {/* Left Side: Difficulty aur Language */}
                    <div className="flex gap-2 items-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getDiffColor(snippet.difficulty)}`}>
                            {snippet.difficulty || 'Easy'}
                        </span>
                        <span className="text-[10px] font-black tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 uppercase">
                            {snippet.language}
                        </span>
                    </div>
                    
                    {/* Right Side: DATE, Favorite, Edit, Delete */}
                    <div className="flex gap-2 items-center">
                        {/* Time Show */}
                        <span className="text-[10px] text-slate-500 font-semibold tracking-widest mr-1 uppercase">
                            {getFormattedDate()}
                        </span>

                        {snippet.isFavorite && (
                            <div className="p-1.5 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20" title="Favorite">
                                <Heart size={14} fill="currentColor" />
                            </div>
                        )}
                        <button 
                            onClick={() => onEdit(snippet._id)}
                            className="p-1.5 bg-slate-800 hover:bg-blue-600 rounded-lg transition-colors border border-white/5"
                            title="Edit Snippet"
                        >
                            <Pencil size={14} />
                        </button>
                        <button 
                            onClick={() => onDelete(snippet)}
                            className="p-1.5 bg-slate-800 hover:bg-red-600 rounded-lg transition-colors border border-white/5"
                            title="Delete Snippet"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>

                {/* Title & Description */}
                <h2 className="text-xl font-bold text-white truncate mb-1" title={snippet.title}>
                    {snippet.title}
                </h2>
                
                <p 
                    className="text-slate-400 text-sm opacity-70 line-clamp-2 break-all leading-relaxed" 
                    title={snippet.description}
                >
                    {snippet.description}
                </p>

                {/* Code Preview */}
                <div className="bg-[#0b0f19] rounded-xl px-4 pt-0 pb-2 border border-white/5 mb-4 h-[100px] overflow-y-auto overflow-x-hidden no-scrollbar">
                    <pre className="m-0 p-0">
                        <code className="text-[#4ade80] text-[12px] font-mono block leading-[1.3rem] whitespace-pre-wrap break-all opacity-95 pt-[0.35rem]">
                            {snippet.codeBlock?.trim()}
                        </code>
                    </pre>
                </div>

                {/* Footer Buttons */}
                <div className="mt-auto pt-3 border-t border-white/5 flex items-center gap-4 bg-[#1e293b]">
                    <button 
                        onClick={() => onViewDetails(snippet)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-lg transition-all active:scale-95 shadow-md"
                    >
                        View Details
                    </button>
                    <button 
                        onClick={handleCopy}
                        className="px-6 bg-[#334155] hover:bg-[#475569] text-white text-xs font-bold py-2.5 rounded-lg transition-all active:scale-95"
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SnippetCard;