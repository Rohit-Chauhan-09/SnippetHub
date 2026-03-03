import React from 'react';
import { Save } from 'lucide-react';

const SnippetForm = ({ formData, handleChange, handleSubmit, loading, buttonText, onCancel }) => {
    return (
        <form onSubmit={handleSubmit} className="bg-[#1e293b] border border-white/5 rounded-2xl shadow-2xl p-8">
            {/* Top Row: Title & Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wide">Snippet Title <span className="text-red-500">*</span></label>
                    <input 
                        type="text" name="title" value={formData.title} onChange={handleChange} required
                        placeholder="e.g., MongoDB Connection Setup"
                        className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                    />
                </div>
                <div>
                    <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wide">Programming Language <span className="text-red-500">*</span></label>
                    <input 
                        type="text" name="language" value={formData.language} onChange={handleChange} required
                        placeholder="e.g., JavaScript, Python, C++"
                        className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 uppercase"
                    />
                </div>
            </div>

            {/* Middle Row: Difficulty, Tags, & Favorite */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                    <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wide">Difficulty</label>
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange}
                        className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wide">Tags</label>
                    <input 
                        type="text" name="tags" value={formData.tags} onChange={handleChange}
                        placeholder="e.g., react, hooks, api"
                        className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                    />
                </div>
                <div className="flex flex-col justify-center mt-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input type="checkbox" name="isFavorite" checked={formData.isFavorite} onChange={handleChange} className="sr-only" />
                            <div className={`block w-10 h-6 rounded-full transition-colors ${formData.isFavorite ? 'bg-red-500' : 'bg-slate-700'}`}></div>
                            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.isFavorite ? 'transform translate-x-4' : ''}`}></div>
                        </div>
                        <span className="text-slate-300 text-sm font-semibold group-hover:text-white transition-colors">Mark as Favorite</span>
                    </label>
                </div>
            </div>

            {/* Description Section */}
            <div className="mb-6">
                <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wide">Description <span className="text-red-500">*</span></label>
                <textarea 
                    name="description" value={formData.description} onChange={handleChange} required rows="3"
                    placeholder="Explain what this snippet does..."
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 resize-none"
                ></textarea>
            </div>

            {/* Code Block Section */}
            <div className="mb-8">
                <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wide">Code Block <span className="text-red-500">*</span></label>
                <textarea 
                    name="codeBlock" value={formData.codeBlock} onChange={handleChange} required rows="8"
                    placeholder="// Write or Paste your code here..."
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#4ade80] font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 resize-none"
                ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-6">
                <button type="button" onClick={onCancel}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                    Cancel
                </button>
                <button type="submit" disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save size={16} />
                    {loading ? 'Processing...' : buttonText}
                </button>
            </div>
        </form>
    );
};

export default SnippetForm;