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
    
                    <div class="mb row" style="text-align: left;">
                        <div class="btn-wrapper-sml" style="color: white;">
                            <button type="button" class="btn-destructive" style="font-size: 14px;" onclick="deleteArchiveSprint(${i})">Delete</button>
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

displaySprintCard(spintArchive);

function toEditPage(indexEdit){
    localStorage.setItem('editIndex', JSON.stringify(indexEdit));    
    window.location ='edit-sprint.html';
}

let sprintIndex = 0;
var modal = document.getElementById("modal");

function deleteArchiveSprint(index){
    sprintIndex = index;
    confirm("Are you sure you want to delete this sprint? It cannot be recovered after deletion.") ? confirmDelete() : null;
}

function confirmArchiveSprintDelete(sprintIndex){
    spintArchive.splice(sprintIndex, 1)
    localStorage.setItem("archivedSprintListStorage", JSON.stringify(spintArchive))
    location.reload()
}

function dismiss(){
    modal.style.display = "none";
}

function dismissArchive() {
    modal2.style.display = "none";
}
