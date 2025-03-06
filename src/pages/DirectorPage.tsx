import { useContext } from "preact/hooks";
import { useLocation } from "preact-iso";
import { DataContext } from "../context/DataContext";
import Card from "../components/Card";
import PlaceholderCard from "../components/PlaceHolderCard";

export default function DirectorPage() {
  const location = useLocation();
  const directorId = parseInt(location.path.split("/").pop() || "0", 10);
  const data = useContext(DataContext);

  const ITEMS_PER_PAGE = 12;
  
  // Safe checks for data
  const director = data?.directors?.[directorId];
  const films = director?.filmIds?.map((id) => data?.films?.[id]).filter(Boolean) || [];
  const isLoading = !director || !films.length;

  return (
    <div class="w-full overflow-hidden">
      
      {isLoading ? (
        <div class="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          <div class="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full bg-gray-300 animate-pulse"></div>
      
          <div class="w-full sm:flex-1 text-center sm:text-right">
            <h1 class="text-lg sm:text-2xl md:text-3xl font-bold text-gray-300 bg-gray-300 animate-pulse h-8 w-3/4 sm:w-1/2 mb-3"></h1>
            <p class="mt-3 text-sm sm:text-base text-gray-400 bg-gray-300 animate-pulse h-6 w-5/6 sm:w-2/3"></p>
          </div>
        </div>
      ) : (
        <div class="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          <img
            src={director?.portrait_url || "/Portrait_Placeholder.png"}
            alt={director?.name}
            class="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border border-gray-300 shadow-md"
          />

          <div class="w-full sm:flex-1 text-center sm:text-right">
            <h1 class="text-lg sm:text-2xl md:text-3xl font-bold text-gray-300">{director?.name}</h1>
            <p class="mt-3 text-sm sm:text-base text-gray-400">{director?.bio || "مخرج مصري."}</p>
          </div>
        </div>
      )}
        
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full place-items-center">
        {isLoading
          ? Array(ITEMS_PER_PAGE).fill(0).map((_, index) => (
              <PlaceholderCard key={`placeholder-${index}`} />
            ))
          : films.map((film) => (
              <a href={`/films/${film.id}`} key={film.id}>
                <Card
                  title={film.title}
                  subtitle={`سنة الصدور: ${film.release_year}`}
                  imageUrl={film.poster_url}
                  placeholderImage="/placeholder.jpg"
                />
              </a>
            ))
        }
      </div>
    </div>
  );
}
