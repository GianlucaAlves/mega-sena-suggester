import React, {createContext, useState} from 'react';
import type {Palpite} from '../types/Palpite';

interface PalpitesContextType{
    palpites: Palpite[];
    adicionarPalpite: (palpite: Palpite) => void;
}

const initialValue: PalpitesContextType = {
  palpites: [],
  adicionarPalpite: () => {},
};

export const PalpitesContext = createContext<PalpitesContextType>(initialValue);

export const PalpitesProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [palpites, setPalpites] = useState<Palpite[]>([]);


const adicionarPalpite = (palpite: Palpite) => {
    setPalpites((prev) => [...prev, palpite]);
};

return (
    <PalpitesContext.Provider value={{palpites, adicionarPalpite}}>
        {children}
    </PalpitesContext.Provider>
    );
};