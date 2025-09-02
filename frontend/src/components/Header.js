const NavLink = ({ text }) => (
  <li class="ml-3">
    {text}
  </li>
)

const Header = () => (
  <div class="flex w-full justify-between items-center mb-5 px-5">
    <h1 class="text-lg font-bold">Casa dos Saberes</h1>

    <nav class="flex">
      <ul class="list-style-none flex flex">
        <NavLink text="Inicial" />
        <NavLink text="Login" />
      </ul>
    </nav>
  </div>
)

export default Header
