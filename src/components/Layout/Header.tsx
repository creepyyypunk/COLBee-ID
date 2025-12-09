export default function Header() {
  return (
    <header className="bg-white border-b border-honey-200 relative z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-2.5">
          <img src="/images/colb_black.webp" alt="LoveBee" className="w-7 h-7 md:w-8 md:h-8" />
          <h1 className="text-2xl md:text-3xl font-display font-bold text-bee-black tracking-tight">
            COLBee ID
          </h1>
        </div>
      </div>
    </header>
  );
}
