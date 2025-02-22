import { Router, Route, LocationProvider, ErrorBoundary } from "preact-iso";
import Home from "./pages/Home";
import DirectorPage from "./pages/DirectorPage";
import FilmPage from "./pages/FilmPage";
import NotFound from "./pages/NotFound";
import MusicPage from "./pages/MusicPage";
import FilmMusicPage from "./pages/FilmMusic";

export default function App() {
  
  return (
    <LocationProvider>
      <ErrorBoundary>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/director/:id" component={DirectorPage} />
            <Route path="/film/:id" component={FilmPage} />
            <Route path="/music" component={MusicPage} />
            <Route path="/music/:id" component={FilmMusicPage} />
            <Route default component={NotFound} />
          </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

