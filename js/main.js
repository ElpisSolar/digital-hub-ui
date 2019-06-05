/* Change language page content based on language settings */

var frenchToggle = document.getElementById("french-toggle");
var englishToggle = document.getElementById("english-toggle");
var frenchActive = false;
var englishActive = true;
var langModal = document.getElementById("lang-modal");
var conflict = false;

englishToggle.addEventListener("click", function(){

    var englishToggleBtn = englishToggle.childNodes[1];

    if (englishToggleBtn.classList.contains("active")) {
        console.log("english-active");
        englishActive = true;
    } else {
        console.log("english-inactive");
        englishActive = false;
    }

    if (englishActive == true && frenchActive == true) {
        console.log("conflict");
        conflict = true;
        langModal.style.display = "block";
    } else {
        conflict = false;
    }
})

frenchToggle.addEventListener("click", function(){

    var frenchToggleBtn = frenchToggle.childNodes[1];

    if (frenchToggleBtn.classList.contains("active")) {
        console.log("french-active");
        frenchActive = true;
    } else {
        console.log("french-inactive");
        frenchActive = false;
    }

    if (englishActive == true && frenchActive == true) {
        console.log("conflict");
        conflict = true;
        langModal.style.display = "block";
    }  else {
        conflict = false;
    }

})





/* add conditional statement where if both toggles are active modal appears. */