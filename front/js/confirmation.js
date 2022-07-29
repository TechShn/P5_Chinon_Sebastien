//nanana
/*function clearLocalStorage () {
    localStorage.clear();
}
clearLocalStorage();*/

//nana
function getWidowIdConfirmation () {
    const str = window.location;
    const url = new URL(str)
    const id = url.searchParams.get('id')
    return id;
}
console.log(getWidowIdConfirmation());

//nana
function extraireChiffre (str) {
    return number = (str.replace(/[^\d]/g, ""))
}
console.log(extraireChiffre(getWidowIdConfirmation()))

//nanan
function addCommandNumber () {
    const orderId = document.getElementById('orderId');
    const commandeNumber = extraireChiffre(getWidowIdConfirmation());
    const appendNumber = orderId.append(commandeNumber)
   return commandeNumber
}
addCommandNumber();
/*function test () {
    return  window.location.assign(`confirmation.html?=on`)
}
/*console.log(test());
const timeOut = setTimeout(test(), 5000)
//console.log(timeOut);*/

function deletHistory () {
    localStorage.clear();
    //window.history.replaceState("", "", `https://www.dofus.com/fr/prehome`);
    //const state = {page_confirmation: `confirmation.html?id=${getWidowIdConfirmation()}`}
    //window.history.pushState("", "", 'https://www.dofus.com/fr/prehome');
    window.location.replace('confirmation.html');
}

window.addEventListener('unload', function(e) {
    //localStorage.clear();
    //window.location.replace(`cart.html`);
    deletHistory();
    //window.history.pushState("", "", 'confirmation.html');
    //window.history.replaceState("", "", 'confirmation.html');
})

