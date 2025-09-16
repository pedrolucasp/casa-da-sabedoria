import { ButtonLink } from './ButtonLink'
import { useAuth } from "../contexts/AuthContext";

const NavLink = ({ text, href, button = false }) => {
  const content = (button ?
    <ButtonLink to={href}>{text}</ButtonLink> :
    <a href={href} className="hover:underline hover:decoration-midnight">{text}</a>
  )

  return (
    <li class="ml-3">
      {content}
    </li>
  )
}

const Header = () => {
  const { user, token } = useAuth();
  let href = '/login';
  let text = 'Login';

  if (user) {
    href = '/logout';
    text = 'Logout';
  }

  return (
    <div class="flex w-full justify-between items-center my-5 px-5">
      <a className="cursor-pointer" href="/">
        <img src="/casa-da-sabedoria.svg" class="w-[215px]" alt="logo" />
      </a>

      <nav class="flex">
        <ul class="list-style-none flex items-center">
          <NavLink text="Inicial" href="/" />
          <NavLink text="Sobre" href="/about" />
          <NavLink text="Explorar" href="/explore" />
          {user && (<NavLink text="Seu sebo" href="/your_shop" />)}

          <NavLink button={true} {...{ href, text }} />
        </ul>
      </nav>
    </div>
  )
}

export default Header
