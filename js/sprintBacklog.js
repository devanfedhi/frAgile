let taskList = JSON.parse(localStorage.getItem("taskListStorage"));
let sprint = JSON.parse(localStorage.getItem("SprintTask"));

sprintTaskList = [];
for (var i=0; i < taskList.length; i++){
    if (taskList[i].sprint == sprint){
        sprintTaskList.push(taskList[i])
    }
}

let sortList = sprintTaskList.slice();

document.getElementById("sprint-backlog-title").innerHTML += ` / ${sprint}`;

const priorityMap = {
    'LOW': 0,
    'MEDIUM': 1,
    'IMPORTANT': 2,
    'URGENT': 3,
};

const completionStageMap = {
    'NotStarted': 0,
    'InProgress': 1,
    'Complete': 2,
};

viewTypeChange()

let taskIndex = 0;
var modal = document.getElementById("modal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function deleteTask(index){
    document.getElementById("modal-text").innerHTML = `Do you want to delete this task?`;
    modal.style.display = "block";
    taskIndex = taskList.findIndex((item) => item.taskName === sprintTaskList[index].taskName);
}

function confirmDelete(){
    taskList.splice(taskIndex,1)
    localStorage.setItem("taskListStorage", JSON.stringify(taskList))
    location.reload()
}

function removeTask(index){
    taskList[index].sprint = null;
    localStorage.setItem("taskListStorage", JSON.stringify(taskList))
    location.reload()
}

function toEditPage(indexEdit){
    var taskToFind = sprintTaskList[indexEdit]
    var taskIndex = taskList.findIndex((item) => item.taskName === taskToFind.taskName);
    localStorage.setItem('editIndex', JSON.stringify(taskIndex));    
    window.location ='edit-task-sprint.html';
}

function toViewTaskPage(indexEdit){
    var taskToFind = sprintTaskList[indexEdit]
    var taskIndex = taskList.findIndex((item) => item.taskName === taskToFind.taskName);
    localStorage.setItem('editIndex', JSON.stringify(taskIndex));    
    window.location ='task-log-time.html';
}


function saveCompletion(index, completionStage) {
    if (typeof(Storage) != 'undefined'){
        editedTask=sortList[index];
        editedTask["taskCompletion"] = completionStage;
        sortList.splice(index, 1);
        sortList.splice(index, 0, editedTask);
        viewTypeChange()
    }
    else{
        console.log("localStorage is not supported by current browser.");
    }
}

function dismiss(){
    modal.style.display = "none";
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

function viewTypeChange(){
    if (document.getElementById("display-mode").checked==true) {
        document.getElementById("display-mode-label").innerHTML = "Kanban View";
        document.getElementById("list-view").style.display = "none";
        document.getElementById("kanban-view").style.display = "block";
        sortForKanban();
    }
    else {
        document.getElementById("display-mode-label").innerHTML = "List View";
        document.getElementById("list-view").style.display = "block";
        document.getElementById("kanban-view").style.display = "none";
        sortForList();
    }
}

function sortForList(){
    document.getElementById("list").innerHTML = "";
    document.getElementById("list_not_started").innerHTML = "";
    document.getElementById("list_in_progress").innerHTML = "";
    document.getElementById("list_completed").innerHTML = "";
    
    if (document.getElementById("list_sort_options").value == "completionStage"){
        for (let element of document.getElementsByClassName("title-divider")){
            element.style.display="block";
        }
        let notStartedList = sortList.slice().filter(task => task.taskCompletion == "NotStarted");
        inProgressList = sortList.slice().filter(task => task.taskCompletion == "InProgress");
        completedList = sortList.slice().filter(task => task.taskCompletion == "Complete");
        sortList = notStartedList.concat(inProgressList).concat(completedList);
        displayTasks(sortList, "_not_started", 0, notStartedList.length);
        displayTasks(sortList, "_in_progress", notStartedList.length, notStartedList.length+inProgressList.length);
        displayTasks(sortList, "_completed", notStartedList.length+inProgressList.length);
        return
    }
    else if (document.getElementById("list_sort_options").value == "priorityHighest"){
        sortList = sortList.sort((a,b) => priorityMap[b.taskPriority] - priorityMap[a.taskPriority])
    }
    else if (document.getElementById("list_sort_options").value == "priorityLowest"){
        sortList = sortList.sort((a,b) => priorityMap[a.taskPriority] - priorityMap[b.taskPriority])
    }

    for (let element of document.getElementsByClassName("title-divider")){
        element.style.display="none";
    }

    displayTasks(sortList)
} 

function sortForKanban() {
    document.getElementById("kanban_not_started").innerHTML = "";
    document.getElementById("kanban_in_progress").innerHTML = "";
    document.getElementById("kanban_completed").innerHTML = "";

    for (let element of document.getElementsByClassName("title-divider")){
        element.style.display="block";
    }

    let notStartedList = kanbanSorter(sortList.slice().filter(task => task.taskCompletion == "NotStarted"));
    inProgressList = kanbanSorter(sortList.slice().filter(task => task.taskCompletion == "InProgress"));
    completedList = kanbanSorter(sortList.slice().filter(task => task.taskCompletion == "Complete"));
    sortList = notStartedList.concat(inProgressList).concat(completedList);
    displayTasks(sortList, "_not_started", 0, notStartedList.length);
    displayTasks(sortList, "_in_progress", notStartedList.length, notStartedList.length+inProgressList.length);
    displayTasks(sortList, "_completed", notStartedList.length+inProgressList.length);
    return
}

function kanbanSorter(list){
    if (document.getElementById("kanban_sort_options").value == "priorityHighest"){
        return list.sort((a,b) => priorityMap[b.taskPriority] - priorityMap[a.taskPriority])
    }
    else if (document.getElementById("kanban_sort_options").value == "priorityLowest"){
        return list.sort((a,b) => priorityMap[a.taskPriority] - priorityMap[b.taskPriority])
    }
    else {
        return list
    }
}
function displayTasks(listOfTask, elementID="", iStart = 0, iEnd=Infinity){
    // list display
    if (document.getElementById("display-mode").checked==false) {
        displayTaskList(listOfTask, elementID, iStart, iEnd);
    }
    // kanban display
    else {
        displayTaskCard(listOfTask, elementID, iStart, iEnd);
    }
}

function displayTaskList(listOfTask, elementID="", iStart = 0, iEnd=Infinity){  
    elementID = "list" + elementID;
    document.getElementById(elementID).innerHTML +=
    `<table id="taskID_table" width="100%" table-layout="auto" white-space="nowrap";>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Production Stage</th>
            <th>Tags</th>
            <th>Story Points</th>
            <th>Completion Status</th>
        </tr>
    </thead>
    <tbody id="${elementID}_table_data">
    </tbody>
    </table>`;

    table = document.getElementById(elementID + "_table_data");
    for (var i=iStart; (i < listOfTask.length && i < iEnd); i++){
        
        const name = listOfTask[i].taskName;
        const type = listOfTask[i].taskType;
        const priority = listOfTask[i].taskPriority;
        const productionStage = listOfTask[i].taskProductionStage;
        let completionSelected = ["", "", ""]
        completionSelected[completionStageMap[listOfTask[i].taskCompletion]] = "selected"
        const storyPoints = listOfTask[i].taskStoryPoints;

        const row = document.createElement("tr");
        row.innerHTML = `
        <td><p>${name}</p></td>
        <td><p>${type}</p></td>
        <td><p class="${priority}">${priority}</p></td>
        <td><p>${productionStage}</p></td>
        <td><div class="tagContainer" id="tagID${i}" style="text-align:left;"></div></td>
        <td><div class="storyPointsNum storyPointsBG"><h5>${storyPoints}</h5></div></td>
        <td><select class="dropdown small" name="completionStatus" onchange="saveCompletion(${i},this.value)";>
            <option value="NotStarted" ${completionSelected[0]}>Not Started</option>
            <option value="InProgress" ${completionSelected[1]}>In Progress</option>
            <option value="Complete" ${completionSelected[2]}>Complete</option>
            </select></td>
        <td><div class="btn-wrapper" style="color: white;">
        <button type="button" class="btn-primary" style="font-size: 14px;" onclick="toViewTaskPage(${i})">View</button>
        <button type="button" class="btn-primary" style="font-size: 14px;" onclick="toEditPage(${i})">Edit</button>
        <button type="button" class="btn-destructive" style="font-size: 14px;" onclick="deleteTask(${i})">Delete</button></div></td>
        `;
        table.appendChild(row);

        for(let tag of listOfTask[i].taskTag) {
            document.getElementById("tagID" + i).innerHTML += 
                `<p class="static-${tag}" style="display: inline;">
                    #${tag}
                </p>`;
        }
    }
}

function displayTaskCard(listOfTask, elementID="", iStart = 0, iEnd=Infinity){
    elementID = "kanban" + elementID;
    for (var i=iStart; (i < listOfTask.length && i < iEnd); i++){

        const name = listOfTask[i].taskName;
        const type = listOfTask[i].taskType;
        const priority = listOfTask[i].taskPriority;
        const productionStage = listOfTask[i].taskProductionStage;
        let completionSelected = ["", "", ""]
        completionSelected[completionStageMap[listOfTask[i].taskCompletion]] = "selected"
        const storyPoints = listOfTask[i].taskStoryPoints;

        document.getElementById(elementID).innerHTML += 
            `
            <div class="card-item">
                <div class="titleBox" style="text-align:left;">
                    <h2 class="name">${name}</h2>
                    </div>
                    <div class="txt-box">
                    <div class="col" style="text-align:left;">
                        <h5>${type}</h5>
                    </div>
                    <div class="col" style="text-align:left;">
                        <h5 class="${priority}">${priority}</h5>
                    </div>
                    <div class="col" style="text-align:left;">
                        <h5>${productionStage}</h5>
                    </div>
                </div>
                <div class="col tagContainer" id="tagID${i}" style="text-align:left;">
                </div>
                <div class="storyPointsBG">
                    <div style="width: 100%;">
                        <div class="storyPoints" style="width: ${storyPoints*10}%;">&nbsp;</div>
                    </div>
                    <div class="storyPointsNum">
                        <h5>${storyPoints}</h5>
                    </div>
                </div>
                <select class="dropdown" name="completionStatus" id="card-size" onchange="saveCompletion(${i},this.value)";>
                    <option value="NotStarted" ${completionSelected[0]}>Not Started</option>
                    <option value="InProgress" ${completionSelected[1]}>In Progress</option>
                    <option value="Complete" ${completionSelected[2]}>Complete</option>
                </select>
                <div class="card-footer" style="text-align: left;">
                    <button type="button" class="btn-primary" style="font-size: 14px;" onclick="toViewTaskPage(${i})">View</button>
                    <button type="button" class="btn-primary" style="font-size: 14px;" onclick="toEditPage(${i})">Edit</button>
                    <button type="button" class="btn-destructive" style="font-size: 14px;" onclick="deleteTask(${i})">Delete</button>
                </div>
            </div>`;

        for(let tag of listOfTask[i].taskTag) {
            document.getElementById("tagID" + i).innerHTML += 
                `<p class="static-${tag}" style="display: inline;">
                    #${tag}
                </p>`;
        }
    }
    // ensures last item width displays correctly
    for (var i=0; i < 8; i++){
        document.getElementById(elementID).innerHTML += `
        <div class="card-item-spacer">
        </div>`;
    }
}