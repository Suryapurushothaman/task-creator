import { useState,useRef,useEffect} from 'react'
import dayjs from "dayjs";
import Header from './header'
import DateRow from './dayRow'
import {HandleOutsideClick} from '../../utility/handleOutsideClick'
import {INITIAL_YEAR,INITIAL_MONTH,WEEKDAYS,TODAY,getMonthLabel,getCalendarDates} from './dateUtils' 
import './date-picker.scss'

const DatePicker = () => {
    const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1)))
    const [selectedMonthDates, setSelectedMonthDates] = useState(getCalendarDates())
    const [selectedMonthLabel, setSelectedMonthLabel] = useState(getMonthLabel())
    const [isOpen,setIsOpen] = useState(false)
    const [selectedDate,setSelectedDate] = useState(TODAY)
    const calendarRef = useRef();
    useEffect(()=>{
        setSelectedMonthDates(getCalendarDates(selectedMonth.format("YYYY"), selectedMonth.format("M")));
        setSelectedMonthLabel(getMonthLabel(selectedMonth.format("YYYY"), selectedMonth.format("M")));
    },[selectedMonth])
    const handlePreviousMonth = () => {
        setSelectedMonth(dayjs(selectedMonth).subtract(1, "month"));
    }
    const handleNextMonth = () => {
        setSelectedMonth(dayjs(selectedMonth).add(1, "month"));   
    }
    const handleCurrentMonth = () => {
        const nextMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
        setSelectedMonth(nextMonth);
        setSelectedMonthDates(getCalendarDates(selectedMonth.format("YYYY"), selectedMonth.format("M")));
        setSelectedMonthLabel(getMonthLabel(selectedMonth.format("YYYY"), selectedMonth.format("M")));
    }
    const handleDateSelection = (cd) => {
        setSelectedDate(cd.date)
        setIsOpen(false)
    }
    HandleOutsideClick(calendarRef,setIsOpen)
    return (
        <div className="datepicker" ref={calendarRef}>
            <input
                type="text"
                className="dropdown--input"
                onFocus={() => setIsOpen(true)}
                value={selectedDate}
                readOnly
            >
            </input>
            {isOpen && <div className="datepicker--flyout">
                <Header handlePreviousMonth={handlePreviousMonth} handleNextMonth={handleNextMonth} monthLabel={selectedMonthLabel} />
                <DateRow weekDays={WEEKDAYS} />
                <div className="datepicker--calendar">
                    {selectedMonthDates.map(cd => {
                        if (cd.isCurrentMonth === true) {
                            return <button className="date" key={cd.date} onClick={()=>handleDateSelection(cd)}>{cd.dayOfMonth}</button>
                        }
                        else {
                            return <button className="date faded" disabled key={cd.date}>{cd.dayOfMonth}</button>
                        }
                    })}
                </div>
            </div>}
        </div>
    )
}
export default DatePicker
