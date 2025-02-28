import { useLocation } from 'preact-iso';
import { useContext } from 'preact/hooks';
import { DataContext } from '../context/DataContext';

const Header = () => {
    const location = useLocation();
    const data = useContext(DataContext);
    if (!data) return null;

    const films = data.films || {};
    const directors = data.directors || {};
    const pathParts = location.path.split('/').filter(Boolean);

    const breadcrumbs: { name: string; url: string }[] = [];
    let currentPath = "/";

    pathParts.forEach((part, index) => {
        currentPath += part + "/";
        
        const id = parseInt(part, 10);
        const prevPart = pathParts[index - 1];

        if (!isNaN(id)) {
            if (prevPart === "directors" && directors[id]) {
                breadcrumbs.push({ name: directors[id].name, url: `/directors/${id}` });
            } else if (prevPart === "films" && films[id]) {
                breadcrumbs.push({ name: films[id].title, url: `/films/${films[id].title.replace(/\s+/g, "-")}` });

                const director = directors[films[id].director_id];
                if (director) {
                    breadcrumbs.unshift({ name: director.name, url: `/directors/${films[id].director_id}` });
                }
            }
        }
    });

    return (
        <header class="bg-black sticky top-0 w-full z-50">
            <div class="container mx-auto flex items-center justify-between">
                <span class="mr-2">
                    <img src="/IMG_6062.ico" alt="Icon" class="w-20 h-20" />
                </span>
                <nav class="text-sm md:text-base flex items-center space-x-2 rtl flex-row-reverse">
                    <a href="/" class="text-amber-400 hover:underline">الصفحة الرئيسية</a> 
                    {breadcrumbs.map((crumb, index) => (
                        <span key={index} class="flex items-center">
                            {index < breadcrumbs.length - 1 ? (
                                <a href={crumb.url} class="text-amber-400 hover:underline">{crumb.name}</a>
                            ) : (
                                <span class="text-gray-300">{crumb.name}</span>
                            )}
                            {index < breadcrumbs.length && <span class="text-white">/</span>}
                        </span>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
