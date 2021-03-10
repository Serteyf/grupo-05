let errors = [];

window.addEventListener("load", () => {
    const form = document.getElementById("createForm");

    form.addEventListener("submit", (event) => {
        errors = [];
        clearValidations();

        validateInput("name", [
            [
                validator.isLength,
                { min: 5 },
                "Nombre es un campo requerido y con mas de 5 caracteres!",
            ],
        ]);
        validateInput("description", [
            [
                validator.isLength,
                { min: 20 },
                "Descripción es un campo requerido y con mas de 20 caracteres!",
            ],
        ]);

        const photoInputEdit = document.getElementById("photoEdit");

        validateFileEdit(photoInputEdit);

        checkErrors();
        if (checkErrors()) {
            event.preventDefault();
        }
    });
});

function clearValidations() {
    const arrayInputs = document.getElementsByClassName("validate");
    const arrayFeedbacks = document.getElementsByClassName("feedback");
    const arrayBorder = document.getElementsByClassName(
        "feedback-border-create"
    );

    for (const input of arrayInputs) {
        input.classList.remove("is-invalid", "is-valid");
    }
    for (const feedback of arrayFeedbacks) {
        feedback.classList.remove("alert", "alert-danger");
        feedback.innerHTML = "";
    }
    for (const border of arrayBorder) {
        border.classList.remove("error-feedback-border-create");
    }
}

function validateInput(inputId, validations) {
    const input = document.getElementById(inputId);
    let inputValue = input.value;

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
        console.log(errors);

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

function validateFileEdit(photo) {
    const allowedExtensions = ["jpg", "png", "jpeg", "gif"],
        sizeLimit = 3000000; // 1 megabyte

    const error = {
        inputId: "photoEdit",
        msg: "",
    };

    const { name: fileName, size: fileSize } = photo.files[0];

    const fileExtension = fileName.split(".").pop();

    if (!allowedExtensions.includes(fileExtension)) {
        error.msg = "La imagen debe ser en formato jpg, jpeg, png ó gif";
        errors.push(error);
        checkErrors();
    } else if (fileSize > sizeLimit) {
        error.msg = "La imagen debe ser de 3 mb como máximo";
        errors.push(error);
        checkErrors();
    }
}
