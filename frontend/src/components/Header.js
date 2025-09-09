import { Button } from './Button'

const NavLink = ({ text, href, button = false }) => {
  const content = button ? <Button>{text}</Button> : <a href={href} className="hover:underline hover:decoration-midnight">{text}</a>

  return (
    <li class="ml-3">
      {content}
    </li>
  )
}

const Header = () => (
  <div class="flex w-full justify-between items-center my-5 px-5">
    <img src="/casa-da-sabedoria.svg" class="w-[215px]" />

    <nav class="flex">
      <ul class="list-style-none flex items-center">
        <NavLink text="Inicial" href="/" />
        <NavLink text="Sobre" href="/about" />
        <NavLink text="Explorar" href="/explore" />
        <NavLink text="Login" button={true} />
      </ul>
    </nav>
  </div>
)

export default Header
