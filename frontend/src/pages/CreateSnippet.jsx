import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import Navbar from '../components/Navbar';
import SnippetForm from '../components/SnippetForm';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const CreateSnippetPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '', language: '', description: '', codeBlock: '', difficulty: 'Easy', tags: '', isFavorite: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading("Saving your snippet...");
        try {
            await api.post('/snippets', formData);
            toast.success("Snippet created successfully!", { id: toastId });
            navigate('/');
        } catch (error) {
            toast.error("Failed to create snippet.", { id: toastId });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0f172a] text-white">
            <Navbar />
            <main className="container mx-auto px-6 py-8 max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold uppercase">Create New Snippet</h1>
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>
                <SnippetForm 
                    formData={formData} handleChange={handleChange} 
                    handleSubmit={handleSubmit} loading={loading} 
                    buttonText="Save Snippet" onCancel={() => navigate('/')} 
                />
            </main>
        </div>
    );
};

export default CreateSnippetPage;