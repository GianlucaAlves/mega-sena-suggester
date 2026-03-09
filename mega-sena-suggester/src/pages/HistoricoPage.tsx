import {useContext, useState} from 'react';
import {PalpitesContext} from '../context/PalpitesContext';
import Ball from '../components/Ball';

function HistoricoPage(){
    const contexto = useContext(PalpitesContext)
    const [palpiteEditando, setPalpiteEditando] = useState<string | null>(null);
    const [numerosEditados, setNumerosEditados] = useState<number[]>([]);

    const editar = (id: string, numeros: number[]) => {
        setPalpiteEditando(id);
        setNumerosEditados([...numeros]);
    }

    const excluir = (id: string) => {
        contexto.excluirPalpite(id);
    }

    const salvarEdicao = (id: string) => {
        const numerosValidos = numerosEditados.every(num => num >= 1 && num <= 60);
        const comparador = new Set<number>(numerosEditados);

        
        if(comparador.size == numerosEditados.length && numerosValidos){
            contexto.editarPalpite(id, { numeros: numerosEditados });
            setPalpiteEditando(null);
        }else{
            alert("Você inseriu números repetidos ou fora do intervalo válido, mude os números e tente novamente!");
        }
    }

    return(
        <div>
            <h1>Página do histórico</h1>
            <ul>
                {contexto.palpites.map((palpite, index) => (
                <li key={index} style = {{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                }}>
                    {palpite.id === palpiteEditando ? (
                        <>
                            {numerosEditados.map((numero, i) => (
                                <input
                                    key={i}
                                    type="number"
                                    min={1}
                                    max={60}
                                    value={numero}
                                    onChange={e => {
                                        const novos = [...numerosEditados];
                                        novos[i] = Number(e.target.value);
                                        setNumerosEditados(novos);
                                    }}
                                    style={{width: 40}}
                                />
                            ))}
                            <button onClick={() => salvarEdicao(palpite.id)}>Salvar</button>
                            <button onClick={() => setPalpiteEditando(null)}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            {palpite.numeros.map((numero) =>(
                                <Ball num={numero} key={numero} />
                            ))}
                            <button onClick={() => editar(palpite.id, palpite.numeros)}>Editar</button>
                            <button onClick={() => excluir(palpite.id)}>Excluir</button>
                        </>
                    )}
                    </li>
                ))}
            </ul>           
        </div>
    );
}

export default HistoricoPage;