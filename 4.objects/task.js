function Student(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.marks = []; // Пустой массив оценок
}

Student.prototype.setSubject = function(subjectName) {
    this.subject = subjectName; // Установка предмата
}

Student.prototype.addMarks = function(...marks) {
    // Проверка, существует ли свойство marks и не отчислен ли студент
    if (this.marks !== undefined && !this.excluded) {
        this.marks.push(...marks); // Студент учится: добавление оценок в массив
    }
}

Student.prototype.getAverage = function() {
    // Проверка наличия оценок у студента
    if (this.marks === undefined || this.marks.length === 0) {
        return 0; // Если оценок нет, возвращаем 0
    }
    
    const sum = this.marks.reduce((acc, mark) => acc + mark, 0); // Суммирование оценок
    return sum / this.marks.length; // Возвращение среднего значения
}

Student.prototype.exclude = function(reason) {
    delete this.subject; // Удаление предмета
    delete this.marks; // Удаление оценок
    this.excluded = reason; // Устанавливание причины исключения
}
