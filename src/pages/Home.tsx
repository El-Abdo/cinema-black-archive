import { useContext } from 'preact/hooks';
import { DataContext } from '../context/DataContext';
import Search from '../components/Search';

export default function Home() {
  const data = useContext(DataContext); 
  
  if (!data) return <p>Loading...</p>;  

  const { directors } = data; 

  return (
    <div>
      <h1>Directors Archive</h1>
      <Search /> 
      <div className="directors-list">
        {Object.values(directors).slice(9, 29).map((director) => (
          <div key={director.id}>
            <a href={`/director/${director.id}`}>
              <img src={director.portrait_url} alt={director.name} width="150" />
              <h2>{director.name}</h2>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
