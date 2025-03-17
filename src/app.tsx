import { Router, Route, LocationProvider, ErrorBoundary } from "preact-iso";
import Home from "./pages/Home";
import DirectorPage from "./pages/DirectorPage";
import FilmPage from "./pages/FilmPage";
import NotFound from "./pages/NotFound";
import MusicPage from "./pages/MusicPage";
import FilmMusicPage from "./pages/FilmMusic";
import Header from './components/Header';
import DirectorsPage from "./pages/DirectorsPage";
import FilmsPage from "./pages/FilmsPage";
import PosterPage from "./pages/PosterPage";
import PostersPage from "./pages/PostersPage";
import About from "./pages/AboutPage";

export default function App() {
  
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Header />
          <Router>
            <Route path="/" component={Home} />
            <Route path="/directors" component={DirectorsPage} />
            <Route path="/directors/:id" component={DirectorPage} />
            <Route path="/films" component={FilmsPage} />
            <Route path="/films/:id" component={FilmPage} />
            <Route path="/music" component={MusicPage} />
            <Route path="/music/:id" component={FilmMusicPage} />
            <Route path="/posters" component={PostersPage} />
            <Route path="/about" component={About} />
            <Route path="/posters/:id" component={PosterPage} />
            <Route default component={NotFound} />
          </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

