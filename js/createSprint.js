const sprintListAdd = JSON.parse(localStorage.getItem("sprintListStorage"));

function isEmpty(elementID){
    return document.getElementById(elementID).value == ``;
}

function createSprint() {
    if (isEmpty("sprintName")) {
        console.log("error, fields not filled")
        alert("Enter a name")
        } else if (isEmpty("sprintDescription")){
          console.log("error, fields not filled")
          alert("Enter a description")
        } else if (isEmpty("startDateInput")){
          console.log("error, fields not filled")
          alert("Enter a start date")
        } else if (isEmpty("endDateInput")){
          console.log("error, fields not filled")
          alert("Enter an end date")
        }
        else {
            let sprint = {
                sprintName: document.getElementById("sprintName").value,
                sprintDescription: document.getElementById("sprintDescription").value,
                sprintStartDate: document.getElementById("startDateInput").value,
                sprintEndDate: document.getElementById("endDateInput").value,
            }

            if (typeof(Storage) != 'undefined'){
                console.log("Local storage available!");
                sprintListAdd.push(sprint)
                localStorage.setItem('sprintListStorage', JSON.stringify(sprintListAdd)); //add it to local storage                
                window.location.href=`../views/sprint-view.html`
            }
            else{
                console.log("localStorage is not supported by current browser.");
            }
        }
    
}

// Get the modal
var modal = document.getElementById("modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var createSprintModal = document.getElementById("createSprintModal");

function showCreateSprintModal() {
    createSprintModal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeCreateSprintModal() {
    createSprintModal.style.display = "none";
    document.body.style.overflow = "auto";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}