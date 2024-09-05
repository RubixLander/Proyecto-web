//Registro
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const profilePic = document.getElementById('profile-pic');
        profilePic.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Aquí puedes agregar el código para guardar los cambios en el servidor

    alert('Cambios guardados correctamente.');
});









//Inicio sesion.
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validar los datos del formulario (esto es un ejemplo básico)
        if (name && email && password) {
            // Si los datos son válidos, redirigir a otra página
            window.location.href = 'inicio.html'; // Cambia 'seccion2.html' a la URL de tu sección
        } else {
            // Mostrar un mensaje de error si los datos no son válidos
            loginMessage.textContent = 'Por favor, completa todos los campos.';
            loginMessage.classList.add('text-danger');
        }
    });
});