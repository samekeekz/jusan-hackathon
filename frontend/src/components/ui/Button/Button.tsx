import { cn } from "@/utils/mergeStyles";
import { ReactNode, CSSProperties, ButtonHTMLAttributes } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

const Button = ({
  children,
  onClick,
  className,
  style,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        `py-5 px-[60px] leading-8 cursor-pointer bg-[#FF6300] hover:bg-[#FF7F50] transition-colors flex items-center justify-center text-center font-bold text-xl text-white border-none rounded-[20px] ${className}`
      )}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
