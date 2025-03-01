
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
                <h1 class="text-sm sm:text-xl md:text-3xl font-bold mb-4">{title || 'Cinema Black Archive'}</h1>
                
                <div class="mb-6">
                    <a href="/music" class="text-golden-500 hover:underline mx-4 text-xl">Music</a>
                    <a href="/directors" class="text-golden-500 hover:underline mx-4 text-xl">Directors</a>
                </div>

            </div>
        </section>
    );
};

export default Hero;
