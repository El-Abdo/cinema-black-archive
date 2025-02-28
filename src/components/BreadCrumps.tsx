import { useLocation } from 'preact-iso';
import { useContext } from 'preact/hooks';
import { DataContext } from '../context/DataContext';

const Breadcrumbs = () => {
    const location = useLocation();
    const data = useContext(DataContext);
    const films = data?.films || {};
    const directors = data?.directors || {};
    const pathParts = location.path.split('/').filter(Boolean);
 
    const getDynamicContent = (part: string, type: string) => {
        // Check if part is a number (i.e., an ID).
        const id = parseInt(part, 10);
        if (isNaN(id)) {
            return part;  // Not an ID, so just return the part as text (e.g., "directors" or "films").
        }
    
        // If it's a valid ID, return the corresponding director or film
        if (type === 'director') {
            return directors[id]?.name || 'Director'; // Look up director by ID
        }
        if (type === 'film') {
            return films[id]?.title || 'Film'; // Look up film by ID
        }
        return "?";  // Fallback
    };
    

    return (
        <nav class="flex items-center space-x-2">
            <a href="/" class="text-blue-500">Home</a>
            {pathParts.map((part, index) => {
                let linkText = part;
                let linkUrl = '/' + pathParts.slice(0, index + 1).join('/');
                
                // When 'directors' or 'films' is encountered, link to a general page
                if (index === 1 && part === 'directors') {
                    linkText = 'Directors';
                    linkUrl = '/directors';  // Link to all directors page
                } else if (pathParts[index - 1] === 'directors') {
                    // If the previous part is 'directors', get the director's name by ID
                    linkText = getDynamicContent(part, 'director');
                } else if (pathParts[index - 1] === 'films') {
                    // If the previous part is 'films', get the film title by ID
                    linkText = getDynamicContent(part, 'film');
                }
    
                return (
                    <span key={index} class="flex items-center">
                        {index < pathParts.length - 1 ? (
                            <a href={linkUrl} class="text-blue-500 hover:text-blue-700">{linkText}</a>
                        ) : (
                            <span class="text-gray-500">{linkText}</span> // Last part, not a link
                        )}
                        {index < pathParts.length - 1 && <span class="text-gray-500">/</span>}
                    </span>
                );
            })}
        </nav>
    );
    
};

export default Breadcrumbs;
