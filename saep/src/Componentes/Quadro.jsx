import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Não se esqueça de importar o axios
import { Coluna } from './Coluna';
import { DndContext } from '@dnd-kit/core';//qual é o ambiente qye vai permitir o drag and drop

export function Quadro() {
    const [tarefas, setTarefas] = useState([]);

    function handleDragEnd(event){
        const { active, over } =event;
 
        if(over && active){
            const tarefaId = active.id; //quero pegar o ID da tarefa que ta sofrendo o evento
            const novaColuna =over.id; //quero pegar a coluna da tarefa
            setTarefas (prev=>
                prev.map(tarefa => tarefaId === tarefa.id ? {...tarefa, status: novaColuna} : tarefa)
            );
 
            //Atualiza o status do card (muda a situação do card {a fazer/ fazendo / pronto})
            axios.patch(`http://127.0.0.1:8000/tarefa/${tarefaId}/`,{
                status: novaColuna
            })
            .catch(err => console.error("Erro ao  atualizar status: ", err));
        }
    }
    
    useEffect(() => {

        const apiUrl = 'http://127.0.0.1:8000/api/tarefas/';


        axios.get(apiUrl)
            .then(response => {
                setTarefas(response.data);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar os dados da API:", error);
            });
    }, []);

    const tarefasAFazer = tarefas.filter(tarefa => tarefa.status === 'AF');
    const tarefasFazendo = tarefas.filter(tarefa => tarefa.status === 'F');
    const tarefasPronto = tarefas.filter(tarefa => tarefa.status === 'P');

    return (
       
           
            <main className="conteiner">
                <section className="atividades">
                    <Coluna titulo="A fazer" tarefas={tarefasAFazer} />
                    <Coluna titulo="Fazendo" tarefas={tarefasFazendo} />
                    <Coluna titulo="Pronto" tarefas={tarefasPronto} />
                </section>
            </main>
        
    );
}