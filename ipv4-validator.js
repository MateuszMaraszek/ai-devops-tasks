/**
 * Walidacja adresu IPv4 za pomocą wyrażenia regularnego
 * @param {string} ip - Adres IP do walidacji
 * @returns {boolean} - true jeśli adres jest poprawny, false w przeciwnym razie
 */
function validateIPv4Regex(ip) {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
}

/**
 * Walidacja adresu IPv4 za pomocą parsowania
 * @param {string} ip - Adres IP do walidacji
 * @returns {boolean} - true jeśli adres jest poprawny, false w przeciwnym razie
 */
function validateIPv4Parse(ip) {
    // Podziel adres na oktety
    const octets = ip.split('.');
    
    // Sprawdź czy mamy dokładnie 4 oktety
    if (octets.length !== 4) {
        return false;
    }
    
    // Sprawdź każdy oktet
    return octets.every(octet => {
        // Sprawdź czy oktet jest liczbą
        const num = parseInt(octet, 10);
        
        // Sprawdź czy:
        // 1. Jest liczbą
        // 2. Jest w zakresie 0-255
        // 3. Nie ma wiodących zer (chyba że jest to pojedyncze 0)
        return !isNaN(num) && 
               num >= 0 && 
               num <= 255 && 
               (num === 0 || !octet.startsWith('0'));
    });
}

// Przykłady użycia
const testIPs = [
    // Poprawne adresy
    "192.168.1.1",
    "10.0.0.1",
    "172.16.0.1",
    "255.255.255.255",
    "0.0.0.0",
    "127.0.0.1",
    
    // Niepoprawne adresy
    "256.1.2.3",        // Liczba > 255
    "1.1.1.1.1",        // Za dużo oktetów
    "192.168.001.1",    // Wiodące zera
    "192.168.1",        // Za mało oktetów
    "192.168.1.",       // Kropka na końcu
    ".192.168.1.1",     // Kropka na początku
    "192.168.1.1.1",    // Za dużo oktetów
    "192.168.1.256",    // Liczba > 255
    "192.168.1",        // Brak ostatniego oktetu
    "192.168.1.1.1",    // Za dużo oktetów
    "abc.def.ghi.jkl",  // Nieprawidłowe znaki
    "192.168.1.1a",     // Nieprawidłowe znaki
    "192.168.1.1 ",     // Spacja na końcu
    " 192.168.1.1",     // Spacja na początku
];

// Test obu metod walidacji
console.log("Testowanie walidacji adresów IPv4:\n");
testIPs.forEach(ip => {
    const regexResult = validateIPv4Regex(ip);
    const parseResult = validateIPv4Parse(ip);
    console.log(`Adres: ${ip}`);
    console.log(`Regex: ${regexResult}`);
    console.log(`Parse: ${parseResult}`);
    console.log("---");
});

// Eksport funkcji
module.exports = {
    validateIPv4Regex,
    validateIPv4Parse
}; 