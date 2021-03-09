let errors = [];

window.addEventListener("load", () => {
    const form = document.getElementById("createForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        errors = [];
        clearValidations();

        validateInput("name", [
            [
                validator.isLength,
                { min: 2 },
                "Nombre es un campo requerido y con mas de 4 caracteres!",
            ],
        ]);
        validateInput("description", [
            [
                validator.isLength,
                { min: 2 },
                "La descripción es un campo requerido y con mas de 19 caracteres!",
            ],
        ]);
        validateInput("price", [
            [
                validator.isLength,
                { min: 2 },
                "El precio es un campo requerido y debe ser mayor a $10!",
            ],
        ]);
        

        if (checkErrors()) {
            event.preventDefault();
        }
    });

});

function clearValidations() {
    const arrayInputs = document.getElementsByClassName("validate");
    const arrayFeedbacks = document.getElementsByClassName("feedback");
    const arrayBorder = document.getElementsByClassName("feedback-border")

    for (const input of arrayInputs) {
        input.classList.remove("is-invalid", "is-valid");
    }
    for (const feedback of arrayFeedbacks) {
        feedback.classList.remove("alert", "alert-danger");
        feedback.innerHTML = "";
    }
    for (const border of arrayBorder){
        border.classList.remove("error-feedback-border")
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
            borderDiv.classList.add("error-feedback-border")
            feedbackDiv.innerHTML = e.msg;
            feedbackDiv.classList.add("alert alert-danger");
        });
        return true;
    }

    return false;
}

function isTrue(value) {
    return value;
}
