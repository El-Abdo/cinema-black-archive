import { useContext } from "preact/hooks";
import { useLocation } from "preact-iso";
import { DataContext } from "../context/DataContext";

export default function PosterPage() {
  const location = useLocation();
  const filmId = parseInt(location.path.split("/").pop() || "0", 10);
  const data = useContext(DataContext);

  // Get film details from context
  const film = data.films[filmId];
  const isLoading = !film;

  return (
    <div class="p-4 sm:p-6 max-w-screen-xl mx-auto">
      {/* Film Header */}
      <div class="flex flex-col lg:flex-row items-start gap-6">
        {/* Film Poster */}
        <div class="w-full sm:w-60 md:w-80 aspect-[2/3] bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {isLoading ? (
            <div class="w-full h-full bg-gray-300 animate-pulse"></div>
          ) : (
            film.poster_urls?.length > 0 && (
              <img
                src={film.poster_urls[0]}
                alt={film.title}
                class="w-full h-full object-cover"
                width="320" height="480"
              />
            )
          )}
        </div>

        {/* Film Info */}
        <div class="flex-1 text-right text-gray-300">
          {isLoading ? (
            <>
              <div class="h-8 w-3/4 sm:w-1/2 bg-gray-300 animate-pulse mb-4"></div>
              <div class="h-6 w-5/6 sm:w-2/3 bg-gray-300 animate-pulse"></div>
            </>
          ) : (
            <>
              <h1 class="text-xl sm:text-2xl md:text-3xl font-bold">{film.title}</h1>
              <p class="text-gray-400 mt-4 lg:text-2xl">{film.description}</p>
            </>
          )}
        </div>
      </div>

      {/* Posters Section */}
      <h2 class="mt-10 text-lg sm:text-xl md:text-2xl font-semibold text-right text-gray-400">أفيشات الفيلم</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {isLoading
          ? Array(8).fill(0).map((_, index) => (
              <div key={index} class="w-full aspect-[2/3] bg-gray-800 rounded-md shadow-md overflow-hidden">
                <div class="w-full h-full bg-gray-300 animate-pulse"></div>
              </div>
            ))
          : (film.poster_urls || []).map((posterUrl) => (
              <a
                key={posterUrl}
                href={posterUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="block transform transition duration-300 hover:scale-105"
              >
                <div class="w-full aspect-[2/3] bg-gray-800 rounded-md shadow-md overflow-hidden">
                  <img
                    src={posterUrl}
                    alt="Poster"
                    class="w-full h-full object-cover"
                    width="400" height="600"
                  />
                </div>
              </a>
            ))
        }
      </div>
    </div>
  );
}
