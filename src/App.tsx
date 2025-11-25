import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";
import MainContent from "./components/MainContent.tsx";
import ProductPage from "./components/ProductPage.tsx";

const App = () => {
    
    return (
        <BrowserRouter>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="rounded w-full flex justify-between flex-wrap">
                    <Routes>
                        <Route path="/" element={<MainContent/>} />
                        <Route path="/product/:id" element={<ProductPage/>} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}
export default App
