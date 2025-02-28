interface DirectorProps {
    director: {
      id: number;
      name: string;
      bio: string;
      portrait_url: string;
      filmIds: number[];
    };
  }
  const truncateText = (text: string, wordLimit: number = 20) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };
  
  
  export default function DirectorCard({ director }: DirectorProps) {
    return (
      <div class="bg-white rounded-lg shadow-md hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50">
        <img src={director.portrait_url || "/Portrait_Placeholder.png"} alt={director.name} class="w-full h-86 object-cover rounded-md" />
        <h3 class="text-lg font-bold mt-3 text-center">{director.name}</h3>
        <p class="text-sm text-stone-100 text-center">{truncateText(director.bio)}
        </p>
      </div>
    );
  }
  
  