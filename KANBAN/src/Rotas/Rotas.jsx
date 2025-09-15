import { Routes, Route} from 'react-router-dom';
import {Inicial} from '../Paginas/Inicial';
import { Quadro } from '../Componentes/Quadro';
import {CadUsuario} from '../Paginas/CadUsuario';
import { CadTarefa } from '../Paginas/cadTarefa';
import { EditarTarefa } from '../Paginas/EditarTarefa';
import  { New_user } from '../Paginas/New_user';

export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Inicial/>}>
                <Route index element ={<Quadro/>}/>
                <Route path='cadUsuario' element={<CadUsuario/>}/>
                <Route path ='cadTarefa' element={<CadTarefa/>}/>
                <Route path='editarTarefa/:id' element={<EditarTarefa/>}/>
                <Route path='cadUsuario/novoUser' element={<New_user/>}/>
            </Route>
        </Routes>

    )

}