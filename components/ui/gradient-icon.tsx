import type { IconType } from "react-icons";

export default function GradientIcon({
  Icon,
  id,
  size = 32,
  color1,
  color2,
}: {
  Icon: IconType;
  id: string;
  size?: number;
  color1: string;
  color2: string;
}) {
  return (
    <>
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
        </defs>
      </svg>
      <Icon
        style={{
          fill: `url(#${id})`,
        }}
        size={size}
      />
    </>
  );
}
