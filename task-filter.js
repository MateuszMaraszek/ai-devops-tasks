/**
 * Filtruje i sortuje zadania, zwracając tytuły zadań zakończonych
 * @param {Array<{id: number, title: string, status: string}>} tasks - Tablica zadań
 * @returns {string[]} - Tablica tytułów zadań zakończonych, posortowanych według id
 */
function getCompletedTaskTitles(tasks) {
    return tasks
        .filter(task => task.status === 'completed')
        .sort((a, b) => a.id - b.id)
        .map(task => task.title);
}

// Przykład użycia:
const tasks = [
    { id: 3, title: 'Zadanie 3', status: 'completed' },
    { id: 1, title: 'Zadanie 1', status: 'in_progress' },
    { id: 2, title: 'Zadanie 2', status: 'completed' },
    { id: 4, title: 'Zadanie 4', status: 'pending' }
];

console.log(getCompletedTaskTitles(tasks));
// Output: ['Zadanie 2', 'Zadanie 3']

module.exports = {
    getCompletedTaskTitles
}; 