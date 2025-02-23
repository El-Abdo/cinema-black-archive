import { useContext } from "preact/hooks";
import { DataContext } from "../context/DataContext";
import DirectorCard from "../components/DirectorCard";
import NotFound from "./NotFound";

export default function DirectorPage(props: { id: number }) {
  const data = useContext(DataContext);
  if (!data) return <p>Loading...</p>;

  const director = data.directors[props.id];
  if (!director) return <NotFound/>;

  return (
    <div>
      <DirectorCard director={director} />
    </div>
  );
}

