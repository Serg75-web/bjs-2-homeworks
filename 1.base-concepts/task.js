"use strict"

function solveEquation(a, b, c) {
	let arr = [];

	const discriminant = Math.pow(b, 2) - 4 * a * c;

	// Проверка дискриминанта
	if (discriminant < 0) {
		return arr; // Нет корней, возвращается пустой массив
	} else if (discriminant === 0) {
		const root = -b / (2 * a);
		arr.push(root); // Один корень, корень добавляется в массив
		return arr;
	} else {
		const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
		const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
		arr.push(root1, root2); // Имеется два корня, добавляем их в массив

		return arr;
	}

}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {



	const monthlyRate = (percent / 100) / 12; // Преобразование процентной ставки из диапазона от 0 до 100 в диапазон от 0 до 1 и из годовой в месячную

	const loanBody = amount - contribution; // Рассчет тела кредита (сумма кредита минус первоначальный взнос)

	if (loanBody <= 0) {
		return 0; // Проверка того, что тело кредита больше нуля. Если первоначальный взнос больше или равен сумме кредита, то нет необходимости в выплатах
	}

	const monthlyPayment = loanBody * (monthlyRate + (monthlyRate / (Math.pow(1 + monthlyRate, countMonths) - 1))); // Расчет ежемесячного платежа

	const totalPayment = monthlyPayment * countMonths // Расчет общей суммы выплаты (без учета первоначального взноса)

	return Math.round(totalPayment * 100) / 100; // Округление до двух знаков после запятой


}
