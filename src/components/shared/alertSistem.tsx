import './alertSistem.css'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BsFillXCircleFill } from "react-icons/bs";
import { HeaderColumn } from "@/components/shared/header-column/header-column";

export function AlertSistem(props: AlertSistemProps) {
  const handleClose = () => {
    props.onClose();
  };
  return (
    <div className={`alertContainer flex justify-center items-center fixed top-0 left-0 w-full h-full ${props.show ? '' : 'hidden'}`}>
      <div className="max-w-[80%]">
        {props.header && <HeaderColumn {...props.header} />}
        <Alert className='py-10'>
          <AlertTitle>{props.title}</AlertTitle>
          <AlertDescription>
            <div className="alert-sistem-body" dangerouslySetInnerHTML={{ __html: props.message }} />
          </AlertDescription>
          <button onClick={handleClose} className="absolute flex gap-2 top-0 justify-center items-center right-0 p-2 text-sm text-gray-400 hover:text-gray-600 focus:outline-none">
            <BsFillXCircleFill  className="text-destructive" /> Fechar
          </button>
        </Alert>
      </div>
    </div>
  );
}
