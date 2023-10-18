let taskList = JSON.parse(localStorage.getItem("taskListStorage"));
let sprint = JSON.parse(localStorage.getItem("SprintTask"));

const priorityMap = {
    'LOW': 0,
    'MEDIUM': 1,
    'IMPORTANT': 2,
    'URGENT': 3,
};

function displayTaskCard(listOfTask){
    for (var i=0; i < listOfTask.length; i++){
        if (listOfTask[i].sprint == null || listOfTask[i].sprint == sprint){
            document.getElementById("taskID").innerHTML += 
            `
            <div class="card-item">
                <div class="titleBox" style="text-align:left;">
                    <h2 class="name">${listOfTask[i].taskName}</h2>
                </div>
                <div class="txt-box">
                    <div class="col" style="text-align:left;">
                        <h5>${listOfTask[i].taskType}</h5>
                    </div>
                    <div class="col" style="text-align:left;">
                        <h5 class="${listOfTask[i].taskPriority}">${listOfTask[i].taskPriority}</h5>
                    </div>
                    <div class="col" style="text-align:left;">
                        <h5>${listOfTask[i].taskProductionStage}</h5>
                    </div>
                </div>
                <div class="col tagContainer" id="tagID${i}" style="text-align:left;">
                </div>
                <div class="storyPointsBG">
                    <div style="width: 100%;">
                        <div class="storyPoints" style="width: ${listOfTask[i].taskStoryPoints*10}%;">&nbsp;</div>
                    </div>
                    <div class="storyPointsNum">
                        <h5>${listOfTask[i].taskStoryPoints}</h5>
                    </div>
                </div>

                <div class="card-footer" style="text-align: left;">
                    <button type="button" class="btn-primary" id="${i}", style="font-size: 14px;" onclick="selectUnselect(${i})">Select</button>
                </div>
            </div>`;

            if (listOfTask[i].sprint == sprint) {
                var button = document.getElementById(i);
                button.textContent = 'Unselect';
                button.classList.remove("btn-primary");
                button.classList.add("btn-secondary");
            }

            for(let tag of listOfTask[i].taskTag) {
                document.getElementById("tagID" + i).innerHTML += 
                    `<p class="static-${tag}" style="display: inline;">
                        ${tag}
                    </p>`;
            }
        }
    }
    // ensures last item width displays correctly
    for (var i=0; i < 8; i++){
        document.getElementById("taskID").innerHTML += `
        <div class="card-item-spacer">
        </div>`;
    }
}

sort();

function selectUnselect(taskIndex){
    var elem = document.getElementById(taskIndex);
    if (elem.textContent == 'Select'){
        elem.textContent = 'Unselect';
        elem.classList.remove("btn-primary");
        elem.classList.add("btn-secondary");
        taskList[taskIndex].sprint = sprint;
    }
    else if (elem.textContent == 'Unselect'){
        elem.textContent = 'Select';
        elem.classList.remove("btn-secondary");
        elem.classList.add("btn-primary");
        taskList[taskIndex].sprint = null;
    }
}

function confirmSelection(){
    localStorage.setItem("taskListStorage",JSON.stringify(taskList));
    window.location.href ="./sprint-backlog.html";
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

function sort(){
    document.getElementById("taskID").innerHTML = "";

    if (document.getElementById('sortOptions').value == "priorityHighest"){
        taskList = taskList.sort((a,b) => priorityMap[b.taskPriority] - priorityMap[a.taskPriority])
    }

    else if (document.getElementById('sortOptions').value == "priorityLowest"){
        taskList = taskList.sort((a,b) => priorityMap[a.taskPriority] - priorityMap[b.taskPriority])
    }
    localStorage.setItem("taskListStorage", JSON.stringify(taskList))
    displayTaskCard(taskList)
    
} 