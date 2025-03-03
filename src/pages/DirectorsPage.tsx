import { useContext, useState, useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";
import { DataContext } from "../context/DataContext";
import DirectorCard from "../components/DirectorCard";
import NotFound from "./NotFound";
import Hero from "../components/Hero";
import Search from "../components/Search";

const ITEMS_PER_PAGE = 9;

export default function DirectorPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.query);
    const initialPage = parseInt(query.get("page") || "1", 10);

    const data = useContext(DataContext);
    if (!data) return null;

    const directors = Object.values(data.directors);
    if (!directors.length) return <NotFound />;

    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const totalPages: number = Math.ceil(directors.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" }); 
        }
    };

    useEffect(() => {
        const newUrl = `?page=${currentPage}`;
        window.history.pushState({}, "", newUrl);
    }, [currentPage]);

    const displayedDirectors = directors.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (

            <div class="w-full max-w-screen-xl mx-auto px-4">
                {/* Hero Section with Embedded Search */}
                <Hero title="المخرجين" image="/cover.PNG">
                    <Search 
                        data={Object.values(data.directors)} 
                        placeholder="ابحث عن مخرج..." 
                        searchFields={["name", "bio"]} 
                        getLink={(director) => `/directors/${director.id}`} 
                        getDisplayText={(director) => director.name} 
                    />
                    
                </Hero>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6">
                    {displayedDirectors.map((director) => (
                        <a href={`/directors/${director.id}`} key={director.id}>
                            <DirectorCard key={director.id + 1} director={director} />
                        </a>
                    ))}
                </div>

                {/* Pagination */}
                <div class="flex justify-center items-center text-lg mt-4 space-x-2">
                    <button 
                        class={`w-10 h-10 flex items-center justify-center rounded-full border transition ${
                            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:text-blue-700"
                        }`} 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {"<"}
                    </button>

                    {(() => {
                        const pageNumbers = [];
                        
                        if (totalPages <= 7) {
                            // Show all pages if there are 7 or fewer
                            for (let i = 1; i <= totalPages; i++) {
                                pageNumbers.push(i);
                            }
                        } else {
                            // Always include first page
                            pageNumbers.push(1);
                            
                            // Calculate window around current page
                            const leftBound = Math.max(2, currentPage - 2);
                            const rightBound = Math.min(totalPages - 1, currentPage + 2);
                            
                            // Show ellipsis after page 1 if needed
                            if (leftBound > 2) {
                                pageNumbers.push("ellipsis1");
                            }
                            
                            // Add pages in the window
                            for (let i = leftBound; i <= rightBound; i++) {
                                pageNumbers.push(i);
                            }
                            
                            // Show ellipsis before the last page if needed
                            if (rightBound < totalPages - 1) {
                                pageNumbers.push("ellipsis2");
                            }
                            
                            // Always include the last page
                            pageNumbers.push(totalPages);
                        }
                        
                        return pageNumbers.map((pageNumber, index) => {
                            if (pageNumber === "ellipsis1" || pageNumber === "ellipsis2") {
                                return (
                                    <span key={`ellipsis-${index}`} class="w-10 h-10 flex items-center justify-center">
                                        ...
                                    </span>
                                );
                            }
                            
                            return (
                                <button 
                                    key={`page-${pageNumber}`}
                                    class={`w-10 h-10 flex items-center justify-center rounded-full border transition ${
                                        currentPage === pageNumber 
                                            ? "bg-black text-white" 
                                            : "bg-white text-black border-gray-300 hover:border-black hover:text-black"
                                    }`} 
                                    onClick={() => handlePageChange(Number(pageNumber))}
                                >
                                    {pageNumber}
                                </button>
                            );
                        });
                    })()}

                    <button 
                        class={`w-10 h-10 flex items-center justify-center rounded-full border transition ${
                            currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:text-blue-700"
                        }`} 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {">"}
                    </button>
                </div>
            </div>
    );
}