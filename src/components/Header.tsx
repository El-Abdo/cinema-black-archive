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
                    breadcrumbs.unshift({ name: "المخرجين", url: "/directors" });
                }
            }
        } else if (part === "directors") {
            breadcrumbs.push({ name: "المخرجين", url: "/directors" });
        }
    });

    return (
        <header class="bg-black sticky top-0 w-full z-50">
          <div class="container mx-auto flex items-center justify-between p-4 sm:p-6">            
            <nav class="text-xs sm:text-sm md:text-base flex flex-wrap items-center gap-2 rtl flex-row-reverse text-amber-400">
              <a href="/" class="hover:underline whitespace-nowrap">الصفحة الرئيسية</a>
              {breadcrumbs.map((crumb, index) => (
                <span key={index} class="flex items-center">
                  {index < breadcrumbs.length - 1 ? (
                    <a href={crumb.url} class="hover:underline whitespace-nowrap">{crumb.name}</a>
                  ) : (
                    <span class="text-gray-300 whitespace-nowrap">{crumb.name}</span>
                  )}
                  {index < breadcrumbs.length  && <span class="text-white mx-1">/</span>}
                </span>
              ))}
            </nav>
            
            <span class="flex-shrink-0">
              <img src="/IMG_6062.ico" alt="Icon" class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
            </span>
          </div>
        </header>
      );
      
};

export default Header;
