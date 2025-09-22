import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";

// Schema de validação
const schemaCadTarefa = z.object({
  descricao: z.string()
    .min(1, "Informe uma descrição")
    .max(100, "Informe no máximo 100 caracteres"),
  setor: z.string()
    .min(1, "Informe um setor")
    .max(50, "Informe no máximo 50 caracteres"),
  prioridade: z.enum(["B", "M", "A"], {
    errorMap: () => ({ message: "Escolha Baixa, Média ou Alta" })
  }),
  usuario: z.string().min(1, "Selecione um usuário")
});

export function CadastroTarefa() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schemaCadTarefa)
  });

  // Buscar usuários cadastrados
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/usuario/")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  // Função para enviar dados
  async function obterDados(data) {
    setLoading(true);

    const usuarioId = parseInt(data.usuario);
    const hoje = new Date().toISOString().split("T")[0];

    const payload = {
      descricao: data.descricao,
      nomeSala: data.setor,
      prioridade: data.prioridade,  // mantém maiúsculo conforme enum do backend
      id_usuario: usuarioId,
      dataCadastro: hoje,
      status: "AF"
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/tarefas/", payload);
      alert("Tarefa cadastrada com sucesso!");
      reset();
    } catch (err) {
      console.error("Erro ao cadastrar tarefa:", err.response?.data || err);
      alert("Erro ao cadastrar tarefa");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="formulario">
      <h2>Cadastro de Tarefa</h2>
      <form onSubmit={handleSubmit(obterDados)}>
        <label>Descrição:</label>
        <textarea {...register("descricao")} />
        {errors.descricao && <p>{errors.descricao.message}</p>}

        <label>Setor:</label>
        <input type="text" {...register("setor")} />
        {errors.setor && <p>{errors.setor.message}</p>}

        <label>Prioridade:</label>
        <select {...register("prioridade")}>
          <option value="">Selecione</option>
          <option value="B">Baixa</option>
          <option value="M">Média</option>
          <option value="A">Alta</option>
        </select>
        {errors.prioridade && <p>{errors.prioridade.message}</p>}

        <label>Usuário:</label>
        <select {...register("usuario")}>
          <option value="">Selecione um usuário</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>{u.nome}</option>
          ))}
        </select>
        {errors.usuario && <p>{errors.usuario.message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </section>
  );
}
