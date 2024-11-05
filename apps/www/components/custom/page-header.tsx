import { cn } from "@/lib/utils";

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "mx-auto flex flex-col items-center gap-8 px-4 py-12 md:py-16 lg:py-22",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-5xl md:text-7xl font-semibold tracking-tighter drop-shadow-sm bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white lg:text-7xl font-sans py-2 md:py-6 relative z-20",
        className,
      )}
      {...props}
    />
  );
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "max-w-4xl text-center text-balance text-lg sm:text-xl md:text-xl text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex w-full items-center justify-center gap-6", className)}
      {...props}
    />
  );
}

function PageCommandText({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("font-mono text-sm text-gray-500", className)}
      {...props}
    />
  );
}

export {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageCommandText,
};
