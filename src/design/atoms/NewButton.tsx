interface ButtonProps {
    name: string;
    onClick: () => void;
    style?: string;
}

export const Button = ({ name, onClick, style }: ButtonProps) => {
    return (
        <button className={`
            inline-flex items-center justify-center 
           rounded-lg px-6 py-2.5 
            text-white
           transition-all duration-200
            active:scale-95 disabled:opacity-50
        bg-primary hover:brightness-110  
          ${style}`} onClick={onClick}>
            {name}
        </button >
    );
}