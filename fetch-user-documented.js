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
      // Budowanie URL z dynamicznie wstawionym identyfikatorem użytkownika
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  
      // Sprawdzanie, czy odpowiedź z API jest poprawna (status 200)
      if (!response.ok) {
        throw new Error(`Błąd podczas pobierania danych: ${response.statusText}`);
      }
  
      // Parsowanie odpowiedzi z JSON
      const user = await response.json();
      
      return user;  // Zwracamy obiekt użytkownika
    } catch (error) {
      // Obsługa błędów, jeśli coś poszło nie tak
      throw new Error(`Nie udało się pobrać danych użytkownika: ${error.message}`);
    }
  }
  
  module.exports = fetchUser;