import { useContext } from "preact/hooks";
import { DataContext } from "../context/DataContext";

export default function DirectorPage(props: { id: number }) {
  const data = useContext(DataContext);
  if (!data) return <p>Loading...</p>;

  const director = data.directors[props.id];
  if (!director) return <p>Director not found.</p>;

  return (
    <div>
      <img src={director.portrait_url} alt={director.name} />
      <h1>{director.name}</h1>
      <p>{director.bio}</p>

      <h2>Films</h2>
      {director.films.map((film) => (
        <div key={film.id}>
          <a href={`/film/${film.id}`} class="card-image">
            <img src={film.poster_url} alt={film.title} />
            <h3>{film.title} ({film.release_year})</h3>
          </a>
          <h4>سنة الصدور: {film.release_year}</h4>
        </div>
      ))}
    </div>
  );
}

