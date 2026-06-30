class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback) {
        if (!time || !callback) {
            throw new Error('Отсутствуют обязательные аргументы');
        }

        this.alarmCollection.push({
            time: time,
            callback: callback,
            canCall: true
        });

        const existingAlarm = this.alarmCollection.find(alarm => alarm.time === time);
        if (existingAlarm) {
            console.warn('Уже присутствует звонок на это же время');
            return;
        }
    }

    removeClock(time) {
        this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
    }

    getCurrentFormattedTime() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`; 
    }

    start() {
        if (this.intervalId !== null) {
            return; // Интервал уже запущен
        }
        this.intervalId = setInterval(() => {
            this.alarmCollection.forEach(alarm => {
                if (alarm.time === this.getCurrentFormattedTime() && alarm.canCall) {
                    alarm.canCall = false; // Запрет повторного вызова
                    alarm.callback(); // Вызов колбека
                }
            });
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    resetAllCalls() {
        this.alarmCollection.forEach(alarm => {
            alarm.canCall = true; // Сброс возможности вызова
        });
    }

    clearAlarms() {
        this.stop(); // Остановка интервала
        this.alarmCollection = []; // Удаление всех звонков
    }
}


