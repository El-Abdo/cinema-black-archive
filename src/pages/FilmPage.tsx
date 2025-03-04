import { useState, useEffect, useContext } from "preact/hooks";
import { supabase } from "../utils/supabase";
import { useLocation } from "preact-iso";
import { DataContext } from "../context/DataContext";
import NotFound from "./NotFound";

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
  if (!data) return null;
  const film = data.films[filmId];
  if (!film) return <NotFound />;

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

  return (
    <div class="p-4 sm:p-6 max-w-screen-xl mx-auto bg-black">
      
      {/* Film Header */}
      <div class="flex flex-col lg:flex-row items-start gap-6">
        {/* Film Poster */}
        {film.poster_url? <img 
          src={film.poster_url} 
          alt={film.title} 
          class="w-full sm:w-60 md:w-80 object-cover rounded-lg shadow-lg"
        /> : <div class="w-60 h-80 bg-gray-300 rounded-lg shadow-lg"></div>}
  
        {/* Film Info */}
        <div class="flex-1 text-right text-gray-300">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold">{film.title}</h1>
          <p class="text-gray-600 mt-4 lg:text-2xl">{film.description}</p>
        </div>
      </div>
  
      {/* Film Photography Section */}
      <h2 class="mt-10 text-lg sm:text-xl md:text-2xl font-semibold text-right text-gray-400">فوتوغرافيا الفيلم</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {frames.map((frame) => (
          <a 
            key={frame.url} 
            href={frame.url} 
            target="_blank" 
            rel="noopener noreferrer"
            class="block transform transition duration-300 hover:scale-105"
          >
            <img 
              src={frame.url} 
              alt="Frame" 
              class="w-full h-auto object-cover rounded-md shadow-md"
            />
          </a>
        ))}
      </div>
  
      {/* BTS Section (Only if images exist) */}
      {btsImages.length > 0 && (
        <>
          <h2 class="mt-10 text-lg sm:text-xl md:text-2xl font-semibold text-right text-gray-400">كواليس</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {btsImages.map((image) => (
              <a 
                key={image.url} 
                href={image.url} 
                target="_blank" 
                rel="noopener noreferrer"
                class="block transform transition duration-300 hover:scale-105"
              >
                <img 
                  src={image.url} 
                  alt="BTS" 
                  class="w-full h-auto object-cover rounded-md shadow-md"
                />
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );  
  
}
