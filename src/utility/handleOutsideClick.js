import {useEffect} from 'react'

export const HandleOutsideClick =(ref,setIsOpen)=>{
    const handleClick  = e => {
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
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
}