import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext } from "react";

interface custmersTypes {
    DataCustmers: custmersType[] | null;
    isLoading: boolean;
}

export const custmerContext = createContext<custmersTypes|null>(null); 

interface custmerProps{
    children:React.ReactNode;
}
interface custmersType {
    id: string;
    name: string; 
}



const CustmerProvider : React.FC<custmerProps> = ({children})=>{

    

    <custmerContext.Provider value={{DataCustmers,LoadingCustmers}}>
        {children}
    </custmerContext.Provider>
}

export default CustmerProvider;