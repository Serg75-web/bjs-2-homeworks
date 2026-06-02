function compareArrays(arr1, arr2) {
  
// Сравниваем массивы по длине
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    // Сравниваем элементы на одинаковых индексах с помощью метода every
    return arr1.every((element, index) => element === arr2[index]);
}

function getUsersNamesInAgeRange(users, gender) {
  
// Отфильтровываем юзеров по полу
  const filteredUsers = users.filter(user => user.gender === gender);
  
  // Если нет пользователей указанного пола, возвращаем 0
  if (filteredUsers.length === 0) {
    return 0;
  }
  
  // Получение массива возрастов и вычисление среднего значения
  const averageAge = filteredUsers.map(user => user.age).reduce((sum, age) => sum + age, 0) / filteredUsers.length;

  return averageAge;
}