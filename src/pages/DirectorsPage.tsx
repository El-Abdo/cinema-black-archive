import { useContext, useState } from "preact/hooks";
import { DataContext } from "../context/DataContext";
import DirectorCard from "../components/DirectorCard";
import NotFound from "./NotFound";

const ITEMS_PER_PAGE = 8;

export default function DirectorPage() {
  const data = useContext(DataContext);
  if (!data) return <p>Loading...</p>;

  const directors = Object.values(data.directors);
  if (!directors.length) return <NotFound />;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = Math.ceil(directors.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" }); 
    }
};


  const displayedDirectors = directors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div class="w-full max-w-screen-xl mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedDirectors.map((director) => (
            <DirectorCard key={director.id} director={director} />
            ))}
        </div>

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
                        ? "bg-black color-black fill-black text-white" 
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
