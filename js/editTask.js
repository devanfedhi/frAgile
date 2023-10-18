let indexToEdit = JSON.parse(localStorage.getItem("editIndex"));

// //adding place holder and values
// document.getElementById("edit-taskName").value = taskList[indexToEdit].taskName;

// const typeOptions = document.getElementsByName("edit-taskType");
// for (let option of typeOptions) {
//     if (option.value == taskList[indexToEdit].taskType) {
//         option.checked = true;
//     }
// }

// const tagOptions = ["frontend", "backend", "api", "database", "framework", "testing", "ui", "ux"]
// tagSelected = taskList[indexToEdit].taskTag;
// for (let tagValue of tagSelected) {
//     document.getElementById(`edit-${tagValue}`).checked = true;
// }

// // priority
// const priorityLabels = document.getElementsByName("edit-taskPriority");
// for (let label of priorityLabels) {
//     if (label.value == taskList[indexToEdit].taskPriority) {
//         label.checked = true;
//     }
// }

// document.getElementById("edit-storyPoints").value = taskList[indexToEdit].taskStoryPoints;

// const productionStages = document.getElementsByName("edit-taskProductionStage");
// for (let stage of productionStages) {
//     if (stage.value == taskList[indexToEdit].taskProductionStage) {
//         stage.checked = true;
//     }
// }

// document.getElementById('assignee').value = taskList[indexToEdit].taskAssignee;

// // document.getElementById("taskProductionStage").options[0].textContent = taskList[indexToEdit].taskProductionStage

// document.getElementById('edit-taskDescription').value = taskList[indexToEdit].taskDescription;

// taskCreationDate = taskList[indexToEdit].taskCreationDate;
function editInit(){
    document.getElementById("edit-taskName").value = taskList[indexToEdit].taskName;
    document.getElementById("edit-taskDescription").value = taskList[indexToEdit].taskDescription;
    
    const typeOptions = document.getElementsByName("edit-taskType");
    for (let option of typeOptions) {
        if (option.value == taskList[indexToEdit].taskType) {
            option.checked = true;
        }   
    }

    document.getElementsByName("edit-taskTag").forEach(function(tag) {tag.checked = false});
    
    tagSelected = taskList[indexToEdit].taskTag;
    for (let tagValue of tagSelected) {
        document.getElementById(`edit-${tagValue}`).checked = true;
    }

    document.getElementById(`edit-${taskList[indexToEdit].taskPriority}`).checked = true;

    document.getElementById(`edit-${taskList[indexToEdit].taskProductionStage}`).checked = true;
    
    document.getElementById("edit-assignee").value = taskList[indexToEdit].taskAssignee;

    document.getElementById("edit-storyPointsSlider").value = taskList[indexToEdit].taskStoryPoints;
    updateSlider(taskList[indexToEdit].taskStoryPoints, "edit-slider")
}


function isEmpty(elementID){
    return document.getElementById(elementID).value == ``;
}

function toEditPage(indexEdit){
    localStorage.setItem('editIndex', JSON.stringify(indexEdit));
    indexToEdit = indexEdit;    
    // window.location ='edit-task-product.html';
    editInit();
    showEditTaskModal();
}

function toEditPageNoIndex(){
    // window.location ='edit-task-product.html';
    editInit();
    showEditTaskModal();
}

// Get the createTaskModal
var editTaskModal = document.getElementById("editTaskModal");

function showEditTaskModal() {
    editTaskModal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeEditTaskModal() {
    editTaskModal.style.display = "none";
    document.body.style.overflow = "auto";
}

//Saving the edited task, similar to creating
function saveEditTask(){
    if (isEmpty("edit-taskName")) {
        console.log("error, fields not filled");
        alert(`Enter a name`);
    } else if (isEmpty("edit-taskDescription")) {
        console.log("error, fields not filled");
        alert(`Enter a description`);
    }
    else{
        // type
        let type = "";
        const typeOptions = document.getElementsByName("edit-taskType");
        for (let option of typeOptions) {
            if (option.checked) {
                type = option.value;
            }
        }
        let tagSelected = [];
        const tagOptions = document.getElementsByName("edit-taskTag");
        for (let tagValue of tagOptions) {
            if (tagValue.checked){
                tagSelected.push(tagValue.value);
            }
        }

        if (tagSelected.length == 0) {
            console.log("error, no tags selected");
            alert(`Select at least 1 tag`);
            return
        }
        // priority
        let priority = "";
        const priorityLabels = document.getElementsByName("edit-taskPriority");
        for (let label of priorityLabels) {
            if (label.checked) {
                priority = label.value;
            }
        }

        // production
        let stage = "";
        const productionStages = document.getElementsByName("edit-taskProductionStage");
        for (let stageOption of productionStages) {
            if (stageOption.checked) {
                stage = stageOption.value;
            }
        }

        taskCreationDate = taskList[indexToEdit].taskCreationDate;

        let editedTask = {
            taskName: document.getElementById("edit-taskName").value,
            taskType: type,
            taskTag: tagSelected,
            taskPriority: priority,
            taskAssignee: document.getElementById("edit-assignee").value,
            taskStoryPoints: document.getElementById("edit-storyPointsSlider").value,
            taskDescription: document.getElementById("edit-taskDescription").value,
            taskProductionStage: stage,
            taskCreationDate: taskCreationDate,
            taskCompletion: taskList[indexToEdit].taskCompletion,
            sprint: taskList[indexToEdit].sprint,
            taskEndDate: taskList[indexToEdit].taskEndDate,
            timeSpent: taskList[indexToEdit].taskEndDate
        };

        if (typeof(Storage) != 'undefined'){
            console.log("Local storage available!");
            taskList.splice(indexToEdit, 1);
            taskList.splice(indexToEdit, 0, editedTask);
            localStorage.setItem('taskListStorage', JSON.stringify(taskList)); //add it to local storage
            window.location.href=`./product-backlog.html`;
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


// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}