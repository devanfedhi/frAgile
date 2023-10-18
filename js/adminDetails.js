const allUsers = JSON.parse(localStorage.getItem("userStorage"));
const allAdmins = JSON.parse(localStorage.getItem("adminStorage"));

const userAdd = JSON.parse(localStorage.getItem("userStorage")); 


function showPassword(password) {
    alert(`Password: ${password}`);
}

function removeUser(username) {
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username == username) {
            allUsers.splice(i,1);
            localStorage.setItem("userStorage",JSON.stringify(allUsers));
            window.location.href = "../views/admin-details.html";
        }
    }
}

function displayUsernamesAndPasswords() {
    const userList = document.getElementById("userList");

    // for (let i = 0; i < allAdmins.length; i++) {
    //     const username = allAdmins[i].username;
    //     const email = allAdmins[i].email;
    //     const fullname = allAdmins[i].fullname;
    //     const role = allAdmins[i].role;
    //     const password = allAdmins[i].password;


    //     const row = document.createElement("tr");
    //     row.innerHTML = `
    //     <td>${username}</td>
    //     <td>${fullname}</td>
    //     <td>${email}</td>
    //     <td>${role}</td>

    //     `;

    //     const showPasswordButton = document.createElement("button");
    //     showPasswordButton.textContent = "Show Password";
    //     showPasswordButton.addEventListener("click", () => {
    //         showPassword(password); 
    //     });

    //     const actionCell = document.createElement("td");

    //     actionCell.appendChild(showPasswordButton);

    //     row.appendChild(actionCell);

        

    //     userList.appendChild(row);
    // }

    for (let i = 0; i < allUsers.length; i++) {
        const username = allUsers[i].username;
        const email = allUsers[i].email;
        const fullname = allUsers[i].fullname;
        const role = allUsers[i].role;
        const password = allUsers[i].password;

        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${username}</td>
        <td>${fullname}</td>
        <td>${email}</td>
        <td>${role}</td>
        `;

        const showPasswordButton = document.createElement("button");
        showPasswordButton.textContent = "Show Password";
        showPasswordButton.addEventListener("click", () => {
            showPassword(password); 
        });

        const actionCell = document.createElement("td");

        actionCell.appendChild(showPasswordButton);

        row.appendChild(actionCell);

        const removeUserButton = document.createElement("button");
        removeUserButton.textContent = "Remove";
        removeUserButton.addEventListener("click", () => {
            removeUser(username); 
        });

        const removeUserCell = document.createElement("td");

        removeUserCell.appendChild(removeUserButton);

        row.appendChild(removeUserCell);


        userList.appendChild(row);
    }
}

function register() {
    const registerUsername = document.getElementById("register-username").value;
    const registerEmail = document.getElementById("register-email").value;
    const registerPassword = document.getElementById("register-password").value;
    const registerFullName = document.getElementById("register-fullname").value;
    const registerRole = document.getElementById("register-role").value;
    
    let success = 0;

    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username == registerUsername) {
            alert('Username already exists, use a different one.');
            success += 1;
        }
    }

    for (let i = 0; i < allAdmins.length; i++) {
        if (allAdmins[i].username == registerUsername) {
            alert('Username already exists, use a different one.');
            window.location.href=`../views/admin-details.html`;
            success += 1;
        }
    }
    
    if (success == 0){
        let user = {
            username: registerUsername,
            email: registerEmail,
            fullname: registerFullName,
            role: registerRole,
            password: registerPassword,
            
        }
    
        userAdd.push(user);
        localStorage.setItem('userStorage', JSON.stringify(userAdd)); //add it to local storage
        window.location.href=`../views/admin-details.html`;
    }
    
}

function edit() {
    const loginUsername = document.getElementById("login-username").value;
    const editUsername = document.getElementById("edit-username").value;
    const editFullName = document.getElementById("edit-fullname").value;
    const editEmail = document.getElementById("edit-email").value;
    const editRole = document.getElementById("edit-role").value;
    const editPassword = document.getElementById("edit-password").value;

    let editedUser = {
        username: editUsername,
        email: editEmail,
        fullname: editFullName,
        role: editRole,
        password: editPassword,
    }

    let userFound = 0;

    for (let i = 0; i < userAdd.length; i++) {
        if (userAdd[i].username == loginUsername) {
            userFound = 1;
            userAdd.splice(i,1);
            break;
        }
    }

    if (userFound) {
        userAdd.push(editedUser);
        localStorage.setItem('userStorage', JSON.stringify(userAdd)); //add it to local storage
        alert("Edit successful.");
        window.location.href = "../views/admin.html";
    } else {
        alert("User not found.");
    }
    
}

window.addEventListener("load", displayUsernamesAndPasswords);