import { useState, useRef } from 'react'
import { HandleOutsideClick } from '../../utility/handleOutsideClick'
import './dropdown.scss'

const DropDown = ({values,handleSelectionCallback,defaultValue}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [label, setLabel] = useState(defaultValue)
  const timeRef = useRef()
  const onSelection = (val) => {
    setLabel(val)
    handleSelectionCallback(val)
    setIsOpen(false)
  }
  HandleOutsideClick(timeRef, setIsOpen)
  return (
    <div className="dropdown" ref={timeRef}>
      <input
        type="text"
        className="dropdown--input"
        onFocus={() => setIsOpen(true)}
        // onBlur={()=>setIsOpen(false)}
        value={label}
        readOnly
      >
      </input>
      {isOpen && <div className='dropdown--flyout'>{values.map((val => {
        return <button key={val} onClick={() => onSelection(val)}>{val}</button>
      }))}</div>}


    </div>
  )
}
export default DropDown