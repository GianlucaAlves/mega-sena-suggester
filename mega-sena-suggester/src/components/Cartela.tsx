import {useState, useContext} from 'react';
import {PalpitesContext} from '../context/PalpitesContext';
import type {Palpite} from '../types/Palpite';

function Cartela(){
    const [numeroSelecionado, setNumeroSelecionado] = useState<number[]>([]);
    const numeros = Array.from({length: 60}, (_, i) => i + 1);
    const contexto = useContext(PalpitesContext);

    const handlerClique = (num:number) => {
        if(numeroSelecionado.includes(num)){
            setNumeroSelecionado(numeroSelecionado.filter(n => n!== num))
        }else{
            if(numeroSelecionado.length < 6){
                setNumeroSelecionado([...numeroSelecionado, num]);
            }else{
                alert("Você só pode selecionar 6 números!")
            }
        }
    }

    const salvarSelecao = (selecionados: number[]) => {
        const novoPalpite: Palpite = {
            id : Date.now().toString(),
            tipo: 'manual',
            numeros: selecionados,
            data: new Date().toISOString()
        }
        contexto.adicionarPalpite(novoPalpite);
    }

    return(
            <div>
                <h1>MEGA SENA</h1>
                <div>{numeros.map(num => <button key={num} 
                style={numeroSelecionado.includes(num) ? {background: 'green'} : {background: 'gray'}} 
                onClick={() => handlerClique(num)}>{num}
                </button>)}
                </div>
                {numeroSelecionado.length == 6 ?
                <>
                <button onClick={() => salvarSelecao(numeroSelecionado)}>Salvar seleção</button>
                </> :
                <></>}
            </div>

    )
}

export default Cartela;