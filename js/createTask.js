const taskListAdd = JSON.parse(localStorage.getItem("taskListStorage"));

//refresh the page once when reloading
window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

function updateSlider(value, parentID){
    const slider = document.getElementById(parentID);
    
    const sliderValue = slider.querySelector(".sliderValue");
    sliderValue.textContent = value;

    const sliderTrack = slider.querySelector(".sliderTrack")
    sliderTrack.style.width = `${(parseInt(value)+1)*100/11}%`
}

function isEmpty(elementID){
    return document.getElementById(elementID).value == ``;
}

function createTask() {
    if (isEmpty("taskName")) {
        console.log("error, fields not filled")
        alert(`Enter a name`);
    }
    else if (isEmpty("taskDescription")){
        console.log("error, fields not filled")
        alert(`Enter a description`);
    }
    else {
        // type
        typeOptions = document.getElementsByName("taskType");
        type = ""
        for (let option of typeOptions) {
            if (option.checked) {
                type = option.value;
            }
        }

        tagOptions = ["frontend", "backend", "api", "database", "framework", "testing", "ui", "ux"]
        tagSelected = []
        for (let tagValue of tagOptions) {
            if (document.getElementById(tagValue).checked){
                tagSelected.push(tagValue)
            }
        }
        if (tagSelected.length == 0) {
            console.log("error, no tags selected")
            alert(`Select at least 1 tag`);
            return
        }

        if (document.getElementById("storyPointsSlider").value != undefined) {
            storyPoints = document.getElementById("storyPointsSlider").value
        }
        
        // priority
        priorityLabels = document.getElementsByName("taskPriority");
        priority = ""
        for (let label of priorityLabels) {
            if (label.checked) {
                priority = label.value;
            }
        }

        let task = {
            taskName: document.getElementById("taskName").value,
            taskType: type,
            taskTag: tagSelected,
            taskPriority: priority,
            taskAssignee: null,
            taskStoryPoints: storyPoints,
            taskDescription: document.getElementById("taskDescription").value,
            taskProductionStage: "PLANNING",
            taskCreationDate: new Date().toLocaleDateString(),
            taskCompletion: "NotStarted",
            sprint: null,
            taskEndDate: null,
            timeSpent: null
        }
        if (typeof(Storage) != 'undefined'){
            console.log("Local storage available!");
            taskListAdd.push(task)
            localStorage.setItem('taskListStorage', JSON.stringify(taskListAdd)); //add it to local storage
            window.location.href=`./product-backlog.html`;
        }
        else{
            console.log("localStorage is not supported by current browser.");
        }
    }
}

// Get the createTaskModal
var createTaskModal = document.getElementById("createTaskModal");

function showCreateTaskModal() {
    createTaskModal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeCreateTaskModal() {
    createTaskModal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Get the modal
var modal = document.getElementById("modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    createTaskModal.style.display = "none";
  }
}