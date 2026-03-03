import mongoose from "mongoose";

const snippetSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        codeBlock: {
            type: String,
            required: true, // The actual code text
        },
        description: {
            type: String,
            required: true, // short note
        },
        tags: {
            type: String, 
            required: true, 
            // will store tags as a comma-separated string 
            // Example: "Frontend, UI, Button"
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'], // Validation: Only allows these 3 values
            default: 'Easy',
        },
        isFavorite: {
            type: Boolean,
            default: false, // Default is NOT favorite when created
        },
    },
    {
        timestamps: true, // This automatically creates 'createdAt' and 'updatedAt' fields
    }
);

// Create the model
const Snippet = mongoose.model('Snippet', snippetSchema);

export default Snippet;