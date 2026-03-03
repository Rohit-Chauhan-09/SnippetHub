import React from 'react';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react'; // Icon

const SnippetModal = ({ snippet, isOpen, onClose }) => {
    if (!isOpen || !snippet) return null;

    const getDiffColor = (level) => {
        switch(level?.toLowerCase()) {
            case 'easy': return 'text-green-400 bg-green-500/10 border-green-500/20';
            case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            case 'hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
            default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-[#1e293b] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl flex flex-col">
                
                <div className="sticky top-0 bg-[#1e293b] p-6 border-b border-white/5 flex justify-between items-start z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{snippet.title}</h2>
                        <div className="flex gap-2 items-center">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getDiffColor(snippet.difficulty)}`}>
                                {snippet.difficulty || 'Easy'}
                            </span>
                            <span className="text-[10px] font-black tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 uppercase">
                                {snippet.language}
                            </span>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-white text-3xl transition-colors active:scale-90"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-slate-500 uppercase text-[10px] font-black tracking-widest mb-2">Description</h3>
                        <p className="text-slate-300 leading-relaxed">
                            {snippet.description}
                        </p>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-slate-500 uppercase text-[10px] font-black tracking-widest">Source Code</h3>
                            
                            {/* Copy Button --- */}
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(snippet.codeBlock);
                                    toast.success("Code Copied!");
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs font-bold text-blue-400 hover:bg-blue-500 hover:text-white transition-all active:scale-95 group"
                            >
                                <Copy size={14} className="group-hover:rotate-12 transition-transform" />
                                Copy Code
                            </button>
                        </div>
                        
                        <div className="bg-[#0b0f19] rounded-xl p-6 border border-white/5 shadow-inner">
                            <pre className="font-mono text-sm leading-relaxed text-[#4ade80] overflow-x-auto scrollbar-thin scrollbar-thumb-blue-900">
                                <code className="whitespace-pre">
                                    {snippet.codeBlock}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-white/5 bg-[#1e293b] mt-auto">
                    <button 
                        onClick={onClose}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
                    >
                        Close Preview
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SnippetModal;