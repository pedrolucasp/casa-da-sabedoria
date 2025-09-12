const Footer = () => (
  <div class="flex w-full px-5 border-t border-neutral-200 pt-5 items-center text-center justify-center">
    {new Date().getFullYear()} Copyleft -
    <a className="ml-1 hover:underline hover:decoration-midnight"
       href="https://github.com/pedrolucasp/casa-dos-saberes">
      Código-fonte
    </a>
  </div>
)

export default Footer

