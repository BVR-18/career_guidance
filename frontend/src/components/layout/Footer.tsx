export default function Footer() {
  return (
    <footer className="w-full mt-unit-xl bg-surface-container-highest py-unit-xl px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-unit-lg">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-headline-md text-headline-md text-on-surface font-extrabold">CareerVerse</span>
          <p className="font-body-md text-body-md text-on-surface-variant text-center md:text-left text-sm">
            © {new Date().getFullYear()} CareerVerse. Empowering student and professional futures.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">About Us</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Careers</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Privacy Policy</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
