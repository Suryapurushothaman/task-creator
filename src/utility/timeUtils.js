export const toSeconds = (t) => {

    let timeArr = t.split(':')
    timeArr[0] = timeArr[0] * 60 * 60;
    timeArr[1] = timeArr[1] * 60
    let seconds = timeArr[0] + timeArr[1]
    return seconds

}
export const secondsToHHMM=(seconds) => {
    if (!seconds) return '00:00';
   
    let duration = seconds;
    let hours = duration / 3600;
    duration = duration % (3600);
   
    let min = parseInt(duration / 60);
    duration = duration % (60);
   
    let sec = parseInt(duration);
   
    if (sec < 10) {
      sec = `0${sec}`;
    }
    if (min < 10) {
      min = `0${min}`;
    }
   
    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}:${min}`
    }
    else if (min === 0) {
      return '00:00'
    }
    else {
      return `00:${min}`
    }
  }

 export const timeGenerator = (startTime = 0, interval = 30) => {
    var x = interval; //minutes interval
    var times = []; // time array
    var tt = startTime; // start time

    //loop to increment the time and push results in array
    for (var i = 0; tt < 24 * 60; i++) {
        var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        var mm = (tt % 60); // getting minutes of the hour in 0-55 format
        times[i] =  hh + ':' + ("0" + mm).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
    }

    return times;
}