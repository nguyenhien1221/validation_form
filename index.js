const nameErr = document.getElementById("name-err");
const passErr = document.getElementById("pass-err");
const repassErr = document.getElementById("repass-err");

const showNotifi = () => {
    const notifi = document.getElementById("popup");
    notifi.classList.remove("disapear");
    setTimeout(() => {
        notifi.classList.add("disapear");
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

const validName = () => {
    const regexName = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    const nameValue = document.getElementById("name").value;
    let isName =  regexEmail.test(nameValue) || !regexName.test(nameValue) ? true : false;
    
    if (nameValue == "") {
        disableBtn();
        nameErr.innerText = "This field is required";
        return false;
    }
    if (isName) {
        nameErr.innerText = "";
        activeBtn();
        return false;
    } else {
        disableBtn();
        nameErr.innerText = "Invalid name";
    }
    return true;
};

const validPassword = () => {
    const regexPass = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,32}$/;

    const passValue = document.getElementById("password").value;

    if (passValue == "") {
        passErr.innerText = "This field is required";
        disableBtn();
        return false;
    }
    if (regexPass.test(passValue)) {
        passErr.innerText = "";
        activeBtn();
        return false;
    } else {
        passErr.innerText =
            "Password must 8-32 long and at least 1 Uppercase and Lowercase";
        disableBtn();
    }

    return true;
};

const validRepassword = () => {
    const rePasswordValue = document.getElementById("repassword").value;
    const passValue = document.getElementById("password").value;

    if (rePasswordValue == "") {
        repassErr.innerText = "This field is required";
        disableBtn();
        return false;
    }
    if (passValue != rePasswordValue) {
        repassErr.innerText = "Password does not match";
        disableBtn();
        return false;
    } else {
        repassErr.innerText = "";
        activeBtn();
    }
    return true;
};

const btn = document.getElementById("submit");

btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validPassword()) {
        console.log("false");
    }
    if (!validName()) {
        console.log("false");
    }
    if (!validRepassword()) {
        console.log("false");
    } else {
        showNotifi();
    }
});
