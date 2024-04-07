import { ReactNode, CSSProperties } from "react";

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    style?: CSSProperties;
}

const Button = ({ children, onClick, className, style }: ButtonProps) => {
    return (
        <button
            className={`py-5 px-[60px] bg-[#FF6300] font-bold text-xl text-white border-none rounded-[20px] ${className}`}
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    );
};

export default Button;
