const Header = ({handlePreviousMonth,handleNextMonth,monthLabel})=>{
    return (
        <div className="datepicker--month-selector">
                <button className="arrow" onClick={handlePreviousMonth}>{'<<'}</button>
                <span className="month-label">{monthLabel}</span>
                <button className="arrow" onClick={handleNextMonth}>{'>>'}</button>
        </div>
    )
}
export default Header