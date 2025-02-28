import { useLocation } from 'preact-iso';


interface FilmProps {
    film: {
      id: number;
      title: string;
      release_year: number;
      poster_url: string;
    };
  }
  
  export default function FilmCard({ film }: FilmProps) {
    const location = useLocation();
    const path = location.path;
    const parts = path.split('/');
    const linkPath = parts[1] === 'director' ? `/film/${film.id}` : `${path}/${film.id}`;

    return (
      <div class="border p-4 rounded-lg shadow-lg bg-white">
        <a href={`${linkPath}`} class="block">
          <img src={film.poster_url || "/placeholder.jpg"} alt={film.title} class="w-full h-60 object-cover rounded-md" />
          <h3 class="text-lg font-bold mt-3 text-center">{film.title}</h3>
        </a> 
        <p class="text-sm text-gray-600 text-center">سنة الصدور: {film.release_year}</p>
      </div>
    );
  }
  