import React, { useContext, useEffect, useState } from 'react'
import { Transition } from 'react-transition-group';
import { AlertContext } from '../../context/AlertContext';

interface Props {
  id: string;
  text: string;
  type: "danger" | "success" | "warning";
  tailwindClasses?: string;
}

const Alert: React.FC<Props> = (props: Props) => {

  const [classes, setClasses] = useState<string>();
  const { dispatchAlert } = useContext(AlertContext);

  const { id } = props;

  useEffect(() => {
    switch (props.type) {
      case "danger":
        setClasses("btn bg-red-600");
        break;
      case "success":
        setClasses("btn bg-green-600");
        break;
      case "warning":
        setClasses("btn bg-yellow-600");
        break;
    }
  }, [])

  return (

    <div className={`
        ${classes}
        transition-opacity        
        fixed bottom-5            
        text-white
        p-3
        ${props.tailwindClasses}`}
    >
      {props.text}
      <span onClick={() => dispatchAlert({ type: "REMOVE_ALERT", payload: { id } })} className="pl-4">X</span>
    </div >

  )
}

export default Alert
