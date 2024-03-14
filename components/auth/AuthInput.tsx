interface AuthInputProps {
  label: string;
  valor: any;
  obrigatorio?: boolean;
  naoRenderizarQuando?: boolean;
  tipo?: "text" | "email" | "password";
  valorMudou: (novoValor: any) => void;
}

export default function AuthInput(props: AuthInputProps) {
  return props.naoRenderizarQuando ? null : (
    <div>
      <label>{props.label}</label>
      <input
        type={props.tipo ?? "text"}
        value={props.valor}
        onChange={(event) => props.valorMudou?.(event.target.value)}
        required={props.obrigatorio}
      />
    </div>
  );
}
