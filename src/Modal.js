import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
const Modal = ({ children }) => {
    const elRef = useRef(null);
    if(!elRef.current){
        elRef.current = document.createElement("div");
    }

    useEffect(()=>{
        const ModalRoot = document.getElementById("modal");
        ModalRoot.appendChild(elRef.current);

        return () => ModalRoot.removeChild(elRef.current);
        //* whatever you return in useEffect is cleanup (to prevent memory leaks).
    }, []);

    return createPortal(<div>{children}</div>, elRef.current);
}

export default Modal;