"use client";
import Usuario from "@/model/Usuario";
import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, signInWithGooglePopup } from "@/firebase";
import { Cookies, useCookies } from "next-client-cookies";

interface AuthContextProps {
  usuario?: Usuario;
  carregando?: boolean;
  loginGoogle?: () => Promise<void>;
  logout?: () => Promise<void>;
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

function gerenciarCookie(logado: boolean, cookies: Cookies) {
  const data = new Date();
  data.setDate(data.getDate() + 7);

  if (logado) cookies.set("auth", logado.toString(), { expires: data });
  else cookies.remove("auth");
}

export function AuthProvider(props: any) {
  const cookies = useCookies();
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario>();
  const [carregando, setCarregando] = useState<boolean>(true);

  async function configurarSessao(usuarioFirebase: User | null) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase);
      setUsuario(usuario);
      gerenciarCookie(true, cookies);
      setCarregando(false);
      return usuario.email;
    } else {
      setUsuario(undefined);
      gerenciarCookie(false, cookies);
      setCarregando(false);
      return false;
    }
  }

  async function loginGoogle() {
    try {
      const resposta = await signInWithGooglePopup();
      configurarSessao(resposta.user);
      router.push("/");
    } finally {
      setCarregando(false);
    }
  }

  async function logout() {
    try {
      setCarregando(true);
      await auth.signOut();
      await configurarSessao(null);
      router.push("/autenticacao");
    } finally {
      setCarregando(false);
    }
  }

  useEffect((): any => {
    if (cookies.get("auth")) {
      const cancelar = auth.onIdTokenChanged((promise) => {
        configurarSessao(promise as User);
      });
      return () => cancelar;
    }

    setCarregando(false);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, carregando, loginGoogle, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
