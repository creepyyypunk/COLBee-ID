export default function Header() {
  return (
    <header className="bg-gradient-to-r from-honey-400 to-honey-600 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center flex items-center justify-center gap-3">
          <span>🐝</span>
          <span>COLBee ID Generator</span>
          <span>🐝</span>
        </h1>
        <p className="text-honey-100 text-center mt-2">
          Create your personalized COLBee community member card
        </p>
      </div>
    </header>
  );
}
