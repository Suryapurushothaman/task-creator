import dayjs from "dayjs";

const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY = dayjs().format("YYYY-MM-DD");
const INITIAL_TIME = dayjs().format("HH:mm")

const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");

const getWeekday=(date) =>{
    return dayjs(date).weekday();
}

const getMonthLabel = (year = INITIAL_YEAR, month = INITIAL_MONTH) => {
    return (dayjs(
        new Date(year, month - 1)
    ).format("MMMM YYYY")
    )
}

const getNumberOfDaysInMonth = (year, month) =>{
    return dayjs(`${year}-${month}-01`).daysInMonth();
}

const getCalendarDates=(year = INITIAL_YEAR, month = INITIAL_MONTH)=> {

    const currentMonthDays = createDaysForCurrentMonth(
        year,
        month,
        dayjs(`${year}-${month}-01`).daysInMonth()
    );

    const previousMonthDays = createDaysForPreviousMonth(year, month);

    const nextMonthDays = createDaysForNextMonth(year, month);

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

}

const createDaysForCurrentMonth=(year, month)=> {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
        return {
            date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: true,
            idDateSelected: false
        };
    });
}

const createDaysForPreviousMonth=(year, month) =>{
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
            isCurrentMonth: false,
            idDateSelected: false
        };
    });
}

const createDaysForNextMonth=(year, month)=> {
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
            isCurrentMonth: false,
            idDateSelected: false
        };
    });
}

export {INITIAL_YEAR,INITIAL_MONTH,WEEKDAYS,TODAY,INITIAL_TIME,getMonthLabel,getNumberOfDaysInMonth,getCalendarDates,createDaysForCurrentMonth,createDaysForPreviousMonth,createDaysForNextMonth}