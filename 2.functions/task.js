function getArrayParams(...arr) {
    // Переменные
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;

    // Вычисляем минимум, максимум и сумму
    for (let numb of arr) {
        if (numb > max) {
            max = numb;
        }
        if (numb < min) {
            min = numb;
        }
        sum += numb;
    }

    // Вычисляем среднее значение, округляем
    const avg = (sum / arr.length).toFixed(2);

    // Возвращаем объект с результатами
    return {
        min: min,
        max: max,
        avg: Number(avg) // Преобразование строки в число
    };
}

// Находим сумму элементов
function summElementsWorker(...arr) {
    if (arr.length === 0) return 0; // Проверяем на наличие элементов
    return arr.reduce((acc, num) => acc + num, 0);
}

// Функция для вычисления разницы максимального и минимального элементов
function differenceMaxMinWorker(...arr) {
    if (arr.length === 0) return 0; // Проверка на пустой массив
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    return max - min; // Возвращаем разницу
}

// Функция для вычисления разницы сумм чётных и нечётных элементов
function differenceEvenOddWorker(...arr) {
    if (arr.length === 0) return 0; // Проверяем на наличие элементов
    let sumEvenElement = 0;
    let sumOddElement = 0;

    for (const num of arr) {
        if (num % 2 === 0) {
            sumEvenElement += num; // Чётный элемент
        } else {
            sumOddElement += num; // Нечётный элемент
        }
    }
    return sumEvenElement - sumOddElement;
}

// Функция для вычисления среднего значения чётных элементов
function averageEvenElementsWorker(...arr) {
    if (arr.length === 0) return 0; // Проверка на наличие элементов

    let sumEvenElement = 0; // Сумма чётных элементов
    let countEvenElement = 0; // Количество чётных элементов

    for (const num of arr) {
        if (num % 2 === 0) { // Проверка на чётность
            sumEvenElement += num; // Увеличиваем сумму чётных элементов
            countEvenElement++; // Увеличиваем счётчик чётных элементов
        }
    }

    // Возвращаем среднее значение или 0, если нет чётных элементов
    return countEvenElement === 0 ? 0 : sumEvenElement / countEvenElement;
}

function makeWork(arrOfArr, func) {
    // Инициализируем переменную для хранения максимального результата
    let maxWorkerResult = -Infinity;

    // Цикл для перебора всех элементов массива arrOfArr
    for (const arr of arrOfArr) {
        // Применение функции-насадки к текущему элементу массива
        const result = func(...arr); // spread-оператор для передачи элементов массива

        // Проверка, является ли полученное значение больше текущего максимума
        if (result > maxWorkerResult) {
            maxWorkerResult = result; // Обновление максимума
        }
    }

    // Возвращаем максимальный результат
    return maxWorkerResult;
}


