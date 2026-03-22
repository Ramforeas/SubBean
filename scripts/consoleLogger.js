document.addEventListener("formValid", function(event) {
    let data = event.detail;

    console.clear();

    console.log("Полное имя: " + data.fullname);
    console.log("Номер: " + data.phone);
    console.log("Почта: " + data.email);
    console.log("Пароль: " + data.password);

    if (Object.keys(data).length > 4) {
        console.log("Имя бренда: " + data.brandname);
        console.log("Описание: " + data.message);
    }

    const timestamp = new Date().toLocaleString();
    console.log("Время отправки: " + timestamp);
})