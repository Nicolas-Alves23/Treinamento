import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers";

// validação de formulário
const schemaCadUsuario = z.object({
    nome: z.string()
        .min(1, 'Insira ao menos 1 caractere')
        .max(30, 'Insira até 30 caracteres'),
    email: z.string()
        .min(1, 'Insira o seu email')
        .max(30,'Insira um endereço de email com até 30 caracteres')
        .email("Formato de email invalido")
})

export function CardUsuario() {
    return (
        <main className="main">
            <form>
                <h2>Cadastro de Usuários</h2>

                <label htmlFor="name">Nome:</label>
                <input type="text" placeholder="Nome do usuário" required/>

                <label htmlFor="email">Nome:</label>
                <input type="email" placeholder="Email do usuário" required/>

                <button type="submit">Cadastrar</button>
            </form>
        </main>
    );
}