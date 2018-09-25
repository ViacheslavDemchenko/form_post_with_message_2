window.addEventListener('DOMContentLoaded', () => {

//Форма
let message = new Object();
	message.loading = "Загрузка...";
	message.success = "Спасибо. Скоро мы с вами свяжемся!";
	message.failure = "Что-то пошло не так...";

let form = document.getElementsByClassName('main-form')[0],
	input = form.getElementsByTagName('input'),
	statusMessage = document.createElement('div');
	statusMessage.classList.add('status');

	form.addEventListener('submit', function(event) {
		event.preventDefault();
		form.appendChild(statusMessage);

		// AJAX
		let request = new XMLHttpRequest();
			request.open("POST", 'server.php')
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		let formData = new FormData(form);
			request.send(formData);

		request.onreadystatechange = function() {
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;//Добавляем контент на страницу
				console.log('Ожидание');
			} else if (request.readyState === 4) {
				if (request.status == 200 && request.status < 300) {
					statusMessage.innerHTML = message.success;//Добавляем контент на страницу
					console.log('Успех');				
				}
				else {
				statusMessage.innerHTML = message.failure;//Добавляем контент на страницу
				console.log('Ошибка');
				}
			}
		};
		//Очистка инпутов
		for (let i = 0; i < input.length; i++) {
			input[i].value = '';
		}
	});
});	