let indexToEdit = JSON.parse(localStorage.getItem("editIndex"));
let taskList = JSON.parse(localStorage.getItem("taskListStorage"))

//adding place holder and values
document.getElementById("taskName").value = taskList[indexToEdit].taskName;

taskCreationDate = taskList[indexToEdit].taskCreationDate;

function isEmpty(elementID){
    return document.getElementById(elementID).value == ``;
}

//Saving the edited task, similar to creating
function saveEditTask(backhref){
    if (isEmpty("assignee") || isEmpty("endTaskDateInput") || isEmpty("timeSpentInput")) {
        console.log("error, fields not filled")
        alert("All fields have to be filled :(");
    }
    else{
        let editedTask = {
            taskName: taskList[indexToEdit].taskName,
            taskType: taskList[indexToEdit].taskType,
            taskTag: taskList[indexToEdit].taskTag,
            taskPriority: taskList[indexToEdit].taskPriority,
            taskAssignee: document.getElementById("assignee").value,
            taskStoryPoints: taskList[indexToEdit].taskStoryPoints,
            taskDescription: taskList[indexToEdit].taskDescription,
            taskProductionStage: taskList[indexToEdit].taskProductionStage,
            taskCreationDate: taskCreationDate,
            taskCompletion: "Complete",
            sprint: taskList[indexToEdit].sprint,
            taskEndDate: document.getElementById("endTaskDateInput").value,
            timeSpent: document.getElementById("timeSpentInput").value
        }

        if (typeof(Storage) != 'undefined'){
            console.log("Local storage available!");
            taskList.splice(indexToEdit, 1);
            taskList.splice(indexToEdit, 0, editedTask);
            localStorage.setItem('taskListStorage', JSON.stringify(taskList)); //add it to local storage
            window.location.href=backhref;
        }
        else{
            console.log("localStorage is not supported by current browser.");
        }
    }
}

var modal = document.getElementById("editTaskModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function deleteTask(index){
    // document.getElementById("modal-text").innerHTML = `Do you want to delete this task?`;
    // modal.style.display = "block";
    taskIndex = index;
    confirm("Are you sure you want to delete this task?") ? confirmDelete() : null;
    
}

function confirmDelete(){
    taskList.splice(taskIndex,1)
    localStorage.setItem("taskListStorage", JSON.stringify(taskList))
    location.reload()
}

function dismiss(){
    modal.style.display = "none";
}

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
//   }
  
  // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }