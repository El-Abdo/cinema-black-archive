interface DirectorProps {
    director: {
      id: number;
      name: string;
      bio: string;
      portrait_url: string;
      filmIds: number[];
    };
  }
  const truncateText = (text: string, wordLimit: number = 10) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };
  
  
  export default function DirectorCard({ director }: DirectorProps) {
    return (
      <div class="w-[10rem] sm:w-[15rem] max-w-xs border border-gray-700 p-4 rounded-lg shadow-lg bg-gray-900 flex flex-col h-80 sm:h-96 md:h-[26rem]">
        <img 
          src={director.portrait_url || "/Portrait_Placeholder.png"} 
          alt={director.name} 
          class="w-full h-48 sm:h-56 md:h-64 object-cover rounded-md"
        />
        <div class="flex-grow flex flex-col justify-center items-center p-3">
          <h3 class="text-lg font-bold text-white text-center truncate max-w-full">
            {director.name}
          </h3>
  
          {/* Ensure Bio Doesn't Overflow & Has a Fixed Height */}
          <p class="text-sm text-gray-400 text-center break-words overflow-hidden text-ellipsis min-h-[48px]">
            {truncateText(director.bio, 15)}
          </p>
        </div>
      </div>
    );
  }
  