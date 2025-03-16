import { ComponentChildren } from "preact";

interface HeroProps {
    image?: string;
    title?: string;
    children?: ComponentChildren;
}

const Hero = ({ image, title, children }: HeroProps) => {
    const buttons = [
        { href: "/directors", label: "المخرجين", bg: "/directors.webp" },
        { href: "/films", label: "الأفلام", bg: "/films.webp" },
        { href: "/music", label: "موسيقى تصويرية", bg: "/music.webp" },
        { href: "/posters", label: "الأفيشات", bg: "/posters.webp" },
    ];

    return (
        <section
            class="relative w-full h-[70vh] bg-cover bg-center flex flex-col items-center justify-center text-center px-2"
            style={{ backgroundImage: `url(${image})` }}
        >
            {/* Overlay */}
            <div class="absolute inset-0 bg-black opacity-50"></div> 

            {/* Content */}
            <div class="relative z-10 text-white px-2 py-3 max-w-[95%] w-full">
                <h1 class="font-bold mb-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                    {title || "Cinema Black Archive"}
                </h1>

                {/* Children (e.g., Search Bar) */}
                {children && <div class="flex mt-3 justify-center">{children}</div>}

                {/* Scrollable Button Carousel */}
                <div class="relative w-full max-w-4xl mt-5">
                    <div 
                        class="flex gap-4 px-4 py-2 bg-black/50 rounded-lg shadow-lg overflow-x-auto scrollbar-thin 
                               scrollbar-thumb-gray-700 scrollbar-track-gray-900 sm:justify-center"
                        style={{ scrollSnapType: "x mandatory" }}
                    >
                        {buttons.map((button) => (
                            <a
                                key={button.href}
                                href={button.href}
                                class="relative min-w-[140px] sm:min-w-[180px] md:min-w-[220px] h-[90px] sm:h-[110px] md:h-[130px] rounded-lg overflow-hidden shadow-lg group snap-center"
                            >
                                {/* Background Image */}
                                <div
                                    class="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:brightness-110"
                                    style={{ backgroundImage: `url(${button.bg})` }}
                                ></div>

                                {/* Dark Overlay */}
                                <div class="absolute inset-0 bg-black opacity-50 group-hover:opacity-30 transition"></div>

                                {/* Text */}
                                <span class="absolute inset-0 flex items-center justify-center text-white font-bold text-lg md:text-xl">
                                    {button.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
