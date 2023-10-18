//refresh the page once when reloading
window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        // window.location.reload();
    }
}

function isEmpty(elementID){
    return document.getElementById(elementID).value == ``;
}

// Get the createTaskModal
var createTaskModal = document.getElementById("helpModal");

function showHelpModal() {
    createTaskModal.style.display = "block";
}

function closeHelpModal() {
    createTaskModal.style.display = "none";
}

// Get the modal
var modal = document.getElementById("modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    createTaskModal.style.display = "none";
  }
}