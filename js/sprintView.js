let sprintList = JSON.parse(localStorage.getItem("sprintListStorage"));
let spintArchive = JSON.parse(localStorage.getItem("archivedSprintListStorage"));

function displaySprintCard(listOfSprints){
    
    for (var i=0; i < listOfSprints.length; i++){
        document.getElementById("sprintID").innerHTML += 
            `
            <div class="card-item-big">
                <div style="text-align:left;">
                    <h2 title="Sprint Name">${listOfSprints[i].sprintName}</h2>
                </div>
                <div>
                    <div class="tagContainer" style="text-align:left;">
                        <p class="display-date" title="Start Date">${listOfSprints[i].sprintStartDate}</p>
                        <p class="display-date" title="End Date">${listOfSprints[i].sprintEndDate}</p>
                    </div>
                </div>

                <div style="text-align: left;">
                    <div class="btn-wrapper-sml" style="color: white;">
                        <button type="button" class="btn-primary" style="font-size: 14px;" onclick="viewSprintTask(${i})">View</button>
                        <button type="button" class="btn-secondary" style="font-size: 14px;" onclick="archiveSprint(${i})">Archive</button>
                        <button type="button" class="btn-destructive" style="font-size: 14px;" onclick="deleteSprint(${i})">Delete</button>
                    </div>
                </div>
            </div>`;
    }
    // ensures last item width displays correctly
    for (var i=0; i < 8; i++){
        document.getElementById("sprintID").innerHTML += `
        <div class="card-item-big-spacer">
        </div>`;
    }
}

displaySprintCard(sprintList);

function toEditPage(indexEdit){
    localStorage.setItem('editIndex', JSON.stringify(indexEdit));    
    window.location ='edit-sprint.html';
}

let sprintIndex = 0;
var modal = document.getElementById("modal");

function deleteSprint(index){
    sprintIndex = index;
    confirm("Are you sure you want to delete this sprint?") ? confirmDelete() : null;
}

function archiveSprint(index){
    sprintIndex = index;
    confirm("Are you sure you want to archive this task?") ? confirmArchiveSprint(index) : null;
}

function confirmArchiveSprint(index) {
    // Retrieve the selected sprint from the current list
    const selectedSprint = sprintList[index];
  
    // Add the selected sprint to the archived sprint list storage
    spintArchive.push(selectedSprint);
    localStorage.setItem('archivedSprintListStorage', JSON.stringify(spintArchive));
  
    // Remove the selected sprint from the current sprint list
    sprintList.splice(index, 1);
    localStorage.setItem('sprintListStorage', JSON.stringify(sprintList));
  
    // Reload the sprint view to reflect the changes
    location.reload();
  }

function confirmDelete(){
    sprintList.splice(sprintIndex, 1)
    localStorage.setItem("sprintListStorage", JSON.stringify(sprintList))
    location.reload()
}

function dismiss(){
    modal.style.display = "none";
}

function dismissArchive() {
    modal2.style.display = "none";
}

function viewSprintTask(index){
    localStorage.setItem("SprintTask", JSON.stringify(sprintList[index].sprintName));
    window.location.href = './sprint-backlog.html';
}


