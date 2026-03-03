import Snippet from "../models/snippetModel.js"

// 1. Get All Snippets
export async function getAllSnippets(_, res) {
    try {
        // Newest comes first
        const snippets = await Snippet.find().sort({ createdAt: -1 })
        res.status(200).json(snippets)
    } catch (error) {
        console.error("Error in getAllSnippets controller", error)
        res.status(500).json({ message: "Internal server error"})
    }
}

// 2. Get Single Snippet by ID
export async function getSnippetById(req, res) {
    try {
        const snippet = await Snippet.findById(req.params.id)
        if (!snippet) return res.status(404).json({ message: "Snippet not found" })
        
        res.status(200).json(snippet)
    } catch (error) {
        console.error("Error in getSnippetById controller", error)
        res.status(500).json({ message: "Internal server error"})
    }
}

// 3. Create New Snippet
export async function createSnippet(req, res) {
    try {
        const { title, language, codeBlock, description, tags, difficulty, isFavorite } = req.body

        // Validation
        if (!title || !language || !codeBlock || !description || !tags) {
            return res.status(400).json({ message: "Please fill all fields: Title, Language, Code, Description, and Tags are required." })
        }

        const newSnippet = new Snippet({
            title, 
            language, 
            codeBlock, 
            description, 
            tags, 
            difficulty, // Default 'Easy' hai
            isFavorite  // Default 'false' hai
        })

        const savedSnippet = await newSnippet.save()
        res.status(201).json(savedSnippet)

    } catch (error) {
        console.log("Error in createSnippet controller", error)
        res.status(500).json({ message: "Internal server error"})
    }
}

// 4. Update Snippet
export async function updateSnippet(req, res) {
    // console.log("updateSnippet")
    try {
        const { 
            title, 
            language, 
            codeBlock, 
            description, 
            tags, 
            difficulty, 
            isFavorite 
        } = req.body

        const updatedSnippet = await Snippet.findByIdAndUpdate(
            req.params.id, 
            { 
                title, 
                language, 
                codeBlock, 
                description, 
                tags, 
                difficulty, 
                isFavorite 
            }, 
            { new: true, runValidators: true } // Return the updated document
        )

        if (!updatedSnippet) return res.status(404).json({ message: "Snippet not found" })
        
        res.status(200).json(updatedSnippet)

    } catch (error) {
        console.error("Error in updateSnippet controller", error)
        res.status(500).json({ message: "Internal server error"})
    }
}

// 5. Delete Snippet
export async function deleteSnippet(req, res) {
    // console.log("deleteSnippet")
    try {
        const deletedSnippet = await Snippet.findByIdAndDelete(req.params.id)

        if (!deletedSnippet) return res.status(404).json({ message: "Snippet not found" })
        
        res.status(200).json({ message: "Snippet deleted successfully" })

    } catch (error) {
        console.error("Error in deleteSnippet controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}