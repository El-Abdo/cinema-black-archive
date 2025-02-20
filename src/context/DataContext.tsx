import { createContext } from "preact";
import { useState, useEffect } from "preact/hooks";
import { supabase } from "../utils/supabase";

interface Director {
  id: number;
  name: string;
  bio: string;
  portrait_url: string;
  films: Film[];
}

interface Film {
  id: number;
  title: string;
  description: string;
  release_year: number;
  poster_url: string;
}

interface DataContextType {
  directors: Record<number, Director>;
  films: Record<number, Film>;
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

      // Organize portraits: Pick a random one per director
      const directorPortraits: Record<number, string> = {};
      if (portraitsData) {
        portraitsData.forEach(({ director_id, portrait_url }) => {
          if (!directorPortraits[director_id]) {
            directorPortraits[director_id] = portrait_url;
          }
        });
      }

      // Organize posters: Pick a random one per film
      const filmPosters: Record<number, string> = {};
      if (postersData) {
        postersData.forEach(({ film_id, poster_url }) => {
          if (!filmPosters[film_id]) {
            filmPosters[film_id] = poster_url;
          }
        });
      }

      // Map data into lookup objects
      const directors: Record<number, Director> = {};
      const films: Record<number, Film> = {};

      directorsData?.forEach((d) => {
        directors[d.id] = {
          ...d,
          portrait_url: directorPortraits[d.id] || "",
          films: [],
        };
      });

      filmsData?.forEach((f) => {
        const film = {
          ...f,
          poster_url: filmPosters[f.id] || "",
        };
        films[f.id] = film;
        if (directors[f.director_id]) {
          directors[f.director_id].films.push(film);
        }
      });

      setData({ directors, films });
    }

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
