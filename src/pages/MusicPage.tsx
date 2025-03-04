import { useContext } from "preact/hooks";
import { DataContext } from "../context/DataContext";
import FilmCard from "../components/FilmCard";
import NotFound from "./NotFound";
import Hero from "../components/Hero";

export default function MusicPage() {
  const data = useContext(DataContext);

  if (!data) {
    return null;
  }
  const filmIdsWithMusic = Object.keys(data.music);

  return (
    <div class="w-full max-w-screen-xl mx-auto p-4">
      <Hero title="الموسيقى التصويرية" image="/cover.PNG" />                
      {filmIdsWithMusic.length === 0 ? (
        <NotFound />
      ) : (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6 place-items-center">
          {filmIdsWithMusic.map((filmId) => {
            const film = data.films[Number(filmId)];
            return (
              <a href={`/music/${film.id}`} key={film.id} >
                          <FilmCard key={film.id} film={film} />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
