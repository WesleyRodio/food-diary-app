import { twMerge } from "tailwind-merge";

export default function Textarea({
  className,
  ...props
}: { className?: string } & React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={twMerge(
        "border-border text-secondary bg-background focus-visible:ring-border rounded-xl border p-2 text-xs font-semibold ring-2 ring-transparent transition-all duration-300 outline-none",
        className,
      )}
      {...props}
    />
  );
}
