import { useState, useEffect, useContext } from "preact/hooks";
import { supabase } from "../utils/supabase";
import { useLocation } from "preact-iso";
import { DataContext } from "../context/DataContext";

interface Image {
  url: string;
}

export default function FilmPage() {
  const location = useLocation();
  const filmId = parseInt(location.path.split("/").pop() || "0", 10);
  const data = useContext(DataContext);

  const [frames, setFrames] = useState<Image[]>([]);
  const [btsImages, setBtsImages] = useState<Image[]>([]);

  // Get film details from context
  const film = data.films[filmId];

  useEffect(() => {
    async function fetchImages() {
      const { data: framesData } = await supabase
        .from("frames")
        .select("frame_url")
        .eq("film_id", filmId);
      setFrames((framesData || []).map((item: { frame_url: string }) => ({ url: item.frame_url })));

      const { data: btsData } = await supabase
        .from("backstage")
        .select("bts_url")
        .eq("film_id", filmId);
      setBtsImages((btsData || []).map((item: { bts_url: string }) => ({ url: item.bts_url })));
    }
    fetchImages();
  }, [filmId]);

  const isLoading = !film;

  return (
    <div class="p-4 sm:p-6 max-w-screen-xl mx-auto">
      {/* Film Header */}
      <div class="flex flex-col lg:flex-row items-start gap-6">
        {/* Film Poster */}
        <div class="w-full sm:w-60 md:w-80 aspect-[2/3] bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {isLoading ? (
            <div class="w-full h-full bg-gray-300 animate-pulse"></div>
          ) : (
            film.poster_urls && (
              <img
                src={film.poster_urls[0]}
                alt={film.title}
                class="w-full h-full object-cover"
                width="320" height="480"
              />
            )
          )}
        </div>

        {/* Film Info */}
        <div class="flex-1 text-right text-gray-300">
          {isLoading ? (
            <>
              <div class="h-8 w-3/4 sm:w-1/2 bg-gray-300 animate-pulse mb-4"></div>
              <div class="h-6 w-5/6 sm:w-2/3 bg-gray-300 animate-pulse"></div>
            </>
          ) : (
            <>
              <h1 class="text-xl sm:text-2xl md:text-3xl font-bold">{film.title}</h1>
              <p class="text-gray-400 mt-4 lg:text-2xl">{film.description}</p>
            </>
          )}
        </div>
      </div>

      {/* Film Photography Section */}
      <h2 class="mt-10 text-lg sm:text-xl md:text-2xl font-semibold text-right text-gray-400">فوتوغرافيا الفيلم</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {isLoading
          ? Array(8).fill(0).map((_, index) => (
              <div key={index} class="w-full aspect-video bg-gray-800 rounded-md shadow-md overflow-hidden">
                <div class="w-full h-full bg-gray-300 animate-pulse"></div>
              </div>
            ))
          : frames.map((frame) => (
              <a
                key={frame.url}
                href={frame.url}
                target="_blank"
                rel="noopener noreferrer"
                class="block transform transition duration-300 hover:scale-105"
              >
                <div class="w-full aspect-video bg-gray-800 rounded-md shadow-md overflow-hidden">
                  <img
                    src={frame.url}
                    alt="Frame"
                    class="w-full h-full object-cover"
                    width="400" height="225"
                  />
                </div>
              </a>
            ))
        }
      </div>

      {/* BTS Section (Only if images exist) */}
      {btsImages.length > 0 && (
        <>
          <h2 class="mt-10 text-lg sm:text-xl md:text-2xl font-semibold text-right text-gray-400">كواليس</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {isLoading
              ? Array(4).fill(0).map((_, index) => (
                  <div key={index} class="w-full aspect-video bg-gray-800 rounded-md shadow-md overflow-hidden">
                    <div class="w-full h-full bg-gray-300 animate-pulse"></div>
                  </div>
                ))
              : btsImages.map((image) => (
                  <a
                    key={image.url}
                    href={image.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block transform transition duration-300 hover:scale-105"
                  >
                    <div class="w-full aspect-video bg-gray-800 rounded-md shadow-md overflow-hidden">
                      <img
                        src={image.url}
                        alt="BTS"
                        class="w-full h-full object-cover"
                        width="400" height="225"
                      />
                    </div>
                  </a>
                ))
            }
          </div>
        </>
      )}
    </div>
  );
}
