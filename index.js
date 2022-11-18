const nameErr = document.getElementById("name-err");
const passErr = document.getElementById("pass-err");
const repassErr = document.getElementById("repass-err");

const initNameValue = document.getElementById("name").value;

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

if (!initNameValue) {
    disableBtn();
}

// check username
const validName = () => {
    const regexName = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const passValue = document.getElementById("password").value;
    const nameValue = document.getElementById("name").value;
    let isName =
        regexEmail.test(nameValue) || !regexName.test(nameValue) ? true : false;

    if (nameValue == "") {
        disableBtn();
        nameErr.innerText = "*This field is required";
        return false;
    }
    if (isName) {
        if (!passValue) {
            nameErr.innerText = "";
            disableBtn();
        } else {
            activeBtn();
            nameErr.innerText = "";
            return false;
        }
    } else {
        disableBtn();
        nameErr.innerText = "*Invalid username";
    }
    return true;
};

// check password
const validPassword = () => {
    const regexPass = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,32}$/;
    const passValue = document.getElementById("password").value;
    const nameValue = document.getElementById("name").value;

    if (passValue == "") {
        passErr.innerText = "*This field is required";
        disableBtn();
        return false;
    }
    if (regexPass.test(passValue)) {
        if (initNameValue) {
            if (initNameValue) {
                activeBtn();
            } else {
                if (validRepassword()) {
                    if (initNameValue) {
                        activeBtn();
                    } else {
                        if (!validName()) {
                            activeBtn();
                        } else {
                            repassErr.innerText = "";
                            disableBtn();
                        }
                    }
                } else {
                    disableBtn();
                }
            }
        } else {
            if (nameValue) {
                if (validRepassword()) {
                    activeBtn();
                } else {
                    repassErr.innerText = "*Password does not match";
                    disableBtn();
                }
            } else {
                if (nameValue) {
                    activeBtn();
                } else {
                    nameErr.innerText = "*This field is required";
                    repassErr.innerText = "";
                    disableBtn();
                }
            }
        }
        passErr.innerText = "";
        return false;
    } else {
        passErr.innerText =
            "*Password must be longer than 8 and shorter than 32 characters and at least 1 Uppercase and Lowercase";
        disableBtn();
    }
    return true;
};

//check repassword
const validRepassword = () => {
    const rePasswordValue = document.getElementById("repassword").value;
    const passValue = document.getElementById("password").value;
    const nameValue = document.getElementById("name").value;

    if (rePasswordValue == "") {
        repassErr.innerText = "*This field is required";

        disableBtn();
        return false;
    }
    if (passValue != rePasswordValue) {
        repassErr.innerText = "*Password does not match";
        disableBtn();
        return false;
    } else {
        if (!validName()) {
            if (initNameValue) {
                console.log();
                repassErr.innerText = "";
                activeBtn();
            } else {
                if (!validName()) {
                    if (initNameValue) {
                        activeBtn();
                    } else {
                        if (nameValue) {
                            repassErr.innerText = "";
                            activeBtn();
                        } else {
                            repassErr.innerText = "";
                            disableBtn();
                        }
                    }
                } else {
                    repassErr.innerText = "";
                    disableBtn();
                }
            }
        } else {
            repassErr.innerText = "";
            activeBtn();
        }
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
        console.log("success");
    }
});
