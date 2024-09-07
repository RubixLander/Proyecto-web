//Validar rut
function checkRut(rut) {
    // Despejar Puntos
    var valor = rut.value.replace('.','');
    // Despejar Guión
    valor = valor.replace('-','');
    
    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();
    
    // Formatear RUN
    rut.value = cuerpo + '-'+ dv
    
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false;}
    
    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;
    
    // Para cada dígito del Cuerpo
    for(i=1;i<=cuerpo.length;i++) {
    
        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);
        
        // Sumar al Contador General
        suma = suma + index;
        
        // Consolidar Múltiplo dentro del rango [2,7]
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  
    }
    
    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);
    
    // Casos Especiales (0 y K)
    dv = (dv == 'K')?10:dv;
    dv = (dv == 11)?0:dv;
    
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }
    
    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
}

//Validar correo
function checkCorreo(email){
    const validateEmailButton = document.getElementById('validateEmailButton');
    const emailInput = document.getElementById('email');
    const result = document.getElementById('result');

    validateEmailButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        result.innerHTML = '';

        if (isValidEmail(email)) {
            result.innerHTML = '<div class="alert alert-success">Correo electrónico válido.</div>';
        } else {
            result.innerHTML = '<div class="alert alert-danger">Correo electrónico inválido.</div>';
        }
    });

    function isValidEmail(email) {
        // Expresión regular para validar correos electrónicos
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
}
// Función para verificar si las contraseñas coinciden
function checkPasswords() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const result = document.getElementById('result');

    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    result.innerHTML = '';

    if (password && confirmPassword) {
        if (password === confirmPassword) {
            result.innerHTML = '<div class="alert alert-success">Las contraseñas coinciden.</div>';
        } else {
            result.innerHTML = '<div class="alert alert-danger">Las contraseñas no coinciden.</div>';
        }
    }
}
