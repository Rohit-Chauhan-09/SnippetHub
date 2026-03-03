import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CreateSnippetPage from "./pages/CreateSnippet";
import UpdateSnippetPage from "./pages/UpdateSnippet";

function App() {
  return (
    // Wrapper div theme aur background ke liye
    <div className="bg-[#0f172a] min-h-screen w-full overflow-x-hidden font-sans text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateSnippetPage />} />
        <Route path="/edit/:id" element={<UpdateSnippetPage />} />
      </Routes>
    </div>
  );
}

export default App;