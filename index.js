const nameErr = document.getElementById("name-err");
const passErr = document.getElementById("pass-err");
const repassErr = document.getElementById("repass-err");

let isError = false;

const showNotifi = () => {
    const notifi = document.getElementById("popup");
    notifi.classList.remove("disapear");
    setTimeout(() => {
        notifi.classList.add("disapear");
        window.location.reload();
    }, 3000);
};

const disableBtn = () => {
    let submitBtn = document.getElementById("submit");
    submitBtn.disabled = true;
};

const activeBtn = () => {
    let submitBtn = document.getElementById("submit");
    submitBtn.disabled = false;
};

// check username
const validName = () => {
    const regexName = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    const nameValue = document.getElementById("name").value;
    let isName =  regexEmail.test(nameValue) || !regexName.test(nameValue) ? true : false;
    
    if (nameValue == "") {
        disableBtn();
        nameErr.innerText = "*This field is required";
        isError = true;
        return false;
    }
    if (isName) {
        if (isError) {
            disableBtn();
        } else {
            activeBtn();
        }
        nameErr.innerText = "";
        return false;
    } else {
        disableBtn();
        nameErr.innerText = "*Invalid username";
        isError = true;
    }
    return true;
};

// check password
const validPassword = () => {
    const regexPass = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,32}$/;
    const passValue = document.getElementById("password").value;

    if (passValue == "") {
        passErr.innerText = "*This field is required";
        isError = true;
        disableBtn();
        return false;
    }
    if (regexPass.test(passValue)) {
        if (isError) {
            disableBtn();
        } else {
            activeBtn();
        }
        passErr.innerText = "";
        return false;
    } else {
        passErr.innerText =
            "*Password must be longer than 8 and shorter than 32 characters and at least 1 Uppercase and Lowercase";
        disableBtn();
        isError = true;
    }
    return true;
};

//check repassword
const validRepassword = () => {
    const rePasswordValue = document.getElementById("repassword").value;
    const passValue = document.getElementById("password").value;

    if (rePasswordValue == "") {
        repassErr.innerText = "*This field is required";
        isError = true;
        disableBtn();
        return false;
    }
    if (passValue != rePasswordValue) {
        repassErr.innerText = "*Password does not match";
        disableBtn();
        isError = true;
        return false;
    } else {
        repassErr.innerText = "";
        isError = false;
        activeBtn();
    }
    return true;
};

// submit form
const btn = document.getElementById("submit");

btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validPassword() && !validName() && !validRepassword()) {
        console.log("false");
    } else {
        showNotifi();
        console.log('success');
    }
});
