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
  if (!data) return <p>Loading...</p>;
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
    <div class="film-container">
      <div class="film-header">
        <img src={film.poster_url} alt={film.title} class="film-poster" />
        <div>
          <h1>{film.title}</h1>
          <p>{film.description}</p>
        </div>
      </div>

      <h2>Film Frames</h2>
      <div class="grid">
        {frames.map((frame) => (
          <img src={frame.url} alt="Frame" class="film-frame" />
        ))}
      </div>

      {btsImages.length > 0 && (
        <>
          <h2>Behind The Scenes</h2>
          <div class="grid">
            {btsImages.map((image) => (
              <img src={image.url} alt="BTS" class="bts-image" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
