import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import Navbar from '../components/Navbar';
import SnippetModal from '../components/SnippetModal';
import DeleteConfirmModal from '../components/DeleteModal';
import SnippetCard from '../components/SnippetCard'; 
import { SearchX, Plus, FilePlus } from 'lucide-react'; // Added Plus icons
import toast from 'react-hot-toast';

const HomePage = () => {
    const navigate = useNavigate();

    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSnippet, setSelectedSnippet] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [snippetToDelete, setSnippetToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const res = await api.get('/snippets');
                setSnippets(res.data);
            } catch (error) {
                console.log("Error fetching snippets", error);
                toast.error("Failed to load snippets");
            } finally {
                setLoading(false);
            }
        };

        fetchSnippets();
    }, []);

    const confirmDelete = async () => {
        if (!snippetToDelete) return;
        const toastId = toast.loading("Processing deletion...");
        try {
            await api.delete(`/snippets/${snippetToDelete._id}`);
            setSnippets(snippets.filter(s => s._id !== snippetToDelete._id));
            toast.success("Snippet deleted successfully.", { id: toastId });
        } catch (err) {
            toast.error("Delete failed.", { id: toastId });
        } finally {
            setIsDeleteModalOpen(false);
            setSnippetToDelete(null);
        }
    };

    const filteredSnippets = snippets.filter((s) => {
        if (!searchQuery) return true;
        const tagsString = (s.tags || '').toLowerCase();
        return tagsString.includes(searchQuery.toLowerCase());
    });

    if (loading) return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full bg-[#0f172a]">
            <span className="loading loading-infinity loading-lg text-blue-500 scale-[1.5]"></span>
        </div>
    );

    return (
        <div className="min-h-screen w-full bg-[#0f172a] text-white overflow-x-hidden font-sans">
            <Navbar onSearch={setSearchQuery} />

            <main className="container mx-auto px-6 py-8">
                <header className="mb-6 flex items-center gap-3">
                    <div className="h-6 w-1 bg-blue-500 rounded-full"></div>
                    <h1 className="text-2xl font-bold tracking-tight uppercase">
                        {searchQuery ? `Search Results for "${searchQuery}"` : "All Snippets"}
                    </h1>
                </header>

                {/* CASE 1: DataBase Empty */}
                {snippets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-[#1e293b]/30 rounded-3xl border-2 border-dashed border-white/5">
                        <div className="p-4 bg-blue-500/10 rounded-full mb-4">
                            <FilePlus size={48} className="text-blue-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No snippets yet</h2>
                        <p className="text-slate-400 mb-8 text-center max-w-xs">
                            Your library is empty. Start your journey by adding your first code snippet!
                        </p>
                        <button 
                            onClick={() => navigate('/create')}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                        >
                            <Plus size={20} />
                            Add Snippet
                        </button>
                    </div>
                ) : 
                
                /* CASE 2: Date Nahi mila to Search me */
                filteredSnippets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <SearchX size={64} className="mb-4 text-slate-500" />
                        <h2 className="text-xl font-bold">No results matched your search</h2>
                        <p className="text-sm">Try using different tags or clear the search.</p>
                    </div>
                ) : (
                    /* CASE 3: Snippets Show */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                        {filteredSnippets.map((s) => (
                            <SnippetCard 
                                key={s._id} 
                                snippet={s} 
                                onEdit={(id) => navigate(`/edit/${id}`)}
                                onDelete={(snippet) => { setSnippetToDelete(snippet); setIsDeleteModalOpen(true); }}
                                onViewDetails={(snippet) => { setSelectedSnippet(snippet); setIsModalOpen(true); }}
                            />
                        ))}
                    </div>
                )}
            </main>

            <SnippetModal isOpen={isModalOpen} snippet={selectedSnippet} onClose={() => setIsModalOpen(false)} />
            <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} title={snippetToDelete?.title} />
        </div>
    );
};

export default HomePage;