import { Router, Route, LocationProvider, ErrorBoundary } from "preact-iso";
import { useLocation } from 'preact-iso';
import Home from "./pages/Home";
import DirectorPage from "./pages/DirectorPage";
import FilmPage from "./pages/FilmPage";
import NotFound from "./pages/NotFound";

export default function App() {
  const location = useLocation();
  const pathname = location.url;
  console.log(`Current URL: ${pathname}`);
  return (
    <LocationProvider>
      <ErrorBoundary>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/director/:id" component={DirectorPage} />
            <Route path="/film/:id" component={FilmPage} />
            <Route default component={NotFound} />
          </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

