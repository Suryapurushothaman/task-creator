import { useState } from 'react'
import Header from './header'
import DateRow from './dayRow'
import dayjs from "dayjs";
import './date-picker.scss'
const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY = dayjs().format("YYYY-MM-DD");

const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");

function getWeekday(date) {
    return dayjs(date).weekday();
}

const getMonthLabel = (year = INITIAL_YEAR, month = INITIAL_MONTH) => {
    console.log(year,month)
    return (dayjs(
        new Date(year, month - 1)
    ).format("MMMM YYYY")
    )
}

function getNumberOfDaysInMonth(year, month) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
}

function getCalendarDates(year = INITIAL_YEAR, month = INITIAL_MONTH) {

    const currentMonthDays = createDaysForCurrentMonth(
        year,
        month,
        dayjs(`${year}-${month}-01`).daysInMonth()
    );

    const previousMonthDays = createDaysForPreviousMonth(year, month);

    const nextMonthDays = createDaysForNextMonth(year, month);

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

}

function createDaysForCurrentMonth(year, month) {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
        return {
            date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: true
        };
    });
}

function createDaysForPreviousMonth(year, month) {
    const currentMonthDays = createDaysForCurrentMonth(
        year,
        month,
        dayjs(`${year}-${month}-01`).daysInMonth()
    )
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);

    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
        return {
            date: dayjs(
                `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index
                }`
            ).format("YYYY-MM-DD"),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false
        };
    });
}

function createDaysForNextMonth(year, month) {
    const currentMonthDays = createDaysForCurrentMonth(
        year,
        month,
        dayjs(`${year}-${month}-01`).daysInMonth()
    )
    const lastDayOfTheMonthWeekday = getWeekday(
        `${year}-${month}-${currentMonthDays.length}`
    );

    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
            date: dayjs(
                `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
            ).format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: false
        };
    });
}


const DatePicker = () => {
    const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1)))
    const [selectedMonthDates, setSelectedMonthDates] = useState(getCalendarDates())
    const [selectedMonthLabel, setSelectedMonthLabel] = useState(getMonthLabel())
    const handlePreviousMonth = () => {
        const previousMonth = dayjs(selectedMonth).subtract(1, "month")
        setSelectedMonth(previousMonth);
        setSelectedMonthDates(getCalendarDates(previousMonth.format("YYYY"), previousMonth.format("M")));
        setSelectedMonthLabel(getMonthLabel(previousMonth.format("YYYY"), previousMonth.format("M")));
    }
    const handleNextMonth = () => {
        const nextMonth = dayjs(selectedMonth).add(1, "month")
        setSelectedMonth(nextMonth);
        setSelectedMonthDates(getCalendarDates(nextMonth.format("YYYY"), nextMonth.format("M")));
        setSelectedMonthLabel(getMonthLabel(nextMonth.format("YYYY"), nextMonth.format("M")));
    }
    const handleCurrentMonth = () => {
        const nextMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
        setSelectedMonth(nextMonth);
        setSelectedMonthDates(getCalendarDates(selectedMonth.format("YYYY"), selectedMonth.format("M")));
        setSelectedMonthLabel(getMonthLabel(selectedMonth.format("YYYY"), selectedMonth.format("M")));
    }
    const handleDateSelection =(cd)=>{
    console.log(cd)
    }
    return (
        <div className="datepicker">
            <Header handlePreviousMonth={handlePreviousMonth} handleNextMonth={handleNextMonth} monthLabel={selectedMonthLabel} />
            <DateRow weekDays={WEEKDAYS} />
            <div className="datepicker--calendar">
                {selectedMonthDates.map(cd => {
                    if (cd.isCurrentMonth === true) {
                        return <button className="date" key={cd.date} onClick={handleDateSelection(cd)}>{cd.dayOfMonth}</button>
                    }
                    else {
                        return <button className="date faded" disabled key={cd.date}>{cd.dayOfMonth}</button>
                    }
                })}
            </div>
        </div>)
}
export default DatePicker
