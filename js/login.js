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

let emailCode = "";

function verifyCodeLogin(){
    const loginCode = document.getElementById("login-code").value;

    if (loginCode === emailCode) {
        window.location.href = "../views/sprint-view.html";
    } else {
        alert("Code is incorrect")
    }
}

function generateRandom6DigitNumber() {
    // Generate a random number between 100,000 (inclusive) and 1,000,000 (exclusive)
    const min = 100000;
    const max = 1000000;
    const randomNumber = Math.floor(Math.random() * (max - min) + min);

    return randomNumber.toString();
  }

function login() {
    const loginUsername = document.getElementById("login-username").value;
    const loginPassword = document.getElementById("login-password").value;  

    let userExists = 0;
    let success = 0;


    for (let i = 0; i < userAdd.length; i++) {
        if (userAdd[i].username == loginUsername) {
            userExists = 1;
            const storedPassword = userAdd[i].password;
            if (loginPassword === storedPassword) {
                localStorage.setItem("loggedInUser",loginUsername)
                success = 1;
                document.getElementById("output").innerText = "Login successful, please enter the code sent to your email address!";

                const email = userAdd[i].email;
                
                emailCode = generateRandom6DigitNumber();

                let ebody = 'Use this token to verify your email address: ' + emailCode;
                

                Email.send({
                    Host : "smtp.elasticemail.com",
                    Username : "fragile.fit2101@gmail.com",
                    Password : "1C0CA019E08693BBF077055C94C558C7306E",
                    To : email, 
                    From : "fragile.fit2101@gmail.com",
                    Subject : "frAgile - Your Verification Code",
                    Body : ebody
                }).then(
                    message => {
                        alert(message)
                        if (message === "OK"){
                            alert("Verification Code sent to " + email);
                        }
                    }
                );
                

                
            } 

        }
    }    

    for (let i = 0; i < adminAdd.length; i++) {
        if (adminAdd[i].username == loginUsername) {
            userExists = 1;
            const storedPassword = adminAdd[i].password;
            if (loginPassword === storedPassword) {
                success = 1;
                localStorage.setItem("loggedInUser",loginUsername)
                document.getElementById("output").innerText = "Login successful, please enter the code sent to your email address";
                window.location.href = "../views/admin-home.html";
            } 

        }
    }    

    if (!success){
        if (userExists){
            alert("Incorrect password. Please try again.");
        } else   {
            alert("Username not found. Please register first.");
        }
    }

}
