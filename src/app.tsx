import { Router, Route, LocationProvider, ErrorBoundary } from "preact-iso";
import Home from "./pages/Home";
import DirectorPage from "./pages/DirectorPage";
import FilmPage from "./pages/FilmPage";
import NotFound from "./pages/NotFound";
import MusicPage from "./pages/MusicPage";
import FilmMusicPage from "./pages/FilmMusic";
import Header from './components/Header';
import DirectorsPage from "./pages/DirectorsPage";

export default function App() {
  
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Header />
          <Router>
            <Route path="/" component={Home} />
            <Route path="/directors/:id" component={DirectorPage} />
            <Route path="/directors" component={DirectorsPage} />
            <Route path="/films/:id" component={FilmPage} />
            <Route path="/music" component={MusicPage} />
            <Route path="/music/:id" component={FilmMusicPage} />
            <Route default component={NotFound} />
          </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

