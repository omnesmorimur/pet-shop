
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Обработка для каждой формы
  });
});

function formatPhoneNumber(input) {
    // Сохраняем позицию курсора
    const cursorPosition = input.selectionStart;
    const originalLength = input.value.length;
    
    // Удаляем все нецифровые символы, кроме ведущего +
    let phone = input.value.replace(/[^\d+]/g, '');
    
    // Если номер начинается с 8, заменяем на +7
    if (phone.startsWith('8')) {
        phone = '+7' + phone.substring(1);
    }
    // Если номер начинается с 7, добавляем +
    else if (phone.startsWith('7') && !phone.startsWith('+7')) {
        phone = '+' + phone;
    }
    // Если номер не начинается с +, добавляем +7
    else if (!phone.startsWith('+')) {
        phone = '+7' + phone;
    }
    
    // Удаляем лишние символы после форматирования
    phone = phone.replace(/\D/g,'').substring(0, 11);
    
    // Форматируем номер
    let formattedPhone = '+7';
    if (phone.length > 1) {
        formattedPhone += ' (' + phone.substring(1, 4);
    }
    if (phone.length > 4) {
        formattedPhone += ') ' + phone.substring(4, 7);
    }
    if (phone.length > 7) {
        formattedPhone += '-' + phone.substring(7, 9);
    }
    if (phone.length > 9) {
        formattedPhone += '-' + phone.substring(9, 11);
    }
    
    // Устанавливаем значение
    input.value = formattedPhone;
    
    // Корректируем позицию курсора
    const newCursorPosition = cursorPosition + (input.value.length - originalLength);
    input.setSelectionRange(newCursorPosition, newCursorPosition);
}

// Обработчики событий (как в предыдущем примере)
const phoneInputs = document.querySelectorAll('input[id="phone"], input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        // Пропускаем если выделен весь текст (чтобы можно было удалить)
        if (e.target.selectionStart !== e.target.selectionEnd) return;
        formatPhoneNumber(e.target);
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value.length <= 3) {
            e.preventDefault();
        }
    });
    
    // Инициализация при загрузке
    if (input.value) formatPhoneNumber(input);
});





