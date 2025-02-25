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
  const films = director.films || {};
  
  if (!director) return <NotFound/>;

  return (
    <>
    <div class="p-6 flex flex-col lg:flex-row gap-6 items-start justify-end">
            <img 
                src={director.portrait_url} 
                alt={director.name} 
                class="w-40 h-40 object-cover rounded-full border border-gray-300 shadow-md"
            />

            <div class="flex-1 text-right">
                <h1 class="text-2xl font-bold">{director.name}</h1>
                <p class="text-gray-800 mt-6">{director.bio || "مخرج مصري."}</p>
            </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {films.map((film) => (
            <FilmCard key={film.id} film={film} />
        ))}
    </div>
    </>
    
);
}

