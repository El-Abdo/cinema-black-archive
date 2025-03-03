import { useLocation } from "preact-iso";
import { useContext, useEffect, useState } from "preact/hooks";
import { DataContext } from "../context/DataContext";

const Header = () => {
    const location = useLocation();
    const data = useContext(DataContext);
    const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; url: string }[]>([]);
    
    if (!data) return null;
    
    const films = data.films || {};
    const directors = data.directors || {};
    
    // Track navigation and update breadcrumbs immediately
    useEffect(() => {
        const currentPath = location.path;
        
        // Update navigation history first
        if (currentPath !== sessionStorage.getItem("currentPath")) {
            const referrer = sessionStorage.getItem("currentPath") || "";
            sessionStorage.setItem("previousPath", referrer);
            sessionStorage.setItem("currentPath", currentPath);
        }
        
        // Generate breadcrumbs with the updated history
        setBreadcrumbs(generateBreadcrumbs(currentPath));
    }, [location.path, data]);
    
    const generateBreadcrumbs = (currentPath: string) => {
        const result = [{ name: "الصفحة الرئيسية", url: "/" }];
        const pathParts = currentPath.split("/").filter(Boolean);
        const previousPath = sessionStorage.getItem("previousPath") || "";
        
        // Check if we're on a film page and came from a director page
        if (pathParts[0] === "films" && pathParts.length > 1) {
            const filmId = parseInt(pathParts[1], 10);
            const film = films[filmId];
            
            // Check if we came from a director page
            const directorMatch = previousPath.match(/^\/directors\/(\d+)/);
            if (directorMatch && previousPath.includes("/directors/")) {
                const directorId = parseInt(directorMatch[1], 10);
                const director = directors[directorId];
                
                if (director) {
                    result.push({ name: "المخرجين", url: "/directors" });
                    result.push({ name: director.name, url: `/directors/${directorId}` });
                    if (film) {
                        result.push({ name: film.title, url: `/films/${filmId}` });
                    }
                    return result;
                }
            }
            
            // Standard film path if not from director
            result.push({ name: "الأفلام", url: "/films" });
            if (film) {
                result.push({ name: film.title, url: `/films/${filmId}` });
            }
            return result;
        }
        
        // Standard breadcrumb generation for other pages
        let builtPath = "";
        
        for (let i = 0; i < pathParts.length; i++) {
            const part = pathParts[i];
            builtPath += `/${part}`;
            
            if (part === "directors") {
                result.push({ name: "المخرجين", url: "/directors" });
            } else if (part === "films") {
                result.push({ name: "الأفلام", url: "/films" });
            }else if (part === "music") {
                result.push({ name: "موسيقى تصويرية", url: "/music" });
            } else {
                const id = parseInt(part, 10);
                if (!isNaN(id)) {
                    const prevPart = pathParts[i - 1];
                    
                    if (prevPart === "directors" && directors[id]) {
                        result.push({ name: directors[id].name, url: `/directors/${id}` });
                    } else if (prevPart === "films" && films[id]) {
                        result.push({ name: films[id].title, url: `/films/${id}` });
                    }
                }
            }
        }
        
        return result;
    };
    
    return (
        <header class="bg-black sticky top-0 w-full z-50">
            <div class="container mx-auto flex items-center justify-between">            
                <nav class="text-xs sm:text-sm md:text-base flex flex-wrap items-center gap-2 text-amber-400">
                    {breadcrumbs.map((crumb, index) => (
                        <span key={index} class="flex items-center">
                            {index < breadcrumbs.length - 1 ? (
                                <a href={crumb.url} class="hover:underline whitespace-nowrap">{crumb.name}</a>
                            ) : (
                                <span class="text-gray-300 whitespace-nowrap">{crumb.name}</span>
                            )}
                            {index < breadcrumbs.length - 1 && <span class="text-white mx-1">/</span>}
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