import Cabecalho from "./Cabecalho";
import Conteudo from "./Conteudo";
import MenuLateral from "./MenuLateral";

interface LayoutProps {
  titulo: string;
  subtitulo: string;
  children?: any;
}

export default function Layout(props: LayoutProps) {
  return (
    <div>
      <MenuLateral />
      <Cabecalho {...props} />
      <Conteudo>{props.children}</Conteudo>
    </div>
  );
}
