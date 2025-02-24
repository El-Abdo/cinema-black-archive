import { useContext } from "preact/hooks";
import { useLocation } from 'preact-iso';
import { DataContext } from "../context/DataContext";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function FilmMusicPage() {
    const location = useLocation();
    const filmId = parseInt(location.path.split("/").pop() || "0", 10);
    const data = useContext(DataContext);
    if (!data) {
        return <p>Loading...</p>;
    }
    const film = data.films[Number(filmId)];
    const musicUrls = data.music[Number(filmId)] || [];

    return (
        <div className="bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-4">{film.title} - Soundtrack</h1>
            <img src={film.poster_url} alt={film.title} class="w-full object-cover rounded-lg mb-6" />
                <div className="space-y-6">
                {musicUrls.map((url, index) => (
                    <div key={index} class="p-6 border border-gray-700 rounded-lg shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">Track {index + 1}</h2>
                        <AudioPlayer
                            src={url}
                            className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl"
                        />
                    </div>
                ))}
                </div>
        </div>
    );
}
