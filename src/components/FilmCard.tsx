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
      <div class="w-full max-w-xs border border-gray-700 p-4 rounded-lg shadow-lg bg-gray-900 flex flex-col">
          <img 
            src={film.poster_url || "/placeholder.jpg"} 
            alt={film.title} 
            class="w-full h-48 sm:h-56 md:h-64 object-cover rounded-md"
          />
          <h3 class="text-lg font-bold mt-3 text-center text-gray-300 line-clamp-2 h-12">
          {film.title.length > 20 ? `${film.title.substring(0, 20)}...` : film.title}
        </h3>
        <p class="text-sm text-gray-400 text-center">سنة الصدور: {film.release_year}</p>
      </div>
    ); 
  }
  