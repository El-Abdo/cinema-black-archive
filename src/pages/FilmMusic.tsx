import { useContext } from "preact/hooks";
import { useLocation } from "preact-iso";
import { DataContext } from "../context/DataContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function FilmMusicPage() {
  const location = useLocation();
  const filmId = parseInt(location.path.split("/").pop() || "0", 10);
  const data = useContext(DataContext);

  if (!data) return <p>Loading...</p>;

  const film = data.films[filmId];
  const musicUrls = data.music[filmId] || [];

  return (
    <div class="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      {/* Title & Poster */}
      <div class="w-full max-w-4xl text-center mb-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        <a href={`/films/${film.id}`} key={film.id} className="text-amber-400 hover:underline">
          {film.title}
        </a>
        {" - الموسيقى التصويرية"}
      </h1>
        <img
          src={film.poster_url || "/placeholder.webp"}
          alt={film.title}
          class="w-72 sm:w-96 mx-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Tracks Section */}
      <div class="w-full max-w-4xl space-y-6">
        {musicUrls.length > 0 ? (
          musicUrls.map((url, index) => (
            <div
              key={index}
              class="p-4 sm:p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 hover:ring-2 hover:ring-blue-400 transition"
            >
              <h2 class="text-lg sm:text-xl font-semibold mb-3 text-gray-200">
                🎵 المقطع {index + 1}
              </h2>
              <AudioPlayer
                src={url}
                className="rounded-lg overflow-hidden"
              />
            </div>
          ))
        ) : (
          <p class="text-gray-400 text-center text-lg">
            لا توجد موسيقى متاحة لهذا الفيلم.
          </p>
        )}
      </div>
    </div>
  );
}
