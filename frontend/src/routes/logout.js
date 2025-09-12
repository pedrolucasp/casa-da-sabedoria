import { useState, useEffect } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
  const { route } = useLocation();
  const { logout, token } = useAuth();

  const [error, setError] = useState();

  useEffect(() => {
    const apiLogout = async () => {
      try {
        const res = await fetch("/api/internal/users/sign_out", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (!res.ok) {
          console.log(res);

          throw new Error("Logout failed");
        }

        logout();

        route('/')
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }

    if (token) {
      apiLogout();
    }
  }, [route, token, logout])

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 text-center py-20">
      Logout... 👋
    </section>
  )
}

export default Logout
