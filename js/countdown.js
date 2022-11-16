function getTimeRemaining(endtime) {
    
    const total = Date.parse(endtime) - Date.parse(new Date()); //Calculate the end time minus the time now using the computer clock
    
    const seconds = Math.floor((total / 1000) % 60);
    //Calculate the number of seconds using our ‘total’ variable. In JavaScript 1000 is equal to 1 second. Since we’ll be setting our timer to 3 minutes, that equals 180000 (180 seconds x 1000). As you can see here we are converting the total into seconds (total / 1000), then the % (modulus) 60 ensures the result returned in whole seconds.
    
    const minutes = Math.floor((total / 1000 / 60) % 60);
    
    return { //This then returns the results
        total,
        minutes,
        seconds
    };
}
  
function initializeClock(id, endtime) {
    
    const clock = document.getElementById(id); //Reference the ID of the clock
    
    const minutesSpan = clock.querySelector('.minutes'); //Reference the minutes class
    
    const secondsSpan = clock.querySelector('.seconds'); //Reference the seconds class

//    const tryAgainButton = document.getElementById("tryAgain");

    function updateClock() {
        
        const t = getTimeRemaining(endtime); //Set t variable to the remaining time

        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2); //Dislay minutes in the minutes <span>

        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2); //Display seconds in the seconds <span>

        if (t.total <= 0) {
            //If the total time is equal to or less than 0 reset the clock
            clearInterval(timeinterval);
            showResults();            
            submitButton.style.display = 'none';
            previousButton.style.display = 'none';
            nextButton.style.display = 'none';
            tryAgainButton.style.display = 'inline-block';
        }else {
            tryAgainButton.style.display = 'none';
        }
    }

    updateClock();

    const timeinterval = setInterval(updateClock, 1000);
    //Update the clock every second (1000 = 1 second)

}

//Set the countdown timer to 3 minutes and initialise the clock 3 * 60 * 1000
const deadline = new Date(Date.parse(new Date()) + 5 * 1000);

initializeClock('clockdiv', deadline);

//Se agrega función del botón try again
function resetQuiz(){
    location.reload();
}

tryAgainButton.addEventListener("click", resetQuiz);

