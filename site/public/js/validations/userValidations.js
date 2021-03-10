let errors = [];

window.addEventListener("load", () => {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", (event) => {
        // event.preventDefault();

        errors = [];
        clearValidations();

        validateInput("name", [
            [
                validator.isLength,
                { min: 2 },
                "Nombre es un campo requerido y con mas de 1 caracteres!",
            ],
        ]);
        validateInput("user", [
            [
                validator.isLength,
                { min: 2 },
                "Usuario es un campo requerido y con mas de 1 caracteres!",
            ],
        ]);
        validateInput("email", [
            [validator.isEmail, "Email debe ser un email valido!"],
        ]);
        validateInput("address", [
            [
                validator.isLength,
                { min: 2 },
                "Dirección es un campo requerido y con mas de 1 caracteres!",
            ],
        ]);
        validateInput("password", [
            [
                validator.isLength,
                { min: 8 },
                "Password es un campo requerido y con mas de 7 caracteres!",
            ],
        ]);
        const avatarInput = document.getElementById("avatar");

        validateFile(avatarInput);

        const passwordInput = document.getElementById("password");
        const password2Input = document.getElementById("password2");

        validateInput("password", [
            [
                validator.isLength,
                { min: 8 },
                "Tu contraseña tiene que tener al menos 8 caracteres!",
            ],
            // [validator.isLength, { min: 1 }, "Tiene que tener al menos una letra minuscula!"],
            // [validator.isLength, { min: 1 }, "Tiene que tener al menos una letra mayuscula!"],
            // [validator.isLength, { min: 1 }, "Tiene que tener al menos un simbolo!"],
            // [validator.isLength, { min: 1 }, "Tiene que tener al menos un numero!"],
        ]);
        comparePassword(passwordInput, password2Input);
        checkErrors();

        if (checkErrors()) {
            event.preventDefault();
        }
    });
});

function clearValidations() {
    const arrayInputs = document.getElementsByClassName("validate");
    const arrayFeedbacks = document.getElementsByClassName("feedback");
    const arrayBorder = document.getElementsByClassName("feedback-border");

    for (const input of arrayInputs) {
        input.classList.remove("is-invalid", "is-valid");
    }
    for (const feedback of arrayFeedbacks) {
        feedback.classList.remove("alert", "alert-danger");
        feedback.innerHTML = "";
    }
    for (const border of arrayBorder) {
        border.classList.remove("error-feedback-border");
    }
}

function validateInput(inputId, validations) {
    const input = document.getElementById(inputId);
    let inputValue = input.value;
    // switch (input.type) {
    //     case "checkbox": {
    //         inputValue = input.checked;
    //         break;
    //     }
    //     default:
    //         inputValue = input.value;
    // }

    let foundErrors = false;
    for (const validation of validations) {
        const validationFunction = validation[0];
        const errorMsg = validation[validation.length - 1];
        const validationOptions =
            validation.length > 2 ? validation[1] : undefined;

        if (!validationFunction(inputValue, validationOptions)) {
            const error = {
                inputId,
                msg: errorMsg,
            };
            errors.push(error);
            foundErrors = true;
        }
    }
    if (!foundErrors) {
        input.classList.add("is-valid");
    }
}

function checkErrors() {
    if (errors.length > 0) {
        errors.forEach((e) => {
            const feedbackId = e.inputId + "Feedback";
            const borderId = e.inputId + "Border";
            const feedbackDiv = document.getElementById(feedbackId);
            const borderDiv = document.getElementById(borderId);
            const input = document.getElementById(e.inputId);
            // const floatingInput = document.getElementsByClassName("floating-input");
            // floatingInput.classlist.add("invalid-input")
            input.classList.add("is-invalid");
            borderDiv.classList.add("error-feedback-border");
            feedbackDiv.innerHTML = e.msg;
            feedbackDiv.classList.add("alert-danger");
        });
        return true;
    }

    return false;
}

function isTrue(value) {
    return value;
}

function comparePassword(p1, p2) {
    let foundErrors = false;

    if (p1.value !== p2.value) {
        const error = {
            inputId: "password2",
            msg: "Las contraseñas deben ser iguales",
        };
        errors.push(error);
        foundErrors = true;
    }
    if (!foundErrors) {
        p2.classList.add("is-valid");
    }
}

function validateFile(avatar) {
    const allowedExtensions = ["jpg", "png", "jpeg", "gif"],
        sizeLimit = 3000000; // 3 megabyte

    const error = {
        inputId: "avatar",
        msg: "",
    };

    if (!avatar.value) {
        error.msg = "Debe subir una imagen";
        errors.push(error);
        checkErrors();
        return;
    }
    const { name: fileName, size: fileSize } = avatar.files[0];

    const fileExtension = fileName.split(".").pop();

    if (!allowedExtensions.includes(fileExtension)) {
        error.msg = "La imagen debe ser en formato jpg, jpeg, png o gif";
        avatar.value = null;
        errors.push(error);
        checkErrors();
    } else if (fileSize > sizeLimit) {
        error.msg = "La imagen debe ser de 3 mb como máximo";
        avatar.value = null;

        errors.push(error);
        checkErrors();
    }
}
