import { useContext } from "preact/hooks";
import { DataContext } from "../context/DataContext";
import Card from "../components/Card";
import Hero from "../components/Hero";

const ITEMS_PER_PAGE = 8;

export default function MusicPage() {
  const data = useContext(DataContext);
  const films = Object.values(data.films);
  const isLoading = !films.some(film => film.id);

  const PlaceholderCard = () => (
    <div class="w-[10rem] sm:w-[15rem] max-w-xs border border-gray-700 p-4 rounded-lg shadow-lg bg-gray-900 flex flex-col animate-pulse">
        <div class="w-full h-48 sm:h-56 md:h-64 bg-gray-700 rounded-md"></div>
        <div class="h-12 mt-3 bg-gray-700 rounded w-full"></div>
        <div class="h-4 bg-gray-700 rounded w-1/2 mt-2 mx-auto"></div>
    </div>
);



  const filmIdsWithMusic = Object.keys(data.music);
  const displayedFilms = isLoading 
        ? Array(ITEMS_PER_PAGE).fill({}) 
        : filmIdsWithMusic;


  return (
    <div class="w-full max-w-screen-xl mx-auto p-4">
      <Hero title="الموسيقى التصويرية" image="/music.webp" />                
      

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-6 place-items-center">
                          {isLoading 
                              ? Array(ITEMS_PER_PAGE).fill(0).map((_, index) => (
                                  <PlaceholderCard key={`placeholder-${index}`} />
                              ))
                              : displayedFilms.map((filmId) => {
                                const film = data.films[Number(filmId)];
                                return (
                                  <a href={`/music/${film.id}`} key={film.id} >
                                              <Card
                                                    title={film.title}
                                                    subtitle={`سنة الصدور: ${film.release_year}`}
                                                    imageUrl={film.poster_urls[0]}
                                                    placeholderImage="/placeholder.webp"
                                                  />
                                  </a>
                                );
                              })
                          }
                      </div>
    </div>
  );
}
