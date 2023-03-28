export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    
    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];


const mensajesDeError = {
    nombre: {
        valueMissing: 'No puede estar vacio'
    },
    email:{
        valueMissing: 'No puede estar vacio',
        typeMismatch: 'Correo no valido'
    },
    password: {
        valueMissing: 'No puede estar vacio',
        patternMismatch: 'Mínimo ocho caracteres, al menos una letra, un número y un carácter especial'
    },
    nacimiento: {
        valueMissing: 'No puede estar vacio',
        customError: 'Debes ser mayor de edad'
    },
    numero:{
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El formato requerido es XXXXXXXXXX 10 números'
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La dirección debe contener de 10 a 40 caracteres'
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La cuidad debe contener de 10 a 40 caracteres'
    },
    esatdo: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El estado debe contener de 10 a 40 caracteres'
    }
};


const validadores = {
    nacimiento: input => validarNacimiento(input)
};


function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = '';
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
    
}


function validarNacimiento(input) {
    const fechaIngresada = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaIngresada)) {
        mensaje = 'Debes ser mayor de edad';
    }

    input.setCustomValidity(mensaje); //valida 
}

function mayorDeEdad(fecha) {
    const fechaHoy = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(),
        fecha.getUTCDate());
    return fechaHoy >= diferenciaFechas;
}