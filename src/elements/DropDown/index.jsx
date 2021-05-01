import { useState, useRef } from 'react'
import { HandleOutsideClick } from '../../utility/handleOutsideClick'
import './dropdown.scss'

const TimePicker = ({values}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [label, setLabel] = useState('')
  const timeRef = useRef()
  const onTimeSelection = (time) => {
    setLabel(time)
    setIsOpen(false)
  }
  HandleOutsideClick(timeRef, setIsOpen)
  return (
    <div className="dropdown--wrapper" ref={timeRef}>
      <input
        type="text"
        className="dropdown--input"
        onFocus={() => setIsOpen(true)}
        // onBlur={()=>setIsOpen(false)}
        value={label}
        readOnly
      >
      </input>
      {isOpen && <div className='dropdown--flyout'>{values.map((time => {
        return <button key={time} onClick={() => onTimeSelection(time)}>{time}</button>
      }))}</div>}


    </div>
  )
}
export default TimePicker