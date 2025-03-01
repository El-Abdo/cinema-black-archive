import { useContext} from "preact/hooks";
import { useLocation } from "preact-iso";
import { DataContext } from "../context/DataContext";
import FilmCard from "../components/FilmCard";
import NotFound from "./NotFound";

export default function DirectorPage() {
  const location = useLocation();
  const directorId = parseInt(location.path.split("/").pop() || "0", 10);
  const data = useContext(DataContext);
  if (!data) return <p>Loading...</p>;

  const director = data.directors[directorId];
  const films = director.filmIds.map((id) => data.films[id]).filter(Boolean);

  if (!director) return <NotFound/>;

  return (
    <div class="w-full overflow-hidden">
      <div class="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
        <img
          src={director.portrait_url || "/Portrait_Placeholder.png"}
          alt={director.name}
          class="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border border-gray-300 shadow-md"
        />
  
        <div class="w-full sm:flex-1 text-center sm:text-right">
          <h1 class="text-lg sm:text-2xl md:text-3xl font-bold">{director.name}</h1>
          <p class="text-gray-800 mt-3 text-sm sm:text-base">{director.bio || "مخرج مصري."}</p>
        </div>
      </div>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
  
  
}

