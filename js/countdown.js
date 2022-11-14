function getTimeRemaining(endtime) {
    //Open function to get the remaining time with a parameter of ‘endtime’ so that we can return the result and use it outside of this function
    
    const total = Date.parse(endtime) - Date.parse(new Date());
    //Calculate the end time minus the time now using the computer clock
    
    const seconds = Math.floor((total / 1000) % 60);
    //Calculate the number of seconds using our ‘total’ variable. In JavaScript 1000 is equal to 1 second. Since we’ll be setting our timer to 3 minutes, that equals 180000 (180 seconds x 1000). As you can see here we are converting the total into seconds (total / 1000), then the % (modulus) 60 ensures the result returned in whole seconds.
    
    const minutes = Math.floor((total / 1000 / 60) % 60);
    /*Here we are doing the same as above with the addition of a further /
    60, or in other words converting total into the number of minutes. */
    
    return { //This then returns the results
        total,
        minutes,
        seconds
    };
}
  
function initializeClock(id, endtime) {
    //Open a function to initialise the clock
    
    const clock = document.getElementById(id);
    //Reference the ID of the clock
    
    const minutesSpan = clock.querySelector('.minutes');
    //Reference the minutes class
    
    const secondsSpan = clock.querySelector('.seconds');
    //Reference the seconds class

    function updateClock() {
        //Open the update clock function
        
        const t = getTimeRemaining(endtime);
        //Set t variable to the remaining time

        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        //Dislay minutes in the minutes <span>

        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        //Display seconds in the seconds <span>

        if (t.total <= 0) {
            clearInterval(timeinterval);
            //If the total time is equal to or less than 0 reset the clock
        }
    }

    updateClock();

    const timeinterval = setInterval(updateClock, 1000);
    //Update the clock every second (1000 = 1 second)

}

const deadline = new Date(Date.parse(new Date()) + 3 * 60 * 1000);
initializeClock('clockdiv', deadline);
//Set the countdown timer to 3 minutes and initialise the clock
