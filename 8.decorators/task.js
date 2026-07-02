//Задача № 1
function cachingDecoratorNew(func) {
    let cache = [];

    function wrapper(...args) {
        const hash = md5(JSON.stringify(args)); // Получение хеша на основе аргументов
        let objectInCache = cache.find((item) => item.hash === hash); // Поиск элемента в кэше

        if (objectInCache) { // Если элемент найден
            console.log("Из кеша: " + objectInCache.value); // Получение значения из кэша
            return "Из кеша: " + objectInCache.value;
        }

        let result = func(...args); // В кеше результата нет — придётся считать
        cache.push({ hash, value: result }); // Добавляем элемент с хешем и результатом

        if (cache.length > 5) { 
            cache.shift(); // Удаление самого старого элемента (первого) из кэша
        }

        console.log("Вычисляем: " + result);
        return "Вычисляем: " + result;  
    }

    return wrapper;
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
    let timeoutId;
    function wrapper(...args) {
        // Увеличение allCount при каждом вызове декоратора
        wrapper.allCount++;

        // Если timeoutId существует, значит, предыдущий вызов был отменен
        if (timeoutId) {
            clearTimeout(timeoutId);
        } else {
            // Если это первый вызов, увеличиваем count
            wrapper.count++;
            // Сразу вызываем функцию
            func(...args);
        }

        // Установка нового таймаута
        timeoutId = setTimeout(() => {
            wrapper.count++;
            func(...args);
        }, delay);
    }

    // Инициализация счетчиков
    wrapper.count = 0;  // Количество вызовов декорированной функции
    wrapper.allCount = 0;  // Общее количество вызовов декоратора

    return wrapper;
}
