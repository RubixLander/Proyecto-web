//Agregar Imagenes
document.getElementById('profileImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById('profileImagePreview');

    // Clear previous previews
    previewContainer.innerHTML = '';

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'card-img-top'; // Apply card image styling
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

/*Banner*/

document.getElementById('bannerImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const previewContainer = document.querySelector('#bannerImagePreview');

    // Clear previous previews
    previewContainer.innerHTML = '';

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// Validar correo
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// Validar el formulario y redirigir
function validateFormm(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const email = document.getElementById("email").value.trim();

    // Validar campos
    if (isValidEmail(email)) {
        // Redirigir a otra página
        window.location.href = "home.html"; // Cambia la ruta si es necesario
        return true; // Permitir el envío si la redirección falla
    } else {
        alert("Por favor, asegúrate de que los campos sean correctos.");
        return false; // No permitir el envío si hay errores
    }
}

// Validar RUT
function checkRut(rut) {
    var valor = rut.value.replace('.', '');
    valor = valor.replace('-', '');
    
    var cuerpo = valor.slice(0, -1);
    var dv = valor.slice(-1).toUpperCase();
    
    rut.value = cuerpo + '-' + dv;
    
    if (cuerpo.length < 7) {
        rut.setCustomValidity("RUT Incompleto");
        return false;
    }
    
    var suma = 0;
    var multiplo = 2;
    
    for (var i = 1; i <= cuerpo.length; i++) {
        var index = multiplo * valor.charAt(cuerpo.length - i);
        suma += index;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    
    var dvEsperado = 11 - (suma % 11);
    dv = dv == 'K' ? 10 : dv;
    dv = dv == 11 ? 0 : dv;
    
    if (dvEsperado != dv) {
        rut.setCustomValidity("RUT Inválido");
        return false;
    }
    
    rut.setCustomValidity('');
}

// Validar correo
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// Verificar si las contraseñas coinciden
function checkPasswords() {
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const result = document.getElementById('result');

    if (password && confirmPassword) {
        if (password === confirmPassword) {
            result.innerHTML = '<div class="alert alert-success">Las contraseñas coinciden.</div>';
            return true;
        } else {
            result.innerHTML = '<div class="alert alert-danger">Las contraseñas no coinciden.</div>';
            return false;
        }
    }
    return false;
}

// Validar el formulario y redirigir
function validateForm(event) {
    event.preventDefault(); // Evitar el envío del formulario
    
    const rut = document.getElementById('rut');
    const email = document.getElementById('email').value.trim();
    const passwordValid = checkPasswords(); // Verificar contraseñas

    // Validar campos
    if (rut.value && isValidEmail(email) && passwordValid) {
        // Redirigir a otra página
        window.location.href = "home.html"; // Cambia la ruta si es necesario
        return true; // Permitir el envío si la redirección falla
    } else {
        alert("Por favor, asegúrate de que todos los campos sean correctos.");
        return false; // No permitir el envío si hay errores
    }
}

