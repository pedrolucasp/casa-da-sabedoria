import { useState } from "preact/hooks";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from 'preact-iso';
import { Input, Button } from '../components';

export default function SignUp() {
  const { login } = useAuth();
  const { route } = useLocation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [error, setError] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/internal/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            email,
            name,
            password,
            password_confirmation: passwordConfirmation
          }
        }),
      });

      if (!res.ok) {
        console.log(res);

        throw new Error("Signup failed");
      }

      const data = await res.json();

      login(data.user, data.token);
      route('/');
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-midnight text-white">
      <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded-xl w-80 space-y-4">
        <a className="cursor-pointer" href="/">
          <img src="/casa-da-sabedoria.svg" alt="logo" />
        </a>

        <h1 className="text-xl font-semibold">Crie uma conta</h1>
        {error && <p className="text-red-500">{error}</p>}

        <Input placeholder="Nome"
               type={'text'}
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="w-full" />


        <Input placeholder="Email"
               type={email}
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full" />

        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full" />

        <Input
          type="password"
          placeholder="Confirmação da senha"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="w-full" />

        <Button type="submit" className="w-full">
          Registrar
        </Button>

        <p>ou</p>

        <a className="text-midnight cursor-pointer" href="/login">
          Entre na sua conta
        </a>
      </form>
    </div>
  );
}
