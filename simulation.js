function calculate() {
    const V = parseFloat(document.getElementById('V').value);
    const v_prime = parseFloat(document.getElementById('v_prime').value);
    const x_prime = parseFloat(document.getElementById('x_prime').value);

    const v = V + v_prime;
    const x = x_prime + V;

    document.getElementById('output').innerHTML = 'Скорость v: ' + v.toFixed(2) + ' м/с, Координата x: ' + x.toFixed(2) + ' м';
}

function calculatePrime() {
    const V = parseFloat(document.getElementById('V').value);
    const v = parseFloat(document.getElementById('v').value);
    const x = parseFloat(document.getElementById('x').value);

    const v_prime = v - V;
    const x_prime = x - V;

    document.getElementById('output').innerHTML = "Скорость v': " + v_prime.toFixed(2) + " м/с, Координата x<sub>0</sub>': " + x_prime.toFixed(2) + " м";
}
