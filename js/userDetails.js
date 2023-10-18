const allUsers = JSON.parse(localStorage.getItem("userStorage"));

const loggedInUser = localStorage.getItem("loggedInUser");

function showPassword(password) {
    alert(`Password: ${password}`);
}

function displayUsernamesAndPasswords() {
    const userList = document.getElementById("userList");


    for (let i = 0; i < allUsers.length; i++) {

        if (allUsers[i].username == loggedInUser) {
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
            showPasswordButton.classList.add("btn-primary")
            showPasswordButton.textContent = "Show Password";
            showPasswordButton.addEventListener("click", () => {
                showPassword(password); 
            });

            const actionCell = document.createElement("td");

            actionCell.appendChild(showPasswordButton);

            row.appendChild(actionCell);

            userList.appendChild(row);
            break;
        }
    } 

    for (let i = 0; i < allAdmins.length; i++) {

        if (allAdmins[i].username == loggedInUser) {
            const username = allAdmins[i].username;
            const email = allAdmins[i].email;
            const fullname = allAdmins[i].fullname;
            const role = allAdmins[i].role;
            const password = allAdmins[i].password;

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

            userList.appendChild(row);
        }
        
    }
}


window.addEventListener("load", displayUsernamesAndPasswords);