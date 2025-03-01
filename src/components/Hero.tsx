interface HeroProps {
    image?: string;
    title?: string;
}

const Hero = ({ image, title }: HeroProps) => {
    return (
        <section
            class="relative w-full h-[400px] bg-cover bg-center flex flex-col justify-center items-center"
            style={{ backgroundImage: `url(${image || '/default-bg.jpg'})` }}
        >
            <div class="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
            
            <div class="relative z-10 text-center text-white px-4">
                <h1 class="text-sm sm:text-xl md:text-3xl font-bold mb-6">{title || 'Cinema Black Archive'}</h1>
                
                <div class="flex flex-wrap justify-center gap-4">
                    <a href="/directors" class="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
                        المخرجين
                    </a>
                    <a href="/films" class="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300">
                        الأفلام
                    </a>
                    <a href="/music" class="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
                        موسيقى تصويرية
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
