import {useEffect} from 'react'

export const HandleOutsideClick =(ref,setIsOpen)=>{
    const handleOutsideClick  = e => {
        if (ref.current.contains(e.target)) {
            setIsOpen(true)
          // inside click
          return;
        }
        setIsOpen(false)
        // outside click 
      }
    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleOutsideClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, []);
}