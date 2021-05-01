import './forms.scss'
import DatePicker from '../DatePicker'
import DropDown from '../DropDown'

const Forms = ()=>{
    const timeGenerator = (startTime = 0, interval = 30) => {
        var x = interval; //minutes interval
        var times = []; // time array
        var tt = startTime; // start time
        var ap = ['AM', 'PM']; // AM-PM
    
        //loop to increment the time and push results in array
        for (var i = 0; tt < 24 * 60; i++) {
          var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
          var mm = (tt % 60); // getting minutes of the hour in 0-55 format
          times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
          tt = tt + x;
        }
    
        return times;
      }
      const users = ['Ram','Dinesh','Kumar']
return(
    <form className='forms--wrapper'>
        <div className='forms--description'>
        <label className='forms--label'>Task Description</label>
        <input type='text' />
        </div>
        <div className='forms--date-time'>
        <div>
        <label className='forms--label'>Date</label>
        <DatePicker />
        </div>
        <div>
        <label className='forms--label'>Time</label>
        <DropDown values={timeGenerator()}/>
        </div>
        </div>
        <div className='forms--assign-user'>
        <label className='forms--label'>Assign User</label>
        <DropDown values={users}/>
        </div>
        <div className='forms--button-group'>
            <button type='button' className='forms--btn-cancel'>
                cancel
            </button>
            <button type='button' className='forms--btn-submit'>
                Submit
            </button>
            </div>
    </form>
)
}
export default Forms