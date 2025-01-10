// script.js

document.addEventListener("DOMContentLoaded", function() {
    const signUpForm = document.querySelector('.form-container.sign.up');
    const signInForm = document.querySelector('.form-container.sign-in');
    const signUpButton = document.getElementById('register');
    const signInButton = document.getElementById('login');

    // Fonction pour basculer vers le formulaire d'inscription
    function showSignUp() {
        signUpForm.style.display = 'block';
        signInForm.style.display = 'none';
    }

    // Fonction pour basculer vers le formulaire de connexion
    function showSignIn() {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
    }

    // Événements pour les boutons de basculement
    signUpButton.addEventListener('click', showSignUp);
    signInButton.addEventListener('click', showSignIn);

    // Validation des formulaires
    const signUpInputs = signUpForm.querySelectorAll('input');
    const signInInputs = signInForm.querySelectorAll('input');

    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let valid = true;
        signUpInputs.forEach(input => {
            if (input.value === '') {
                valid = false;
                alert(`Veuillez remplir le champ ${input.placeholder}`);
            }
        });
        if (valid) {
            alert('Inscription réussie !');
            // Ici, vous pouvez ajouter la logique pour envoyer les données au serveur
        }
    });

    signInForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let valid = true;
        signInInputs.forEach(input => {
            if (input.value === '') {
                valid = false;
                alert(`Veuillez remplir le champ ${input.placeholder}`);
            }
        });
        if (valid) {
            alert('Connexion réussie !');
            // Ici, vous pouvez ajouter la logique pour envoyer les données au serveur
        }
    });

    // Initialiser l'affichage
    showSignIn(); // Affiche le formulaire de connexion par défaut
});