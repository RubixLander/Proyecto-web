document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageDiv = document.getElementById('loginMessage');
    
    // Validar que los campos no estén vacíos
    if (name === '' || email === '' || password === '') {
        messageDiv.textContent = 'Por favor, rellena todos los campos.';
        messageDiv.style.color = 'red';
        return;
    }
    
    // Validar formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        messageDiv.textContent = 'Por favor, introduce un correo electrónico válido.';
        messageDiv.style.color = 'red';
        return;
    }
    
    // Aquí iría la lógica de autenticación, por ejemplo, una llamada a una API
    // Simulamos una autenticación simple
    if (name === 'usuario' && email === 'usuario@ejemplo.com' && password === 'contraseña') {
        messageDiv.textContent = 'Inicio de sesión exitoso';
        messageDiv.style.color = 'green';
        // Redirigir a la página principal o realizar otra acción
    } else {
        messageDiv.textContent = 'Nombre, correo electrónico o contraseña incorrectos.';
        messageDiv.style.color = 'red';
    }
});
