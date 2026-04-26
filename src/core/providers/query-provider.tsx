import type { ReactNode } from "react";
import { queryClient } from "../config/query.config";
import { QueryClientProvider } from "@tanstack/react-query";

interface Provider {
    children: ReactNode;
}

export const QueryProvider = ({ children }: Provider) => {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

}