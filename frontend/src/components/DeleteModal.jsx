import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
            {/* Modal Card Container */}
            <div className="bg-[#1e293b] border border-white/10 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
                
                {/* Visual Alert Indicator */}
                <div className="p-8 pb-0 flex flex-col items-center">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                        <AlertTriangle className="text-red-500" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white text-center px-2">
                        Confirm Deletion
                    </h3>
                    <p className="text-slate-400 text-sm text-center mt-3 px-4 leading-relaxed">
                        Are you sure you want to delete <span className="text-white font-semibold">"{title}"</span>? This action is permanent and cannot be undone.
                    </p>
                </div>

                {/* Modal Actions */}
                <div className="p-8 flex flex-col gap-3">
                    <button
                        onClick={onConfirm}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
                    >
                        <Trash2 size={18} />
                        Delete Snippet
                    </button>
                    
                    <button
                        onClick={onClose}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.98] border border-white/5"
                    >
                        Cancel
                    </button>
                </div>

                {/* Corner Dismiss Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;