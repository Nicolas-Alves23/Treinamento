import { Routes, Route } from "react-router-dom";
import { Inicial } from '../page/Inicial';
import { Quadro } from '../components/Quadro';
import { CardUsuario } from '../page/CardUsuario';
import { CardTarefa } from '../page/CardTarefa'
export function Rotas(){
    return(
        <Routes>
            <Route path="/" element={<Inicial/>}>
                <Route index element ={<Quadro/>}/>
                <Route path = '/cadUsuario' element={<CardUsuario/>}/>
                <Route path= 'cadTarefa' element={<CardTarefa/>}/>
            </Route>
        </Routes>
    );
}