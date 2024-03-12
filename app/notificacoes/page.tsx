"use client";
import Layout from "@/components/template/Layout";
import useAppData from "@/data/hook/useAppData";

export default function Notificacoes() {
  const context = useAppData();

  return (
    <Layout
      titulo="Notificações"
      subtitulo="Aqui você irá gerenciar suas notificações"
    >
      <h3>{context.nome}</h3>
    </Layout>
  );
}
