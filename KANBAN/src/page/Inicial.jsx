import { Cabecalho } from "../components/Cabecalho";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

export function Inicial() {
    return (
        <>
            <Header />
            <Cabecalho />
            <Outlet />
        </>
    );
}