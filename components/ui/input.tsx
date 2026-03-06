import { twMerge } from "tailwind-merge";

export default function Input({
  className,
  ...props
}: { className?: string } & React.ComponentProps<"input">) {
  return (
    <input
      className={twMerge(
        "border-border bg-background text-secondary focus-visible:ring-border rounded-xl border px-2 py-3 text-xs font-semibold ring-2 ring-transparent outline-0 transition-all",
        className,
      )}
      {...props}
    />
  );
}
