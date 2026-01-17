export function Header() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Alfredo R. Pabon
          </h1>
          <h2 className="mt-3 text-lg font-medium tracking-tight text-primary sm:text-xl">
            Senior Software Engineer
          </h2>
          <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
            I build accessible, pixel-perfect digital experiences for the web.
          </p>
        </div>
      </div>
    </div>
  );
}
