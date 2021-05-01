const DateRow = ({ weekDays }) => {
    return (
        <div className='datepicker--weekdays'>
            {weekDays.map((weekday) => {
                return <span className="day">{weekday}</span>
            })}
        </div>
    )
}
export default DateRow