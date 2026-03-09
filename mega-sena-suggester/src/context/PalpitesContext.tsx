import React, {createContext, useState} from 'react';
import type {Palpite} from '../types/Palpite';

interface PalpitesContextType{
    palpites: Palpite[];
    adicionarPalpite: (palpite: Palpite) => void;
    editarPalpite: (id: string, novosDados: Partial<Palpite>) => void;
    excluirPalpite: (id: string) => void;
}

const initialValue: PalpitesContextType = {
  palpites: [],
  adicionarPalpite: () => {},
  editarPalpite: () => {},
  excluirPalpite: () => {},
};

export const PalpitesContext = createContext<PalpitesContextType>(initialValue);

export const PalpitesProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [palpites, setPalpites] = useState<Palpite[]>([]);


const adicionarPalpite = (palpite: Palpite) => {
    setPalpites((prev) => [...prev, palpite]);
};

const editarPalpite = (id: string, novosDados: Partial<Palpite>) => {
    setPalpites((palpites) => palpites.map(palpite => palpite.id === id ? {...palpite, ...novosDados} : palpite));
}

const excluirPalpite = (id: string) => {
    setPalpites((palpites) => palpites.filter(palpite => palpite.id !== id));
}

return (
    <PalpitesContext.Provider value={{palpites, adicionarPalpite, editarPalpite, excluirPalpite}}>
        {children}
    </PalpitesContext.Provider>
    );
};