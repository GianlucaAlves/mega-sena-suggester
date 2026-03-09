import {useContext} from 'react';
import {PalpitesContext} from '../context/PalpitesContext';
import Ball from '../components/Ball';

function HistoricoPage(){
    const contexto = useContext(PalpitesContext)
    return(
        <div>
            <h1>Página do histórico</h1>
            <ul>
                {contexto.palpites.map((palpite, index) => (
                <li key={index} style = {{
                    display: "flex"
                }}>
                    {palpite.map((numero) =>(
                        <Ball num={numero} />
                    ))}
                    </li>
                ))}
            </ul>           
        </div>
    );
}

export default HistoricoPage;