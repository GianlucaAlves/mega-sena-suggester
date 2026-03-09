import {useContext} from 'react';
import {PalpitesContext} from '../context/PalpitesContext';
import Ball from '../components/Ball';

function HistoricoPage(){
    const contexto = useContext(PalpitesContext)

    const excluir = (id: string) => {
        contexto.excluirPalpite(id);
    }
    return(
        <div>
            <h1>Página do histórico</h1>
            <ul>
                {contexto.palpites.map((palpite, index) => (
                <li key={index} style = {{
                    display: "flex"
                }}>
                    {palpite.numeros.map((numero) =>(
                        <Ball num={numero} />
                    ))}

                    <button>Editar</button>
                    <button onClick={() => excluir(palpite.id)}>Excluir</button>
                    </li>
                ))}
            </ul>           
        </div>
    );
}

export default HistoricoPage;