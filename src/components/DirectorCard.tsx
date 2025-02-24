interface DirectorProps {
    director: {
      id: number;
      name: string;
      bio: string;
      portrait_url: string;
      films: { id: number; title: string; release_year: number; poster_url: string}[];
    };
  }


  const truncateText = (text: string, wordLimit: number = 20) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };
  
  
  export default function DirectorCard({ director }: DirectorProps) {
    return (
      <div class="bg-white rounded-lg shadow-md hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50">
        <img src={director.portrait_url || "/placeholder.jpg"} alt={director.name} class="w-full h-86 object-cover rounded-md" />
        <h3 class="text-lg font-bold mt-3">{director.name}</h3>
        <p class="text-sm text-gray-300"><p>{truncateText(director.bio)}</p>
        </p>
      </div>
    );
  }
  
  