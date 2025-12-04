export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-honey-800 text-honey-100 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {currentYear} COLBee Community. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
