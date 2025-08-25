import { Link } from "react-router-dom";

export function Header() {
    return (
        <nav className="barra">
            <ul>
                <Link to='/cadUsuario'>
                    <li>Cadastro de Usuários</li>
                </Link>
                <Link to='cadTarefa'>
                    <li>Cadastro de Tarefas</li>
                </Link>
                <Link to='/'>
                    <li>Gerenciar Tarefas</li>
                </Link>
            </ul>
        </nav>
    );
}