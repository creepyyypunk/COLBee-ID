export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-honey-800 text-honey-100 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {currentYear} Built by <a href="https://x.com/xxxCryptoPunk" target="_blank" rel="noopener noreferrer"> Creep </a>
        </p>
      </div>
    </footer>
  );
}
