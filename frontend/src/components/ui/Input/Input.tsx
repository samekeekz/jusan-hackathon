import { forwardRef } from "react";

interface InputProps {
    id: string;
    type?: string;
    label: string;
    errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ id, type = "text", label, errorMessage }, ref) => {
    return (
        <div className="self-stretch mb-[18px]">
            <label htmlFor={id} className="ml-[2px] text-[#333333] text-2xl text-left self-start">{label}</label>
            <input
                type={type}
                id={id}
                className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl"
                ref={ref}
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
    );
});

export default Input;
