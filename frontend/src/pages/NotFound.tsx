import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-background text-on-background">
      <p className="font-headline-xl text-headline-xl text-primary mb-4">404</p>
      <h1 className="font-headline-md text-headline-md text-on-surface mb-2">Page not found</h1>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-8">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3 rounded-full hover:bg-primary/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
