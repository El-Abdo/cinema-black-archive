// components/Search.tsx
import { useState, useContext } from "preact/hooks";
import { DataContext } from "../context/DataContext";

export default function Search() {
  const context = useContext(DataContext);

  // If context is null, we just return null or render nothing.
  if (!context) return null;

  const { directors, films } = context;
  const [query, setQuery] = useState("");

  const directorResults = query
    ? Object.values(directors).filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filmResults = query
    ? Object.values(films).filter((f) =>
        f.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div class="search-container">
      <input
        type="text"
        placeholder="Search directors or films..."
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
      />
      <div class="search-results">
        {directorResults.length > 0 && (
          <div class="search-section">
            <h3>Directors</h3>
            <ul>
              {directorResults.map((d) => (
                <li key={d.id}>
                  <a href={`/director/${d.id}`}>{d.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {filmResults.length > 0 && (
          <div class="search-section">
            <h3>Films</h3>
            <ul>
              {filmResults.map((f) => (
                <li key={f.id}>
                  <a href={`/film/${f.id}`}>{f.title}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
