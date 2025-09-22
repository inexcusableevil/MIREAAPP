const dlg = document.getElementById('contactDialog'); //мы ищем элемент html с id contdialog и сохраняем в переменную dlg
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null; //создаем переменную но пока что не вписываем туда ничего, она будет запоминать что было открыто перед тем как пользователь открыл окно диалога

openBtn.addEventListener('click', () => { //когда по кнопке кликнут запусти функцию ниже, openBtn это переменная с нашей кнопкой
  lastActive = document.activeElement; //activeElemnt свойство которое показывает какой элемент на странице сейчас активен. мы сохраняем его.
  dlg.showModal(); //открываем диалог в модальном окне, это метод для dlg
  dlg.querySelector('input,select,textarea,button')?.focus(); //Найди в диалоге первое поле ввода, список или кнопку, и если нашёл — поставь туда курсор. Если не нашёл — ничего страшного, просто пропусти эту команду
});

closeBtn.addEventListener('click', () => dlg.close('cancel')); //когда кликаем по closeBtn вызывается dlg close с причиной cancel

form?.addEventListener('submit', (e) => { //если форма существует (а она сущетсвует, в html разметке), то при ее отправки выполни эту функцию, передав информацию о событии
  // 1) Сброс кастомных сообщений
  [...form.elements].forEach(el => el.setCustomValidity?.(''));

  // 2) Проверка встроенных ограничений
  if (!form.checkValidity()) {
    e.preventDefault();

    // Пример: таргетированное сообщение
    const email = form.elements.email;
    if (email?.validity.typeMismatch) {
      email.setCustomValidity('Введите корректный e-mail, например name@example.com');
    }

    form.reportValidity(); // показать браузерные подсказки

    // A11y: подсветка проблемных полей
    [...form.elements].forEach(el => {
      if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
    });
    return;
  }

  // 3) Успешная «отправка» (без сервера)
  e.preventDefault();
  dlg.close('success'); // Закрытие модалки как сообщение об успехе
  form.reset();
});

dlg.addEventListener('close', () => { lastActive?.focus(); });


// Ограничение ввода только цифр в поле телефона
var phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function() {
  phoneInput.value = phoneInput.value.replace(/[^0-9]/g, ''); // Удаляем всё кроме цифр
});