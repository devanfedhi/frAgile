/**
 * Setting up local storage, feel free to add
 */
const TASK_LIST_STORAGE = "taskListStorage";
const EDIT_INDEX = "editIndex";

if (typeof (Storage) !== 'undefined'){
	if (!localStorage.getItem(TASK_LIST_STORAGE)){
		localStorage.setItem(TASK_LIST_STORAGE, JSON.stringify([]));
	}
}

if (typeof (Storage) !== 'undefined'){
	if (!localStorage.getItem(EDIT_INDEX)){
		localStorage.setItem(EDIT_INDEX, JSON.stringify(0));
	}
}

const SPRINT_LIST_STORAGE = "sprintListStorage";
if (typeof (Storage) !== 'undefined'){
    if (!localStorage.getItem(SPRINT_LIST_STORAGE)){
        localStorage.setItem(SPRINT_LIST_STORAGE, JSON.stringify([]));
    }
}

const ARCHIVED_SPRINT_LIST_STORAGE = "archivedSprintListStorage";
if (typeof (Storage) !== 'undefined'){
	if (!localStorage.getItem(ARCHIVED_SPRINT_LIST_STORAGE)){
		localStorage.setItem(ARCHIVED_SPRINT_LIST_STORAGE, JSON.stringify([]));
	}
}
