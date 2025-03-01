import { useContext, useState, useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";
import { DataContext } from "../context/DataContext";
import FilmCard from "../components/FilmCard";
import NotFound from "./NotFound";

const ITEMS_PER_PAGE = 16;

export default function FilmsPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.query);
    const initialPage = parseInt(query.get("page") || "1", 10);

    const data = useContext(DataContext);
    if (!data) return <p>Loading...</p>;

    let films = Object.values(data.films);
    if (!films.length) return <NotFound />;

    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    useEffect(() => {
        // Update the URL without reloading the page
        const newUrl = `?page=${currentPage}`;
        window.history.pushState({}, "", newUrl);
    }, [currentPage]);

    // Sort films based on selected order: "newest" first (films sorted in descending order by release year)
    films.sort((a, b) => (sortOrder === "newest" ? b.release_year - a.release_year : a.release_year - b.release_year));

    const totalPages: number = Math.ceil(films.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleSortChange = (event: Event) => {
        const value = (event.target as HTMLSelectElement).value;
        setSortOrder(value as "newest" | "oldest");
    };

    const displayedFilms = films.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div class="w-full max-w-screen-xl mx-auto px-4">
            <div class="flex justify-between items-center mb-6">                
                {/* Sort Order Dropdown */}
                <div class="flex items-center">
                    <label htmlFor="sortOrder" class="text-lg ml-4 text-right">ترتيب حسب:</label>
                    <select
                        id="sortOrder"
                        value={sortOrder}
                        onChange={handleSortChange}
                        class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                        <option value="newest">الأحدث</option>
                        <option value="oldest">الأقدم</option>
                    </select>
                </div>
            </div>

            {/* Films Grid (RTL) */}
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {displayedFilms.map((film) => (
                    <a href={`/films/${film.id}`} key={film.id}>
                        <FilmCard film={film} />
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

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        class={`w-10 h-10 flex items-center justify-center rounded-full border transition ${
                            currentPage === index + 1
                                ? "bg-black text-white"
                                : "bg-white text-black border-gray-300 hover:border-black hover:text-black"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

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
