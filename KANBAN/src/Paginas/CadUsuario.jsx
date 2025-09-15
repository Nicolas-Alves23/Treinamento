import axios from 'axios';//é o hook que faz a comunicação com a internet (Http)
//são hooks que permite a validação de interação com o usuário... NUNCA DUVIDE DA CAPACIDADE DO USUÁRIO
//React é comum ver o zod
import { useForm } from 'react-hook-form';//Hook (use) aqui permite a validação de formulario
import { z } from 'zod';//zod é uma descrição de como eu validar, quais seriam as regas
import { zodResolver } from '@hookform/resolvers/zod';//é o liga o hook form com o zod
import { Link } from 'react-router-dom'
//validação de formulário -- estou usando as regras do zod, que pode ser consultada na web
const schemaCadUsuario = z.object({
    nome: z.string()
        .min(1, 'Insira ao menos 1 caractere')
        .max(30, 'Insira até 30 caracteres'),
    email: z.string()
        .min(1, 'Insira seu email')
        .max(30, 'Insira um endereço de email com até 30 carateres')
        .email("Formato de email invalido"),
})


export function CadUsuario() {
    const {
        register,//registra para mim o que o usuário faz
        handleSubmit, //no momento em que ele der um submit (botão)
        formState: { errors }, //no formulario, se der ruim guarda os erros na variavel errors
        reset
    } = useForm({
        resolver: zodResolver(schemaCadUsuario)
    });

    async function obterdados(data) {
        console.log('dados informados pelo user:', data)

        //Para grande parte das interações com outra plataforma é necessário usar o try
        try {
            await axios.post("http://127.0.0.1:8000/usuario/", data);
            alert("USuário cadastrado com sucesso");
            reset();//limpo o formulário depois do cadastro
        } catch (error) {
            alert("Éeee, não rolou, na proxima talvez")
            console.log("Erros", error)
        }
    }

    return (
        <main className='conteiner_form'>
            <article className='box-left'>
                <section className='text_cadastro'>
                    <figure>
                        <img src="image/kanban.png" alt="kanban" className='logotype' />
                    </figure>
                    <h2>KANBAN</h2>
                    <h2>GERENCIADOR</h2>
                    <h3>Montando Tarefas Com Você Para Gerenciar o Mundo</h3>
                    <p>A aplicação criada para apoiar você em seus projetos, o escopo é a principal parte da entrega </p>
                </section>
            </article>
            <article className='box-right'>

                <form className="formularios" onSubmit={handleSubmit(obterdados)}>

                    <label>Email</label>
                    <input type='text' placeholder='Enter your email' {...register("email")} />
                    {/* aqui eu vejo a variavel errors no campo nome e exibo a mensagem para o usuário */}
                    {errors.nome && <p>{errors.nome.message}</p>}

                    <label>Password</label>
                    <input type='password' placeholder='Enter your password' {...register("password")} />
                    {/* aqui eu vejo a variavel errors no campo email e exibo a mensagem para o usuário */}
                    {errors.email && <p>{errors.email.message}</p>}


                    <button type='submit' className='sign_button'>SIGN IN</button>

                    
                        <p className='transition'>or</p>
                    

                    <button className='google_button'>
                        <img src="image/Google Logo.png" alt="Google Logo" className='image_logo' /> Sign in with Google
                    </button>

                    <p>
                     Are you new User?<Link to='novoUser'>Create an Account</Link> 
                    </p>
                </form>
            </article>
        </main >
    )
}