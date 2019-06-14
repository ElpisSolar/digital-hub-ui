/* DOM elements */
var frenchToggle = document.getElementById("french-toggle");
var englishToggle = document.getElementById("english-toggle");
var startLink = document.getElementById("startLink");
var langModal = document.getElementById("lang-modal");
var langNotice = document.getElementById("lang-notice");

/* state variables */
var frenchActive = false;
var englishActive = false;

/* language notice html content*/
var frenchNoticeContent = "<h6><b style='text-decoration: underline'>Remarque:</b> Le choix de la langue a une incidence sur le contenu qui vous est offert. Vous pouvez toujours changer la langue de la plate-forme dans Paramètres</em>.</h6>"
var englishNoticeContent = "<h6><b style='text-decoration: underline'>Note:</b> Language choice impacts the content that is available to you. You can always change the platform language in <em>Settings</em>.</h6>"
var englishSiteLink = "http://localhost/content/en/nav/start-en.html"
var frenchSiteLink = "http://localhost/content/fr/nav/start-fr.html"

/* language toggle event-listeners */
frenchToggle.addEventListener("click", function () {

    var frenchToggleBtn = frenchToggle.childNodes[1];

    if (frenchToggleBtn.classList.contains("active")) {
        console.log("french-active");
        frenchActive = true;
    } else {
        console.log("french-inactive");
        frenchActive = false;
    }

    if (englishActive == true && frenchActive == true) {
        langModal.style.display = "block";
        startLink.style.color = "gainsboro"
        startLink.href = "";
        langNotice.innerHTML = ""
    } else if (englishActive == false && frenchActive == true) {
        langNotice.innerHTML = frenchNoticeContent;
        startLink.style.color = "#428bca"
        startLink.href = frenchSiteLink;
        langModal.style.display = "none";
    } else if (englishActive == true && frenchActive == false) {
        langNotice.innerHTML = englishNoticeContent;
        startLink.style.color = "#428bca"
        startLink.href = englishSiteLink;
        langModal.style.display = "none"
    } else if (englishActive == false && frenchActive == false) {
        langNotice.innerHTML = ""
        startLink.href = "";
        startLink.style.color = "gainsboro"
    }
})

englishToggle.addEventListener("click", function () {

    var englishToggleBtn = englishToggle.childNodes[1];

    if (englishToggleBtn.classList.contains("active")) {
        englishActive = true;
    } else {
        englishActive = false;
    }

    if (englishActive == true && frenchActive == true) {
        langModal.style.display = "block";
        langNotice.innerHTML = ""
        startLink.href = "";
        startLink.style.color = "gainsboro"
    } else if (englishActive == false && frenchActive == true) {
        langNotice.innerHTML = frenchNoticeContent;
        startLink.style.color = "#428bca"
        startLink.href = frenchSiteLink;
        langModal.style.display = "none";
    } else if (englishActive == true && frenchActive == false) {
        langNotice.innerHTML = englishNoticeContent;
        startLink.style.color = "#428bca"
        startLink.href = englishSiteLink;
        langModal.style.display = "none";
    } else if (englishActive == false && frenchActive == false) {
        langNotice.innerHTML = ""
        startLink.href = "";
        startLink.style.color = "gainsboro"
    }
})
