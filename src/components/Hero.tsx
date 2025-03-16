import { ComponentChildren } from "preact";

interface HeroProps {
    image?: string;
    title?: string;
    children?: ComponentChildren;
}

const Hero = ({ image, title, children }: HeroProps) => {
    return (
        <section
            class={`relative w-full ${
                        title
                        ? "h-[70vh]"
                        : "h-[75vh]"
                    }  bg-cover bg-center flex flex-col items-center justify-center text-center px-2`}
            style={{ backgroundImage: `url(${image})` }}
        >
            {/* Overlay */}
            <div class="absolute inset-0 bg-black opacity-50"></div> 
            
            {/* Content */}
            <div class="relative z-10 text-white px-2 py-3 max-w-[95%] w-full">
                <h1
                    class={`font-bold mb-6 max-w-full px-4 ${
                        title
                        ? "text-xl sm:text-4xl md:text-4xl lg:text-7xl"
                        : "text-3xl sm:text-6xl md:text-6xl lg:text-8xl"
                    }`}
                    >
                    {title || "Cinema Black Archive"}
                </h1>

                {/* Children (e.g., Search Bar) */}
                {children && <div class="flex mt-3 justify-center">{children}</div>}

                {/* Buttons */}
                <div class="flex flex-wrap justify-center gap-2 mt-5 text-[15px] sm:text-xs md:text-lg">
                    <a href="/directors" class="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
                        المخرجين
                    </a>
                    <a href="/films" class="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
                        الأفلام
                    </a>
                    <a href="/music" class="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
                        موسيقى تصويرية
                    </a>
                    <a href="/posters" class="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
                        الأفيشات 
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
