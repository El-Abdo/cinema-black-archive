import { useContext } from "preact/hooks";
import { DataContext } from "../context/DataContext";
import FilmCard from "../components/FilmCard";

interface MusicPageProps {
  setSelectedFilm: (film: any) => void;
}

export default function MusicPage({ setSelectedFilm }: MusicPageProps) {
  const data = useContext(DataContext);

  if (!data) {
    return <p>Loading...</p>;
  }
  const filmIdsWithMusic = Object.keys(data.music);

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Music from Films</h1>
      {filmIdsWithMusic.length === 0 ? (
        <p>No films with music available.</p>
      ) : (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filmIdsWithMusic.map((filmId) => {
            const film = data.films[Number(filmId)];
            return (
              <button key={film.id} onClick={() => setSelectedFilm(film)}>
                <FilmCard film={film} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
