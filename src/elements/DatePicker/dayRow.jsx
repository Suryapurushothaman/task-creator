const DateRow = ({ weekDays }) => {
    return (
        <div className='datepicker--weekdays'>
            {weekDays.map((weekday) => {
                return <span key={weekday} className="day">{weekday}</span>
            })}
        </div>
    )
}
export default DateRow