import { useRef, useState } from "preact/hooks";
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

  const audioRefs = useRef<Array<AudioPlayer | null>>([]);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);

  const handlePlay = (index: number) => {
    if (currentPlayingIndex !== null && audioRefs.current[currentPlayingIndex]) {
      audioRefs.current[currentPlayingIndex]?.audio.current?.pause();
    }
    setCurrentPlayingIndex(index);
  };

  return (
    <div class="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      {/* Title & Poster */}
      <div class="w-full max-w-4xl text-center mb-8">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          <a href={`/films/${film.id}`} key={film.id} class="text-amber-400 hover:underline">
            {film.title}
          </a>
          {" - الموسيقى التصويرية"}
        </h1>
        <img
          src={film.poster_urls[0] || "/placeholder.webp"}
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
              class="p-4 sm:p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 hover:ring-2 hover:ring-blue-400 transition w-full flex flex-col gap-4"
            >
              {/* Track Title */}
              <h2 class="text-lg sm:text-xl font-semibold text-gray-200">
                🎵 المقطع {index + 1}
              </h2>

              {/* Audio Player & Download Button */}
              <div class="flex flex-col sm:flex-row items-center gap-4 w-full flex-1 rounded-lg overflow-hidden">
                {/* Audio Player - Full width on all screens */}
                <AudioPlayer
                  ref={(el) => (audioRefs.current[index] = el)}
                  src={url}
                  onPlay={() => handlePlay(index)}
                />

                {/* Download Button */}
                <a
                  href={url}
                  download
                  class="bg-green-500 hover:bg-amber-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 flex items-center justify-center w-full sm:w-auto"
                >
                  ⬇️ تحميل
                </a>
              </div>
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
