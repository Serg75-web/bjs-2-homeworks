class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this._state = 100; // Устанавливаем состояние книги по умолчанию
        this.type = null; // Устанавливаем тип книги по умолчанию
    }

    fix() {
        this._state = Math.min(this._state * 1.5, 100); // Увеличиваем (улучшаем) состояние, но не больше 100 (как было по умолчанию)
    }

    get state() {
        return this._state; // геттер
    }

    set state(newState) { // сеттер
        if (newState < 0) {
            this._state = 0;
        } else if (newState > 100) {
            this._state = 100;
        } else {
            this._state = newState;
        }
    }
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = 'magazine'; // Тип журнала
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author; // Имя автора
        this.type = 'book'; // Тип книги
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'novel'; // Тип - роман
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'fantastic'; // Тип - фантастика
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'detective'; // Тип - детектив
    }
}

class Library {
    constructor(name) {
        this.name = name; // Название библиотеки
        this.books = []; // Хранилище книг
    }

    addBook(book) {
        if (book.state > 30) { // Добавляем книгу только если состояние больше 30
            this.books.push(book);
        }
    }

    findBookBy(type, value) {
        return this.books.find(book => book[type] === value) || null; // Возвращаем книгу или null
    }

    giveBookByName(bookName) {
        const bookIndex = this.books.findIndex(book => book.name === bookName);
        if (bookIndex !== -1) {
            return this.books.splice(bookIndex, 1)[0]; // Удаляем и возвращаем книгу
        }
        return null; // Если книга не найдена
    }
}

// Тестируем корректность работы классов и методов

// Создание библиотеки
const library = new Library('Городская библиотека');

// Добавление печатных изданий
const book1 = new NovelBook('Лев Толстой', 'Война и мир', 1869, 1225);
const book2 = new FantasticBook('Джон Р.Р. Толкин', 'Хоббит', 1937, 310);
const book3 = new DetectiveBook('Агата Кристи', 'Убийство в Восточном экспрессе', 1934, 256);
const magazine1 = new Magazine('Наука и жизнь', 2022, 100);

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(magazine1);

// Поиск книги, изданной в 1919 году, или создание её (если ее нет)
let foundBook = library.findBookBy('releaseDate', 1919);
if (!foundBook) {
    console.log('Книга, изданная в 1919 году, не найдена. Создаём новую книгу.');
    foundBook = new DetectiveBook('Неизвестный автор', 'Неизвестное название', 1919, 300);
    library.addBook(foundBook);
} else {
    console.log(`Найдена книга: ${foundBook.name}, автор: ${foundBook.author}`);
}

// Выдача любой книги
const issuedBook = library.giveBookByName('Война и мир');
if (issuedBook) {
    console.log(`Выдана книга: ${issuedBook.name}`);
} else {
    console.log('Книга не найдена для выдачи.');
}

// Повреждение выданной книги
issuedBook.state = 20; // Уменьшение состояния книги до 20
console.log(`Состояние повреждённой книги "${issuedBook.name}": ${issuedBook.state}`);

// Восстановление выданной книги
issuedBook.fix();
console.log(`Состояние восстановленной книги "${issuedBook.name}": ${issuedBook.state}`);

// Попытка добавить восстановленную книгу обратно в библиотеку
library.addBook(issuedBook);
console.log(`Книга "${issuedBook.name}" добавлена обратно в библиотеку.`);

// Вывод всех книг в библиотеке
console.log('Книги в библиотеке:');
library.books.forEach(book => {
    console.log(`- ${book.name} (состояние: ${book.state})`);
});


// Журнал успеваемости

class Student {
    constructor(name) {
        this.name = name;
        this.marks = {}; // Создали объект для хранения оценок по предметам
    }

    addMark(mark, subject) {
        // Проверяем валидность оценки
        if (mark < 2 || mark > 5) {
            console.log(`Оценка ${mark} не может быть добавлена, так как она вне диапазона 2-5.`);
            return; // Завершение метода, если оценка недопустима
        }

        // Проверяем наличие предмета и добавляем в случае его отсутствия
        if (!this.marks[subject]) {
            this.marks[subject] = []; // Инициализация массива оценок для нового предмета
        }

        // Добавляем оценку в массив оценок по предмету
        this.marks[subject].push(mark);
    }

    getAverageBySubject(subject) {
        // Проверяем наличие оценок по предмету
        if (!this.marks[subject] || this.marks[subject].length === 0) {
            return 0; // Возвращаем 0, если предмет отсутствует
        }

        const sum = this.marks[subject].reduce((acc, mark) => acc + mark, 0); // Суммируем оценки
        return sum / this.marks[subject].length; // Возвращаем среднее значение
    }

    getAverage() {
        const subjects = Object.keys(this.marks); // Получаем названия всех предметов
        if (subjects.length === 0) {
            return 0; // Возвращаем 0, если нет предметов
        }

        const totalAverage = subjects.reduce((acc, subject) => acc + this.getAverageBySubject(subject), 0); // Суммируем средние оценки
        return totalAverage / subjects.length; // Возвращаем общее среднее значение
    }
}