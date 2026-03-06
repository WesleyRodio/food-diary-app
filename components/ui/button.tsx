import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function Button({
  pointer,
  className,
  children,
}: {
  pointer?: boolean;
  className?: string;
  children?: ReactNode;
} & React.ComponentProps<"button">) {
  return (
    <button
      className={twMerge(
        "bg-background shadow-shadow focus-visible:ring-brand-3 border-border hover:bg-foreground/50 text-muted rounded-xl border px-2 py-3 text-sm font-semibold shadow ring-2 ring-transparent outline-0 transition-all duration-300 active:scale-96",
        pointer && "cursor-pointer",
        className,
      )}
    >
      {children}
    </button>
  );
}

export { Button };
