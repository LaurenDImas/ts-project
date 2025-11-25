import {useFilter} from "./FilterContext.tsx";
import {useEffect, useState} from "react";
import {Tally3} from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard.tsx";

type PaginationItem = number | "dots";

const MainContent = () => {
    const {
        searchQuery,
        selectedCategory,
        minPrice,
        maxPrice,
        keyword
    } = useFilter();
    
    const [products, setProducts] = useState([]);
    const [totalProduct, setTotalProduct] = useState<number>(0);
    const [filter, setFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const itemsPerPage = 20;
    
    useEffect(() => {
        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage-1) * itemsPerPage}`;
        if (keyword){
            url = `https://dummyjson.com/products/search?q=${keyword}`;
        }
        
        axios.get(url).then(response => {
            setProducts(response.data.products);
            setTotalProduct(response.data.total);
        }).catch(error => {
            console.log(error);
        });
        
    }, [currentPage, keyword]);
    
    const getFilterProducts = () => {
        let filterProducts = products;
        
        if (selectedCategory) {
            filterProducts = filterProducts.filter(
                (product) => product.category === selectedCategory
            );
        }
        
        if (minPrice !== undefined) {
            filterProducts = filterProducts.filter(
                (product) => product.price >= minPrice
            )
        }
        
        if (maxPrice !== undefined) {
            filterProducts = filterProducts.filter(
                (product) => product.price <= maxPrice
            )
        }
        
        if (searchQuery) {
            filterProducts = filterProducts.filter(
                (product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        
        switch (filter) {
            case "expansive":
                return filterProducts.sort((a, b) => b.price - a.price)
            case "cheap":
                return filterProducts.sort((a, b) => a.price - b.price)
            case "popular":
                return filterProducts.sort((a, b) => b.rating - a.rating)
            default:
                return filterProducts;
        }
    }
    
    const filteredProducts = getFilterProducts();
    
    // TODO: TOTAL DATA
    const totalProducts = totalProduct;
    
    // TODO: TOTAL HALAMAN
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    
    // TODO: HANDLE CHANGE
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    }
    
    // TODO: AMBIL LIST NOMOR PAGE
    const getPaginationButton = () => {
        const pages = [];
        const maxVisible: number = 5;
        
        let startPage = currentPage - Math.floor(maxVisible / 2);
        if (startPage < 1) {
            startPage = 1;
        }
        
        let endPage = startPage + maxVisible - 1;
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, (endPage - maxVisible) + 1);
        }
        
        // Doted
        if (startPage > 1) {
            // Selalu tampilkan halaman 1
            pages.push(1);
            
            // Kalau jaraknya lebih dari 1 langkah, kasih "..."
            // Contoh: startPage = 4 -> akan jadi: 1 ... 4 5 6
            
            if (startPage > 2) {
                pages.push('dots');
            }
        }
        
        // 2. Halaman utama dari startPage sampai endPage
        for (let page = startPage; page <= endPage; page++) {
            pages.push(page);
        }
        
        // 3. Bagian kanan (akhir)
        if (endPage < totalPages) {
            // Kalau masih ada jarak lebih dari 1 halaman ke totalPages, kasih "..."
            // Contoh: endPage = 7, totalPages = 10 ->  ... 7 8 9 ... 10
            if (endPage < totalPages - 1) {
                pages.push('dots');
            }
            
            // Selalu tampilkan halaman terakhir
            pages.push(totalPages);
        }
        
        
        return pages;
        // TODO: 2. Selalu tampilkan halaman pertama
    }
    return (
        <section className="
            xl:w-[55rem]
            lg:w-[55rem]
            sm:w-[40rem]
            xs:w-[10rem]
            p-5"
        >
            <div className="mb-5">
                <div className="flex flex-column sm:flex-row justify-between items-center">
                    <div className="relative mb-5 mt-5">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="border px-4 py-2 rounded-full flex items-center">
                            <Tally3 className="mr-2" />
                            {filter === "all" ? 'Filter' :
                                filter.charAt(0).toLowerCase() + filter.slice(1)}
                        </button>
                        {
                            dropdownOpen && (
                            <div className="absolute bg-white border border-gray-300 rounded mt-2 sm:w-40">
                                <button onClick={() => setFilter('cheap')} className="
                                block px-4 py-2 w-full text-left hover:bg-gray-200
                                ">
                                    Cheap
                                </button>
                                <button onClick={() => setFilter('expensive')} className="
                                block px-4 py-2 w-full text-left hover:bg-gray-200
                                ">
                                    Expensive
                                </button>
                                <button onClick={() => setFilter('popular')} className="
                                block px-4 py-2 w-full text-left hover:bg-gray-200
                                ">
                                    Popular
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center my-5">
                    
                    <button onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="border px-4 py-2 mx-2 rounded-full">Previous</button>
                    
                    <div className="flex flex-wrap jutify-center items-end">
                        {getPaginationButton().map((page, index) => {
                            return page === "dots" ? <p className="font-bold">...</p> : (<button
                                        key={index}
                                        onClick={() => handlePageChange(page)}
                                        className={`border px-4 py-2 mx-2 rounded-full ${
                                            page === currentPage ? "bg-black text-white" : ""
                                        }`}
                                    >{page}</button>)
                        })}
                    </div>
                    
                    <button onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="border px-4 py-2 mx-2 rounded-full">Next</button>
                    
                    {/*<div className="flex flex-wrap jutify-center">*/}
                    {/*    {getPaginationButton().map((page) => {*/}
                    {/*        return page === "dots" ? ( "...") : (*/}
                    {/*            <button*/}
                    {/*                key={page}*/}
                    {/*                onClick={() => handlePageChange(page)}*/}
                    {/*                className={`border px-4 py-2 mx-2 rounded-full ${*/}
                    {/*                    page === currentPage ? "bg-black text-white" : ""*/}
                    {/*                }`}*/}
                    {/*            >{page}</button>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</div>*/}
                    
                </div>
                
                <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {filteredProducts.map((product) => (
                        <BookCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            image={product.thumbnail}
                            price={product.price}
                        />
                    ))}
                </div>
                
            </div>
        </section>
    )
}
export default MainContent
