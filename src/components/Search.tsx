import { useState, useRef, useEffect } from "preact/hooks";

interface SearchProps<T> {
    data: T[];
    placeholder?: string;
    searchFields: (keyof T)[];
    getLink: (item: T) => string;
    getDisplayText: (item: T) => string;
}

export default function Search<T>({
    data,
    placeholder = "Search...",
    searchFields,
    getLink,
    getDisplayText,
}: SearchProps<T>) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const filteredResults = query
        ? data.filter((item) =>
              searchFields.some((field) =>
                  String(item[field]).toLowerCase().includes(query.toLowerCase())
              )
          )
        : [];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={searchRef} class="relative w-full max-w-md">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onInput={(e) => {
                    setQuery((e.target as HTMLInputElement).value);
                    setIsOpen(true);
                }}
                class="w-full p-2 rounded-md border border-gray-600 bg-gray-900 text-white text-sm focus:ring-2 focus:ring-blue-500"
            />
            {isOpen && filteredResults.length > 0 && (
                <div class="absolute z-50 bg-gray-800 text-white shadow-lg mt-1 w-full rounded-md max-h-60 overflow-auto border border-gray-600">
                    {filteredResults.map((item) => (
                        <a
                            key={getLink(item)}
                            href={getLink(item)}
                            class="block px-4 py-2 hover:bg-gray-700 transition"
                            onClick={() => setIsOpen(false)} // Close dropdown on selection
                        >
                            {getDisplayText(item)}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
