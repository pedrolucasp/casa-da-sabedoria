import { useState } from "preact/hooks";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from 'preact-iso';

import { Input } from '../components/Input';

export default function Login() {
  const { login } = useAuth();
  const { route } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/internal/users/sign_in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            email, password
          }
        }),
      });

      if (!res.ok) {
        console.log(res);

        throw new Error("Login failed");
      }

      const data = await res.json();
      const token = res.headers.get("Authorization")?.replace("Bearer ", "");

      login(data.user, token);
      route('/');
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight text-white">
      <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded-xl w-80 space-y-4">
        <a href="/">
          <img src="/casa-da-sabedoria.svg" alt="logo" />
        </a>

        <h1 className="text-xl font-semibold">Entre na sua conta</h1>
        {error && <p className="text-red-500">{error}</p>}

        <Input placeholder="Email"
               type={email}
               value={email}
               onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2" />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-2" />

        <button type="submit" className="w-full bg-midnight text-white p-2 rounded-lg">
          Entre
        </button>

        <p>ou</p>

        <a className="text-midnight" href="/sign_up">Crie uma conta</a>
      </form>
    </div>
  );
}
