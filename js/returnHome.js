const userAdd = JSON.parse(localStorage.getItem("userStorage")); 
const adminAdd = JSON.parse(localStorage.getItem("adminStorage")); 

function returnHome(){
    const loggedInUser = localStorage.getItem("loggedInUser");

    for (let i = 0; i < userAdd.length; i++) {
        if (userAdd[i].username == loggedInUser) {
            window.location.href = "../views/sprint-view.html";
        }
    }

    for (let i = 0; i < adminAdd.length; i++) {
        if (adminAdd[i].username == loggedInUser) {
            window.location.href = "../views/admin-home.html";
        }
    }
}