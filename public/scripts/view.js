/*Get HTML Elements as JS objects */
const button = document.getElementById("submitPost");
const nameTitle = document.getElementById("title");
//const imageTitle = ;
const reviewText = document.getElementById("review");
const testing = document.getElementById("test");

/* Add Event Listener to button with callback function */
//button.addEventListener("click", postReview);

/* Callback function for event: Button click */
function postReview(){
    
}
document.getElementById("review-text").style.color = "#FFFFFF";
function submit(event){
    event.preventDefault();
}
document.getElementById('submitPost').addEventListener("click", function(){
    /* alerts were just me testig out to see if the right values were coming out */
    const testView = document.getElementById("test");
    /* Gets title selected and alert it */
    var e = nameTitle.value;
    alert(e);
    /* Gets rating and alert it */
    var radios = document.querySelector('input[name="rate"]:checked').value;
    alert(radios);
    /* Gets review input and alert it */
    alert(reviewText.value);

    // document.body.innerHTML = e;
    // document.body.innerHTML = radios;
    // document.body.innerHTML = reviewText.value;

    testView.innerHTML += e;
    testView.innerHTML += radios;
    testView.innerHTML += reviewText.value;

    /* This will set the IDs to white*/
    document.getElementById("review-text").style.color = "#FFFFFF";
    document.getElementById("user").style.color = "#FFFFFF";

    /* Reveal hidden card */
    document.querySelector("#review-container").style.visibility="visible";
    /* disables the submit button so that the form can stop refreshing the page */
    event.preventDefault;
});



