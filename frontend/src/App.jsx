import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateStory from "./pages/CreateStory";
import Story from "./pages/Story";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-story" element={<CreateStory />} />
                <Route path="/story/:id" element={<Story />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;