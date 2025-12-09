export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-honey-200 bg-white/50 backdrop-blur-sm py-8 mt-16 relative z-10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-honey-600 font-light">
          © {currentYear} Built by{' '}
          <a
            href="https://x.com/xxxCryptoPunk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bee-black font-medium hover:underline transition-all"
          >
            Creep
          </a>
        </p>
      </div>
    </footer>
  );
}
