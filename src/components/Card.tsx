interface CardProps {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    placeholderImage: string;
    description?: string;
  }
  const truncateText = (text: string, wordLimit: number = 10) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };
  export default function Card({ title, subtitle, imageUrl, placeholderImage, description }: CardProps) {
    return (
      <div class="w-[12rem] sm:w-[15rem] xl:w-[17rem] max-w-xs border border-gray-700 p-4 rounded-lg shadow-lg bg-gray-900 flex flex-col h-[28rem] sm:h-[30rem]">
        <img 
          src={imageUrl || placeholderImage} 
          alt={title} 
          class="w-full h-[70%] object-cover rounded-md"
        />
        <div class="flex flex-col justify-center items-center p-3 flex-grow">
          <h3 class="text-lg font-bold text-white text-center truncate max-w-full mb-auto">
            {title}
          </h3>
          {subtitle && <p class="text-sm text-gray-400 text-center mb-auto">{subtitle}</p>}
          {description && (
            <p class="text-sm text-gray-400 text-center break-words overflow-hidden text-ellipsis min-h-[48px] max-h-[64px] mb-auto">
              {truncateText(description, 15)}
            </p>
          )}
        </div>
      </div>
    );
  }
  