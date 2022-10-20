function loseAlert(crossers) {
    let text = "You Lose!\nPress OK to Reset or Cancel to Study Your Mistakes!";
    if (confirm(text) == true) {
        crossers.forEach(element => {
            element.crossed = false;
        });
    } else {
        document.getElementById("left").classList.add('disabledbutton');
        document.getElementById("right").classList.add('disabledbutton');
    }
}

function winAlert(crossers) {
    let text = "You Win!\nPress OK to Reset or Bask In Your Glory";
    if (confirm(text) == true) {
        crossers.forEach(element => {
            element.crossed = false;
        });
    } else {
        document.getElementById("left").classList.add('disabledbutton');
        document.getElementById("right").classList.add('disabledbutton');
    }
}