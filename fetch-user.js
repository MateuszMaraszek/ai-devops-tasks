/**
 * Funkcja fetchUser pobiera dane użytkownika z API na podstawie jego identyfikatora.
 * 
 * @param {number|string} userId - Identyfikator użytkownika (może być liczbą lub ciągiem znaków).
 * @returns {Promise<Object>} Zwraca obiekt użytkownika w postaci JSON lub rzuca błąd, jeśli coś pójdzie nie tak.
 * @throws {Error} Rzuca błąd, jeśli API zwróci błąd lub użytkownik o podanym ID nie zostanie znaleziony.
 * 
 * @example
 * fetchUser(1)
 *   .then(user => console.log(user))
 *   .catch(error => console.error(error));
 */
async function fetchUser(userId) {
    try {
      // Tworzymy URL, aby pobrać dane użytkownika o podanym identyfikatorze
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      
      // Sprawdzamy, czy odpowiedź jest poprawna (status 200)
      if (!response.ok) {
        throw new Error(`Błąd podczas pobierania danych: ${response.statusText}`);
      }
  
      // Parsujemy odpowiedź z API na format JSON
      const user = await response.json();
      
      return user;  // Zwracamy obiekt użytkownika
    } catch (error) {
      // Jeśli wystąpił błąd, rzucamy go ponownie
      throw new Error(`Nie udało się pobrać danych użytkownika: ${error.message}`);
    }
  }
  
  module.exports = fetchUser;
  