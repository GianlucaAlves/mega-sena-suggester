import {useContext, useEffect, useState} from 'react'
import {PalpitesContext} from '../context/PalpitesContext';
import type {Palpite} from '../types/Palpite'


function PalpitePage(){
    const contexto = useContext(PalpitesContext);
    const [palpite, setPalpite] = useState<Palpite | null>(null);

    function gerarPalpite(){
        const num = new Set<number>();
        const id = Date.now().toString();
        const tipo = 'automatico';
        const data = new Date().toISOString();
        
        let count = 0;
        while(count < 6){
            let tam = num.size;
            num.add(Math.floor((Math.random()*60 + 1)));
            if(num.size > tam){
                count++;
                tam = num.size;
            }
        }

        let palpiteGerado = Array.from(num);
        const novoPalpite: Palpite = {
            id,
            numeros: palpiteGerado,
            tipo,
            data,
        };

        setPalpite(novoPalpite)
        contexto.adicionarPalpite(novoPalpite);
    }
    useEffect(() => {
    gerarPalpite();
    }, []);
    return (
        <>
            <div>{palpite?.numeros.join(', ')}</div>
            <button onClick={gerarPalpite}>Nova sugestão</button>
        </>
    );
}

export default PalpitePage;