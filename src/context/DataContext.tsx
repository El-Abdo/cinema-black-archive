import { createContext } from "preact";
import { useState, useEffect } from "preact/hooks";
import { supabase } from "../utils/supabase";

interface Director {
  id: number;
  name: string;
  bio: string;
  portrait_url: string;
  filmIds: number[];
}

interface Film {
  id: number;
  director_id: number;
  title: string;
  description: string;
  release_year: number;
  poster_url: string;
}

interface DataContextType {
  directors: Record<number, Director>;
  films: Record<number, Film>;
  music: Record<number, string[]>;
}

export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: preact.ComponentChildren }) {
  const [data, setData] = useState<DataContextType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data: directorsData } = await supabase.from("directors").select("id, name, bio");
      const { data: filmsData } = await supabase.from("films").select("id, title, description, release_year, director_id");
      const { data: portraitsData } = await supabase.from("director_portraits").select("director_id, portrait_url");
      const { data: postersData } = await supabase.from("film_posters").select("film_id, poster_url");
      const { data: musicData } = await supabase.from("music").select("film_id, music_url");

      // Organize portraits
      const directorPortraits: Record<number, string> = {};
      portraitsData?.forEach(({ director_id, portrait_url }) => {
        if (!directorPortraits[director_id]) {
          directorPortraits[director_id] = portrait_url;
        }
      });

      // Organize posters
      const filmPosters: Record<number, string> = {};
      postersData?.forEach(({ film_id, poster_url }) => {
        if (!filmPosters[film_id]) {
          filmPosters[film_id] = poster_url;
        }
      });

      // Organize music data
      const music: Record<number, string[]> = {};
      musicData?.forEach(({ film_id, music_url }) => {
        if (!music[film_id]) {
          music[film_id] = [];
        }
        music[film_id].push(music_url);
      });

      // Create director and film records
      const directors: Record<number, Director> = {};
      const films: Record<number, Film> = {};

      directorsData?.forEach((d) => {
        directors[d.id] = {
          ...d,
          portrait_url: directorPortraits[d.id] || "",
          filmIds: [], // Store only film IDs
        };
      });

      filmsData?.forEach((f) => {
        const film = {
          ...f,
          poster_url: filmPosters[f.id] || "",
        };
        films[f.id] = film;

        if (directors[f.director_id]) {
          directors[f.director_id].filmIds.push(f.id); // Store only film ID
        }
      });

      setData({ directors, films, music });
    }

    fetchData();
  }, []);

  if (!data) return (
    <div class = "bg-black">
          <p class = "text-right text-gray-500">جار التحميل...</p>
    </div>
  );

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
