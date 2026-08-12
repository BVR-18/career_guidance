interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-full bg-error-container flex items-center justify-center mb-5 text-on-error-container">
        <span className="material-symbols-outlined text-3xl">error</span>
      </div>
      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-6">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="border border-outline text-on-surface font-label-md text-label-md px-6 py-2.5 rounded-full hover:bg-surface-container-high transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
