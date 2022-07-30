//Fonction permettant de supprimer tout le Local Storage à la redirection.
function clearLocalStorage() {
    localStorage.clear();
}
clearLocalStorage();

//Fonction permettant d'obtenir le paramètre id dans l'URL
function getWidowIdConfirmation() {
    const str = window.location;
    const url = new URL(str)
    const id = url.searchParams.get('id')
    return id;
}
console.log(getWidowIdConfirmation());

//Fonction permettant de suprimer tout les éléments qui ne sont pas des chiffres de l'id.
function extraireChiffre(str) {
    return number = (str.replace(/[^\d]/g, ""));
}
console.log(extraireChiffre(getWidowIdConfirmation()))

//Fonction permettant d'ajouter le numéro de commande dans le DOM.
function addCommandNumber() {
    const orderId = document.getElementById('orderId');
    const commandeNumber = extraireChiffre(getWidowIdConfirmation());
    const appendNumber = orderId.append(commandeNumber)
    return commandeNumber
}
addCommandNumber();
