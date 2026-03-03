import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/axios';
import Navbar from '../components/Navbar';
import SnippetForm from '../components/SnippetForm';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const UpdateSnippetPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '', language: '', description: '', codeBlock: '', difficulty: 'Easy', tags: '', isFavorite: false
    });

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const res = await api.get(`/snippets/${id}`);
                setFormData(res.data);
                setInitialLoading(false);
            } catch (error) {
                toast.error("Failed to load snippet.");
                navigate('/');
            }
        };
        fetchSnippet();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading("Updating your snippet...");
        try {
            await api.put(`/snippets/${id}`, formData);
            toast.success("Snippet updated successfully!", { id: toastId });
            navigate('/');
        } catch (error) {
            toast.error("Failed to update snippet.", { id: toastId });
            setLoading(false);
        }
    };

    if (initialLoading) return (
        <div className="flex justify-center items-center min-h-screen bg-[#0f172a]">
            <span className="loading loading-infinity loading-lg text-blue-500 scale-[1.5]"></span>
        </div>
    );

    return (
        <div className="min-h-screen w-full bg-[#0f172a] text-white">
            <Navbar />
            <main className="container mx-auto px-6 py-8 max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold uppercase">Edit Snippet</h1>
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>
                <SnippetForm 
                    formData={formData} handleChange={handleChange} 
                    handleSubmit={handleSubmit} loading={loading} 
                    buttonText="Update Snippet" onCancel={() => navigate('/')} 
                />
            </main>
        </div>
    );
};

export default UpdateSnippetPage;