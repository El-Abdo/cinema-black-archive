import { useContext } from 'preact/hooks';
import { DataContext } from '../context/DataContext';
import Search from '../components/Search';
import DirectorCard from '../components/DirectorCard';

export default function Home() {
  const data = useContext(DataContext); 
  
  if (!data) return <p>Loading...</p>;  

  const { directors } = data; 

  return (
    <div>
      <Search /> 
      <div className="directors-list">
        {Object.values(directors).slice(9, 29).map((director) => (
            <a href={`/directors/${director.id}`}>
              <DirectorCard director={director} />
            </a>
        ))}
      </div>
    </div>
  );
}
