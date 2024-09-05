// Cambio de la imagen de perfil
const profilePic = document.getElementById('profilePic');
const profileImageInput = document.getElementById('profileImageInput');
const changeProfilePicBtn = document.getElementById('changeProfilePic');

// Al hacer clic en el botón, simular el clic en el input file
changeProfilePicBtn.addEventListener('click', () => {
    profileImageInput.click();
});

// Previsualizar la nueva imagen seleccionada por el usuario
profileImageInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            profilePic.src = reader.result; // Asignar la imagen al src del img
        };
        reader.readAsDataURL(file);
    }
});

// Validación de la contraseña
const form = document.getElementById('editProfileForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        alert('Perfil actualizado con éxito');
        // Aquí puedes manejar el envío del formulario
    }
});
