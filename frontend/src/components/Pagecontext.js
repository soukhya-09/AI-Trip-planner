import { createContext, useState } from "react";


export const PageContext = createContext();

export const PageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState("home");

    return (
        <PageContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </PageContext.Provider>
    );
};
