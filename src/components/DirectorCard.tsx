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
      <div class="w-38 sm:w-56 md:w-60 lg:w-64 h-80 sm:h-96 md:h-[26rem] lg:h-[28rem] rounded-lg shadow-md hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 bg-gray-900 flex flex-col mx-auto">
        <img 
          src={director.portrait_url || "/Portrait_Placeholder.png"} 
          alt={director.name} 
          class="w-full h-80 object-cover rounded-t-lg"
        />
          <div class="flex-grow flex flex-col justify-center items-center p-3">
          <h3 class="text-lg font-bold text-white text-center truncate max-w-full">
            {director.name}
          </h3>
  
          {/* Ensure Bio Doesn't Overflow */}
          <p class="text-sm text-gray-400 text-center break-words overflow-hidden text-ellipsis max-h-16">
            {truncateText(director.bio, 15)}
          </p>
        </div>
      </div>
    );
  }
  