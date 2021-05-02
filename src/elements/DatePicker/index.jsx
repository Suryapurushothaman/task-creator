import { useState,useRef,useEffect} from 'react'
import DateRangeIcon from '@material-ui/icons/DateRange';
import dayjs from "dayjs";
import Header from './header'
import DateRow from './dayRow'
import {HandleOutsideClick} from '../../utility/handleOutsideClick'
import {INITIAL_YEAR,INITIAL_MONTH,WEEKDAYS,TODAY,getMonthLabel,getCalendarDates} from './dateUtils' 
import './date-picker.scss'

const DatePicker = ({initialDate,handleDateCallback}) => {
    const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1)))
    const [selectedMonthDates, setSelectedMonthDates] = useState(getCalendarDates())
    const [selectedMonthLabel, setSelectedMonthLabel] = useState(getMonthLabel())
    const [isOpen,setIsOpen] = useState(false)
    const [selectedDate,setSelectedDate] = useState(dayjs(initialDate).format("MM/DD/YYYY"))
    const calendarRef = useRef();
    useEffect(()=>{
        setSelectedMonthDates(getCalendarDates(selectedMonth.format("YYYY"), selectedMonth.format("M")));
        setSelectedMonthLabel(getMonthLabel(selectedMonth.format("YYYY"), selectedMonth.format("M")));
    },[selectedMonth])
    const handlePreviousMonth = () => {
        setSelectedMonth(selectedMonth.subtract(1, "month"));
    }
    const handleNextMonth = () => {
        setSelectedMonth(selectedMonth.add(1, "month"));   
    }
    const handleCurrentMonth = () => {
        const nextMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
        setSelectedMonth(nextMonth);
        setSelectedMonthDates(getCalendarDates(selectedMonth.format("YYYY"), selectedMonth.format("M")));
        setSelectedMonthLabel(getMonthLabel(selectedMonth.format("YYYY"), selectedMonth.format("M")));
    }
    const handleDateSelection = (cd) => {
        setSelectedDate(dayjs(cd.date).format("MM/DD/YYYY"))
        handleDateCallback(dayjs(cd.date).format("MM/DD/YYYY"))
        setIsOpen(false)
    }
    HandleOutsideClick(calendarRef,setIsOpen)
    return (
        <div className="datepicker" ref={calendarRef}>
            <span className="dropdown--icon">
            <DateRangeIcon/>
            </span>
            <input
                type="text"
                className="datepicker--input"
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
                        const dateClass = `date ${cd.isCurrentMonth === true ? '' : 'faded' } ${cd.date === dayjs(selectedDate).format("YYYY-MM-DD") ? 'selected': '' }`
                            return <button className={dateClass} key={cd.date} onClick={()=>handleDateSelection(cd)}>{cd.dayOfMonth}</button>
                    })}
                </div>
            </div>}
        </div>
    )
}
export default DatePicker
