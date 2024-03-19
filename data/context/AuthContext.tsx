"use client";
import Usuario from "@/model/Usuario";
import { User } from "firebase/auth";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGooglePopup } from "@/firebase";

interface AuthContextProps {
  usuario?: Usuario;
  loginGoogle?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(usuarioFirebase: User): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName || "",
    email: usuarioFirebase.email || "",
    token,
    provedor: usuarioFirebase.providerData[0].providerId,
    imagemUrl: usuarioFirebase.photoURL || "",
  };
}

export function AuthProvider(props: any) {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario>();

  async function loginGoogle() {
    const resposta = await signInWithGooglePopup();
    if (resposta.user?.email) {
      const usuario = await usuarioNormalizado(resposta.user);
      setUsuario(usuario);
      router.push("/");
    }
  }

  return (
    <AuthContext.Provider value={{ usuario, loginGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
