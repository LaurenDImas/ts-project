import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";
import MainContent from "./components/MainContent.tsx";
import ProductPage from "./components/ProductPage.tsx";

const App = () => {
    
    // const handlePageChange = (page: PaginationItem) => {
    //     if (page > 0 && page < totalPages) {
    //         setCurrentPage(page);
    //     }
    // }
    //
    // const getPaginationButton = (): PaginationItem[] => {
    //     const buttons: PaginationItem[] = [];
    //     const maxVisible = 5; // max angka yang kelihatan di tengah (bukan termasuk 1/last di luar window)
    //
    //     let startPage = Math.max(1, currentPage - 2);
    //     let endPage = Math.min(totalPages, currentPage + 2);
    //
    //     // Hitung berapa halaman yang kelihatan
    //     let visible = endPage - startPage + 1;
    //
    //     // Kalau masih kurang dari maxVisible dan masih bisa digeser ke kanan (dekat awal)
    //     if (visible < maxVisible && startPage === 1) {
    //         endPage = Math.min(totalPages, startPage + maxVisible - 1);
    //         visible = endPage - startPage + 1;
    //     }
    //
    //     // Kalau masih kurang dan bisa digeser ke kiri (dekat akhir)
    //     if (visible < maxVisible && endPage === totalPages) {
    //         startPage = Math.max(1, endPage - maxVisible + 1);
    //     }
    //
    //     // === Tambah dotted + first/last ===
    //
    //     // Kalau window TIDAK mulai dari 1 → tambahin 1 dan mungkin "..."
    //     if (startPage > 1) {
    //         buttons.push(1);
    //         if (startPage > 2) {
    //             buttons.push("dots"); // ada gap antara 1 dan startPage
    //         }
    //     }
    //
    //     // Tambahin window utama (angka-angka di tengah)
    //     for (let page = startPage; page <= endPage; page++) {
    //         buttons.push(page);
    //     }
    //
    //     // Kalau window TIDAK berakhir di totalPages → tambahin "..." dan last
    //     if (endPage < totalPages) {
    //         if (endPage < totalPages - 1) {
    //             buttons.push("dots"); // ada gap antara endPage dan last
    //         }
    //         buttons.push(totalPages);
    //     }
    //
    //     return buttons;
    // };
    //
    
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
