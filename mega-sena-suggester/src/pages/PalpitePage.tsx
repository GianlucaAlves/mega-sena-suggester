import {useContext, useEffect, useState} from 'react'
import {PalpitesContext} from '../context/PalpitesContext';



function PalpitePage(){
    const contexto = useContext(PalpitesContext);
    const [palpite, setPalpite] = useState<number[]>([]);

    function gerarPalpite(){
        const num = new Set<number>();
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
        setPalpite(palpiteGerado)
        contexto.adicionarPalpite(palpiteGerado);
    }
    useEffect(() => {
    gerarPalpite();
    }, []);
    return (
        <>
            <div>{palpite.join(', ')}</div>
            <button onClick={gerarPalpite}>Nova sugestão</button>
        </>
    );
}

export default PalpitePage;