import { useContext } from "preact/hooks";
import { useLocation } from 'preact-iso';
import { DataContext } from "../context/DataContext";

export default function FilmMusicPage() {
    const location = useLocation();
    const filmId = parseInt(location.path.split("/").pop() || "0", 10);
    const data = useContext(DataContext);
    if (!data) {
        return <p>Loading...</p>;
    }
    const film = data.films[Number(filmId)];
    const musicUrls = data.music[Number(filmId)] || [];

    if (!film) {
        return <p>Film not found.</p>;
    }

    if (!musicUrls) {
        return <p>urls not found.</p>;
    }


    return (
        <div class="p-4">
            <h1 class="text-2xl font-bold">{film.title} - Soundtrack</h1>
            <img src={film.poster_url} alt={film.title} class="w-full h-64 object-cover rounded-md mb-4" />
            {musicUrls.length === 0 ? (
                <p>No music available for this film.</p>
            ) : (
                <div class="space-y-4">
                {musicUrls.map((url, index) => (
                    <div key={index} class="p-4 border rounded-lg shadow-md">
                    <h2 class="text-lg font-semibold">Track {index + 1}</h2>
                    <audio controls class="w-full">
                        <source src={url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
}