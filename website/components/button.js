export default function Button({target="_self", href="#", children, className}) {  
  return (
    <a
      href={href}
      target={target}
      type="button"
      className={`inline-block px-4 py-2 text-md font-medium text-white bg-primary hover:bg-blue-400 rounded-lg rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 lg:px-12 lg:py-2 ${className}`}
    >
      {children}
    </a>
  )
}


