import { Router } from "preact-router";
import Home from "./pages/Home";
import DirectorPage from "./pages/DirectorPage";

export default function Routes() {
  return (
    <Router>
      <Home path="/" />
      <DirectorPage path="/director/:id" />
    </Router>
  );
}
