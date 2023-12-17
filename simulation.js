function calculate() {
    const V = parseFloat(document.getElementById('V').value);
    const v_prime = parseFloat(document.getElementById('v_prime').value);
    const x_prime = parseFloat(document.getElementById('x_prime').value);

    const v = Math.round(((V + v_prime) / (1 + V * v_prime)) * 10) / 10;
    const x = Math.round((V * x_prime / (1 + V * v_prime)) * 100) / 100;

    document.getElementById('output').innerHTML = 'Скорость v: ' + v + ', Координата x: ' + x;
}

function calculatePrime() {
    const V = parseFloat(document.getElementById('V').value);
    const v = parseFloat(document.getElementById('v').value);
    const x = parseFloat(document.getElementById('x').value);

    const v_prime = Math.round((v + V * (v ** 2) - V) * 100) / 100;
    const x_prime = Math.round(((x * (1 + V * v_prime)) / V) * 100) / 100;

    document.getElementById('output').innerHTML = "Скорость v': " + v_prime + ", Координата x_0': " + x_prime;
}