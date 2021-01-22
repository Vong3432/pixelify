import React, { ButtonHTMLAttributes, useEffect, useState } from 'react'


interface ButtonProps {
  type?: 'primary' | 'secondary';
  text: string;
  tailwindClasses?: string;
}

const Button: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = (props: ButtonProps) => {

  const [classes, setClasses] = useState<string>();

  const { type, text, tailwindClasses, ...rest } = props;

  useEffect(() => {
    switch (type) {
      case "primary":
        setClasses("bg-indigo-600 hover:bg-indigo-700 text-white")
        break;
      case "secondary":
        setClasses("bg-gray-200 hover:bg-gray-300 text-gray-600")
        break;
      default:
        setClasses("")
        break;
    }
  }, [])

  return (
    <button {...rest} className={`py-3 rounded-lg px-4 font-extrabold ${tailwindClasses} ${classes}`}>{text}</button>
  )
}

export default Button
