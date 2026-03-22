let form = document.getElementById("registrationForm");
let roles = form.querySelector(".custom-radio");

roles.addEventListener("change", function (event) {
    let fullForm = document.getElementById("full-reg-form");
    let sellForm = document.getElementById("seller-reg-form");

    if (event.target.value == "seller") {
        fullForm.classList.add("active-seller");
        sellForm.style.display = "inline";
    } else if (event.target.value == "buyer") {
        fullForm.classList.remove("active-seller");
        sellForm.style.display = "none";

        sellForm.querySelector(".textarea").value = "";
        sellForm.querySelector(".input").value = "";
    }
})

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let selectRole = document.querySelector(".radio input:checked").value;


    document.querySelectorAll('.input.is-danger, .textarea.isdanger').forEach(el => {
        el.classList.remove('is-danger');
    });
    document.querySelectorAll('.help.is-danger').forEach(el => el.remove());

    let isValid = true;

    // 1. Проверка ФИО (не пустое, минимум 2 слова)
    const fullname = document.getElementById('fullname');
    const fullnameValue = fullname.value.trim();

    if (fullnameValue === '') {
        showError(fullname, 'Введите фамилию и имя');
        isValid = false;
    } else if (fullnameValue.split(' ').length < 2) {
        showError(fullname, 'Введите фамилию и имя');
        isValid = false;
    }

    // 2. Проверка телефона (не пустой, 10 цифр)
    const phone = document.getElementById('phone');
    const phoneValue = phone.value.trim();
    const phoneDigits = phoneValue.replace(/\D/g, '');

    if (phoneValue === '') {
        showError(phone, 'Введите номер телефона');
        isValid = false;
    } else if (phoneDigits.length < 10) {
        showError(phone, 'Введите 10 цифр номера');
        isValid = false;
    }

    // 3. Проверка email (не пустой, содержит @ и .)
    const email = document.getElementById('email');
    const emailValue = email.value.trim();

    if (emailValue === '') {
        showError(email, 'Введите email');
        isValid = false;
    } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
        showError(email, 'Введите корректный email');
        isValid = false;
    }

    const password = document.getElementById("password");
    const passwordValue = password.value.trim();
    if (passwordValue === "") {
        showError(password, "Придумайте пароль");
        isValid = false;
    } else if (passwordValue.length < 8) {
        showError(password, "Пароль должен содержать не менее 8 символов");
        isValid = false;
    }


    const brandname = document.getElementById("brandname");
    const brandnameValue = brandname.value.trim();
    if (selectRole == "seller") {
        if (brandnameValue === "") {
            showError(brandname, "Введите имя бренда/производителя");
            isValid = false;
        }
    }

    // Если всё корректно - отправляем событие
    if (isValid) {
        if (selectRole == "seller") {
            const sellerFormData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                password: passwordValue,
                brandname: brandnameValue,
                message: document.getElementById('message').value.trim() || '(незаполнено)'
            };
            const event = new CustomEvent('formValid', { detail: sellerFormData });
            document.dispatchEvent(event);
        } else {
            const buyerFormData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                password: passwordValue
            };
            const event = new CustomEvent('formValid', { detail: buyerFormData });
            document.dispatchEvent(event);
        }
        alert('Форма отправлена! Данные в консоли.');
    }
});

// Функция показа ошибки
function showError(input, message) {
    input.classList.add('is-danger');
    const help = document.createElement('p');
    help.classList.add('help', 'is-danger');
    help.textContent = message;
    input.parentNode.parentNode.appendChild(help);
}

// Сброс ошибки при вводе
document.querySelectorAll('.input, .textarea').forEach(input => {
    input.addEventListener('input', function () {
        this.classList.remove('is-danger');
        const parent = this.parentNode.parentNode;
        const errors = parent.querySelectorAll('.help.is-danger');
        errors.forEach(el => el.remove());
    });
});
