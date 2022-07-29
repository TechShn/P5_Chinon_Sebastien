// Code pour récuprer l'ID de la page courante
function getWidowId () {
    const str = window.location;
    const url = new URL(str)
    const id = url.searchParams.get('id');
    return id
}
console.log(getWidowId());
// Code permettant de faire une requete à l'API afin de recevoir seulement le produit dont l'id correspond,
const initProduct = () => {
    fetch(`http://localhost:3000/api/products/${getWidowId()}`)
        .then(function (res) {
            if (res.ok) {
                return (res.json());
            }
        })

        .then(function (product) {
            console.log(product)
            addProduct(product)
            createOptionColor(product)
            addEventListenerToPanierBtn();
        })

        .catch(function (err) {

        });
}
//Code permmettant d'ajouter les informations du produit dont l'id correspond avec la requete de l'API et l'ajouter dans le DOM
const addProduct = (product) => {
    let img = document.createElement('img')
    let item = document.querySelector('.item__img')


    document.getElementById('title').textContent = (product.name)
    document.getElementById('price').textContent = (product.price + ' ')
    document.getElementById('description').textContent = (product.description)
    img.setAttribute('src', product.imageUrl)
    img.setAttribute('alt', product.altTxt)

    item.appendChild(img)
}

// Fonction permettant d'ajouter les couleurs dans la selection : choisir une couleur
const createOptionColor = (product) => {
    let arrayColor = product.colors
    console.log(arrayColor)

    for (let i = 0; i < arrayColor.length; i++) {
        const colorId = document.getElementById('colors');
        const creatColor = document.createElement('option');

        colorId.appendChild(creatColor)
        creatColor.setAttribute('value', product.colors[i])
        creatColor.textContent = (product.colors[i])
    }
}

//Fonctions permettant d'ajouter les produit, leur couleur et leur quantité choisis dans le LocalStorage au click d'ajouter au panier
const addProductsToLocalStorage = () => {
    const colorId = document.getElementById('colors')
    const saveProduct = {
        id: getWidowId(),
        quantity: +(quantity.value),
        color: colorId.options[colorId.selectedIndex].value,
    }
    if (!colorId.value) {
        alert("Merci de selectionner une couleur")
        return
    }
    if (quantity.value == 0) {
        alert("Merci de selectionner le nombre d'article(s)")
    }
    const localStorageOldProduct = JSON.parse(localStorage.getItem(saveProduct.id + ' - ' + saveProduct.color));
    if (localStorageOldProduct) {
        localStorageOldProduct.quantity += parseInt(quantity.value)
        localStorage.setItem(saveProduct.id + ' - ' + saveProduct.color, JSON.stringify(localStorageOldProduct))
    } else {
        console.log(saveProduct);
        localStorage.setItem(saveProduct.id + ' - ' + saveProduct.color, JSON.stringify(saveProduct))
    }
}

const addEventListenerToPanierBtn = () => {
    const btn = document.getElementById('addToCart')
    btn.addEventListener('click', addProductsToLocalStorage)

}

initProduct();

