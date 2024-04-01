const inputText = document.querySelectorAll('input[type="text"]');
const inputSubmit = Array.from(document.querySelectorAll('input[type="submit"]'));
const tipAmount = document.getElementById('tip-amount');
const total = document.getElementById('total');
const inputComision = inputSubmit.slice(0, 5);
const inputReset = inputSubmit.slice(-1);
let valoresText = []; 

function toggleActive(element) {
    inputSubmit.forEach(input => {
        input.classList.remove('active');
    });
    element.classList.add('active');
}

inputComision.forEach(input => {
    input.addEventListener('click', e => {
        e.preventDefault();
        const valoreComision = parseFloat(e.target.value);
        toggleActive(e.target);
        valoresText[1] = valoreComision;
        checkIfAllNumbers();
    });
});

inputText[1].addEventListener('focus', () => {
    inputSubmit.forEach(input => {
        input.classList.remove('active');
    });
});

inputText.forEach((input, index) => {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^\d.]|(?<=\..*)\./g, '');
    });

    input.addEventListener('blur', () => {
        const valor = parseFloat(input.value.trim());
        if (!isNaN(valor) || input.value.trim() === '') {
            valoresText[index] = isNaN(valor) ? 0 : valor;
            checkIfAllNumbers();
        }
    });
});

function checkIfAllNumbers() {
    const error = document.getElementById('error');
    if (valoresText[0] !== undefined && valoresText[2] !== undefined) {
        if (valoresText.some(value => value === undefined || isNaN(value) || value === 0)) {
            error.style.display = "block";
            inputText[2].classList.add('error-input')
            tipAmount.textContent = '$0';
            total.textContent = '$0';
        } else {
            error.style.display = "none";
            tipAmount.textContent = (((valoresText[0]*valoresText[1])/100) / valoresText[2]).toFixed(2);
            total.textContent = ((((valoresText[0]*valoresText[1])/100) / valoresText[2]) + (valoresText[0]/valoresText[2])).toFixed(2);
        }
    }
}

inputReset.forEach(input => {
    input.addEventListener('click', (e)=>{
        inputComision.forEach(input => {
            input.classList.remove('active');
        });
        tipAmount.textContent = '$0';
        total.textContent = '$0';
        valoresText = [];
        inputText.forEach(input => {
            input.value = '';
        });
    });
});
