interface LoaderProps {
  label?: string;
  fullScreen?: boolean;
}

export default function Loader({ label = "Loading...", fullScreen = false }: LoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 text-on-surface-variant ${
        fullScreen ? "min-h-screen" : "py-16"
      }`}
    >
      <div className="w-10 h-10 border-4 border-outline-variant border-t-primary rounded-full animate-spin" />
      <p className="font-label-md text-label-md">{label}</p>
    </div>
  );
}
