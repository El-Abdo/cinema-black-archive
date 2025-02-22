import FilmCard from "./FilmCard";
interface DirectorProps {
    director: {
      id: number;
      name: string;
      bio: string;
      portrait_url: string;
      films: { id: number; title: string; release_year: number; poster_url: string}[];
    };
  }
  
  export default function DirectorCard({ director }: DirectorProps) {
    return (
      <div class="border p-4 rounded-lg shadow-lg bg-white">
        <img src={director.portrait_url || "/placeholder.jpg"} alt={director.name} class="w-full h-48 object-cover rounded-md" />
        <h3 class="text-lg font-bold mt-3">{director.name}</h3>
        <p class="text-sm text-gray-600">{director.bio}</p>
        <ul class="text-xs mt-2">
          {director.films.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </ul>
      </div>
    );
  }
  
  