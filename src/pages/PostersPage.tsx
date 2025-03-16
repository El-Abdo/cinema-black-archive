import { useContext, useState, useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";
import { DataContext } from "../context/DataContext";
import Card from "../components/Card";
import PlaceholderCard from "../components/PlaceHolderCard";
import Hero from "../components/Hero";
import Search from "../components/Search";

const ITEMS_PER_PAGE = 16;

export default function FilmsPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.query);
    const initialPage = parseInt(query.get("page") || "1", 10);

    const data = useContext(DataContext);
    const films = Object.values(data?.films || {}).filter(film => film.poster_urls?.length > 0);

    // Check if films are actually loaded (not just empty objects)
    const isLoading = !films.some(film => film.id);

    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [sortOrder, setSortOrder] = useState<"most_posters" | "least_posters">("most_posters");

    useEffect(() => {
        const newUrl = `?page=${currentPage}`;
        window.history.pushState({}, "", newUrl);
    }, [currentPage]);

    // Only sort if films are loaded
    if (!isLoading) {
        films.sort((a, b) => {
            const countA = a.poster_urls?.length || 0;
            const countB = b.poster_urls?.length || 0;
            return sortOrder === "most_posters" ? countB - countA : countA - countB;
        });
    }   

    const totalPages: number = isLoading ? 1 : Math.ceil(films.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleSortChange = (event: Event) => {
        const value = (event.target as HTMLSelectElement).value;
        setSortOrder(value as "most_posters" | "least_posters");
    };

    const displayedFilms = isLoading 
        ? Array(ITEMS_PER_PAGE).fill({}) 
        : films.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );

    return (
        <div class="w-full max-w-screen-xl mx-auto px-4 bg-black">
            <Hero title="الأفيشات" image="/posters.webp">                
                <Search 
                    data={Object.values(data.films)} 
                    placeholder="ابحث عن أفيشات فيلم..." 
                    searchFields={["title", "description"]} 
                    getLink={(film) => `/posters/${film.id}`} 
                    getDisplayText={(film) => film.title} 
                />
            </Hero>

            <div class="flex justify-between items-center my-6">                
                {/* Sort Order Dropdown */}
                <div class="flex items-center">
                    <label htmlFor="sortOrder" class="text-lg ml-4 text-right text-gray-300">ترتيب حسب:</label>
                    <select
                        id="sortOrder"
                        value={sortOrder}
                        onChange={handleSortChange}
                        disabled={isLoading}
                        class={`px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        <option value="most_posters">الأكثر</option>
                        <option value="least_posters">الأقل</option>
                    </select>
                </div>
            </div>

            {/* Films Grid (RTL) */}
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-6 place-items-center">
                {isLoading 
                    ? Array(ITEMS_PER_PAGE).fill(0).map((_, index) => (
                        <PlaceholderCard key={`placeholder-${index}`} />
                    ))
                    : displayedFilms.map((film) => (
                        <a href={`/posters/${film.id}`} key={film.id}>
                            <Card
                                title={film.title}
                                subtitle={`عدد الأفيشات : ${film.poster_urls?.length }`}
                                imageUrl={film.poster_urls[0]}
                                placeholderImage="/placeholder.webp"
                            />
                        </a>
                    ))
                }
            </div>

            {/* Pagination */}
            <div class="flex justify-center items-center text-lg mt-4 space-x-2">
                <button
                    disabled={true}
                    class="w-10 h-10 flex items-center justify-center rounded-full border text-gray-400 cursor-not-allowed"
                >
                    {"<"}
                </button>

                {isLoading 
                    ? Array(5).fill(0).map((_, index) => (
                        <span 
                            key={`loading-page-${index}`} 
                            class="w-10 h-10 bg-gray-800 animate-pulse rounded-full"
                        ></span>
                    ))
                    : (() => {
                        const pageNumbers = [];

                        if (totalPages <= 7) {
                            for (let i = 1; i <= totalPages; i++) {
                                pageNumbers.push(i);
                            }
                        } else {
                            pageNumbers.push(1);
                            const leftBound = Math.max(2, currentPage - 2);
                            const rightBound = Math.min(totalPages - 1, currentPage + 2);

                            if (leftBound > 2) {
                                pageNumbers.push("ellipsis1");
                            }

                            for (let i = leftBound; i <= rightBound; i++) {
                                pageNumbers.push(i);
                            }

                            if (rightBound < totalPages - 1) {
                                pageNumbers.push("ellipsis2");
                            }

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
                                            : "bg-white text-black border-gray-300 hover:border-black hover:text-black cursor-pointer"
                                    }`}
                                    onClick={() => handlePageChange(Number(pageNumber))}
                                >
                                    {pageNumber}
                                </button>
                            );
                        });
                    })()}

                <button
                    disabled={true}
                    class="w-10 h-10 flex items-center justify-center rounded-full border text-gray-400 cursor-not-allowed"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}