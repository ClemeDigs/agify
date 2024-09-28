const search = document.querySelector('.search');
const input = document.querySelector('#input-name');
const resultText = document.querySelector('.result');
const listHistory = document.querySelector('.list-history');
const loader = document.querySelector('.loader');

let oldContent = localStorage.getItem('oldContent') ?? [];

// Si oldContent contient des données, on les parse pour les utiliser.
if (oldContent.length > 0) {
    oldContent = JSON.parse(oldContent);
} else {
    oldContent = [];
}

function hideLoader(){
    loader.classList.add('hidden');
}

function showLoader(){
    loader.classList.remove('hidden');
}

// Fonction pour afficher le résultat de l'API Agify
function fetchFirstName(firstName) {
    showLoader();
    resultText.textContent = '';

    fetch(`https://api.agify.io?name=${firstName}`)
        .then((response) => response.json())
        .then((data) => {
            const result = `${data.name} is ${data.age} years old.`;
            
            // S'assurer que l'icône reste affichée pendant au moins 1 seconde
            setTimeout(() => {
                // Masquer l'icône de chargement et afficher le texte résultat
                hideLoader();
                resultText.textContent = result;
                
                // Ajout du résultat dans l'historique après réception de l'API
                addListContent(result);
                oldContent.push(result);
                localStorage.setItem('oldContent', JSON.stringify(oldContent));

                // Mettre à jour la liste avec les 10 derniers résultats
                updateListContent();
            }, 1000); // Temps minimum avant de cacher le loader et afficher le résultat
        });
}

// Fonction pour ajouter le contenu à la liste d'historique (ajoute en haut)
function addListContent(result) {
    const liHtml = document.createElement('li');
    liHtml.textContent = result;
    listHistory.prepend(liHtml);  // Ajoute en haut de la liste; comme appendChild
}

// Fonction pour afficher les 10 derniers éléments de la liste (les plus récents en haut)
function updateListContent() {
    listHistory.innerHTML = '';  // On vide la liste avant de la mettre à jour
    for (let i = oldContent.length - 10; i < oldContent.length; i++) {
        addListContent(oldContent[i]);
    }
}

// Affichage initial des 10 derniers prénoms dans l'historique
updateListContent();

// Événement au clic sur le bouton de recherche
search.addEventListener('click', (e) => {
    e.preventDefault();

    const firstName = input.value; 
    if (!firstName) {
        resultText.textContent = "Veuillez entrer un prénom.";
        return;
    }

    fetchFirstName(firstName);
});
