import { Input } from "@/design/atoms/input";

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
    label?: string;
}

export function SearchBar({
    searchTerm,
    onSearchChange,
    placeholder = "Buscar...",
    label = "Buscar"
}: SearchBarProps) {
    return (
        <div className="relative w-full">
            <Input
                label={label}
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                type="search"
            />
            {/* Ícono de lupa decorativo */}
            <svg
                className="w-5 h-5 absolute right-4 bottom-3.5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    );
}