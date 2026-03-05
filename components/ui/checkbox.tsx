import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { IoCheckmarkOutline as CheckIcon } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function Checkbox({
  className,
  ...props
}: { className?: string } & React.ComponentProps<
  typeof CheckboxPrimitive.Root
>) {
  return (
    <CheckboxPrimitive.Root
      className={twMerge(
        "peer data-[state=checked]:bg-brand-1 data-[state=checked]:text-light bg-background shadow-shadow hover:bg-brand-1/50 relative flex size-5 shrink-0 cursor-pointer rounded-md shadow transition-all duration-150 outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="grid size-full place-content-center text-current transition-none">
        <CheckIcon className="size-[98%]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
