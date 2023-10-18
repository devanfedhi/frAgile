if (!localStorage.getItem("userStorage")) {
    localStorage.setItem("userStorage", JSON.stringify([])); // Initialize as an empty array
}

if (!localStorage.getItem("loggedInUser")) {
    localStorage.setItem("loggedInUser","None")
}

if (!localStorage.getItem("adminStorage")) {
    localStorage.setItem("adminStorage", JSON.stringify([]));
    let admin = {
        username: 'nisaldesilva',
        email: 'nisal.desilva1@monash.edu',
        fullname: 'Nisal De Silva',
        role: 'Admin',
        password: 'monash',
    }

    const adminAdd = JSON.parse(localStorage.getItem("adminStorage"));
    adminAdd.push(admin);
    localStorage.setItem('adminStorage', JSON.stringify(adminAdd));
}
const userAdd = JSON.parse(localStorage.getItem("userStorage")); 
const adminAdd = JSON.parse(localStorage.getItem("adminStorage")); 



function edit() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    

    for (let i = 0; i < userAdd.length; i++) {
        if (userAdd[i].username == loggedInUser) {
            userAdd[i].password = document.getElementById("edit-password").value;
            break;
        }
    }

    const userFound = 1;

    localStorage.setItem('userStorage', JSON.stringify(userAdd)); //add it to local storage
    alert("Edit successful.");
    window.location.href = "../views/user-details.html";


    
}