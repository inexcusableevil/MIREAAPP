// Элементы
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

// Открытие модалки
openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();
    dlg.querySelector('input, select, textarea, button')?.focus();
});

// Закрытие модалки кнопкой
closeBtn.addEventListener('click', () => dlg.close('cancel'));

// Обработка отправки формы
form.addEventListener('submit', (e) => {
    // 1) Сброс кастомных сообщений
    [...form.elements].forEach(el => el.setCustomValidity?.(''));

    // 2) Проверка встроенных ограничений
    if (!form.checkValidity()) {
        e.preventDefault();

        // Пример: кастомное сообщение для email
        const email = form.elements.email;
        if (email.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }

        form.reportValidity(); // показать браузерные подсказки

        // Подсветка проблемных полей для доступности
        [...form.elements].forEach(el => {
            if (el.willValidate) {
                el.toggleAttribute('aria-invalid', !el.checkValidity());
            }
        });
        return;
    }

    // 3) Успешная «отправка» (без сервера)
    e.preventDefault();
    alert('Форма успешно отправлена! (Это демо, данные никуда не отправляются)');
    dlg.close('success');
    form.reset();
});

// Возврат фокуса после закрытия модалки
dlg.addEventListener('close', () => {
    lastActive?.focus();
});