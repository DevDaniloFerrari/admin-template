import Image from "next/image";
import loading from "@/public/images/loading.gif";
import useAuth from "@/data/hook/useAuth";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function ForcarAutenticacao(props: any) {
  const { usuario, carregando } = useAuth();
  const router = useRouter();

  function renderizarConteudo() {
    return <>{props.children}</>;
  }

  function renderizarCarregando() {
    return (
      <div className={`flex justify-center items-center h-screen`}>
        <Image src={loading} alt="Imagem de carregamento" />
      </div>
    );
  }

  if (!carregando && usuario?.email) {
    return renderizarConteudo();
  }

  if (carregando) {
    return renderizarCarregando();
  }

  useEffect(() => {
    router.push("/autenticacao");
  }, []);

  return null;
}
