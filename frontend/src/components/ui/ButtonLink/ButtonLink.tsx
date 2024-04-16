import { cn } from "@/utils/mergeStyles";
import { ReactNode, CSSProperties, LinkHTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  children: ReactNode;
  link: string;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}

const ButtonLink = ({
  children,
  link,
  className,
  style,
  disabled,
  ...props
}: ButtonLinkProps & LinkHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      aria-disabled={disabled}
      to={disabled ? undefined : link}
      className={cn(
        `py-5 px-[60px] bg-[#FF6300] hover:bg-[#FF7F50] transition-colors flex items-center justify-center text-center font-bold text-xl text-white border-none rounded-[20px] ${className} text-nowrap shrink-0`,
        { "bg-gray-400 hover:bg-gray-400 cursor-not-allowed": disabled }
      )}
      style={style}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
