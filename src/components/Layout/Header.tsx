export default function Header() {
  return (
    <header className="bg-gradient-to-r from-honey-400 to-honey-600 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center flex items-center justify-center gap-3">
          <img src="/images/love_bee.webp" alt="LoveBee" className="w-8 h-8 md:w-10 md:h-10" />
          <span>COLBee ID Generator</span>
          <img src="/images/love_bee.webp" alt="LoveBee" className="w-8 h-8 md:w-10 md:h-10" />
        </h1>
        <p className="text-honey-100 text-center mt-2">
          Create your personalized COLB community member card
        </p>
      </div>
    </header>
  );
}
