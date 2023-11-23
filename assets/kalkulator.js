// Object untuk menyimpan data dan kondisi kalkulator
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

// update angka pada layar
function updateDisplay() {
    document.querySelector('.displayNumber').innerText = calculator.displayNumber;
}

// Menghapus data pada kalkulator
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

// Menginput angka
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

// konversi angka positif
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

// memfungsikan operator
function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan');
    }
}

// melakukan kalkulasi
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('Anda belum menetapkan operator');
        return;
    }

    let result = 0;
    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    };
    putHistory(history);

    calculator.displayNumber = result;
}

// Menambahkan event
const buttons = document.querySelectorAll('.button');
for (const button of buttons) {
    button.addEventListener('click', function (event) {
        // Mendapatkan objek elemen yang diklik
        const target = event.target;

        // Menjalankan tombol Clear
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        // menjalankan tombol negative
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        //menjalankan tombol equals(=)
        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        // menjalankan tombol operator
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();

    });
}