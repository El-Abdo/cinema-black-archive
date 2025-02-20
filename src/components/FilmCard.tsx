interface FilmProps {
    film: {
      id: number;
      title: string;
      release_year: number;
      poster_url: string;
    };
  }
  
  export default function FilmCard({ film }: FilmProps) {
    return (
      <div class="border p-4 rounded-lg shadow-lg bg-white">
        <img src={film.poster_url || "/placeholder.jpg"} alt={film.title} class="w-full h-60 object-cover rounded-md" />
        <h3 class="text-lg font-bold mt-3">{film.title}</h3>
        <p class="text-sm text-gray-600">{film.release_year}</p>
      </div>
    );
  }
  