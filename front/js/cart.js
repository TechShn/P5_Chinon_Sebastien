// Variable possedant la liste des produits provenant de l'API et des produit du localStorage
let products = [];
console.log(products);

// Fonction permetant d'obtenir un tableau des IDs des produits du localStorage 
function getIdsFromLS() {
    let arrGetIdFromLS = [];

    for (let i = 0; i < getProductsFromLS().length; i++) {
        arrGetIdFromLS.push(getProductsFromLS()[i].id)
    }

    return arrGetIdFromLS;
}
// Fonction permetant d'obtenir un tableau des produit du localStorage
function getProductsFromLS() {
    let values = [];
    let keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
        values.push(JSON.parse(localStorage.getItem(keys[i])))
    }

    return values;
}


// Fonction permetant de faire une requete à l'API avec plusieurs URL different afin d'obtenir les differents produits selectionnés par leur IDs
const initProducts = async () => {
    Promise.all(getIdsFromLS().map(id =>
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(res => res.json())
    ))
        .then(function (productsFromAPI) {
            let products = mergeProductsFromAPIAndLS(productsFromAPI, getProductsFromLS());
            console.log('products', products);
            addProductsToDOM();
            totalQuantityAndPriceProduct();
            addEventListnersToDeleteButtons();
            addEventListenertoModifInput();
            addEventListenerToVerifieInputFirstName();
            addEventListenerToVerifieInputLastName();
            addEventListenerToVerifieInputAdress();
            addEventListenerToVerifieInputCity();
            addEventListenerToVerifieInputEmail();
            addEventListenerToSendInformation();
        })

        .catch(function (err) {
            console.error("Impossible de récuper la liste des produits depuis l'API", err)
        });
}

//Fonction permetant d'avoir un tableau possedant les informations des produits de l'API et les informations des produits du LocalStorage
function mergeProductsFromAPIAndLS(productsFromAPI, productsFromLS) {
    productsFromLS.forEach(productFromLS => {
        let productFromAPI = productsFromAPI.find(el => el._id == productFromLS.id);
        if (productFromAPI) {
            products.push({
                quantity: parseInt(productFromLS.quantity),
                color: productFromLS.color,
                id: productFromLS.id,
                price: productFromAPI.price,
                imageUrl: productFromAPI.imageUrl,
                altTxt: productFromAPI.altTxt,
                name: productFromAPI.name,
                description: productFromAPI.description
            });
        }

    });
    console.log('Merge', products);
}

// Fonction permetant de créer un article possedant les information du produit et l'ajouter dans le DOM
function addProductToDOM(product) {
    const panierArticle = document.createElement('article');
    const panierDivImg = document.createElement('div')
    const panierDivContent = document.createElement('div')
    const panierDivDescription = document.createElement('div')
    const panierDivSetting = document.createElement('div')
    const divSettingQuantity = document.createElement('div')
    const divSettingDelete = document.createElement('div')

    // Le reste
    const itemImg = document.createElement('img');
    const nameProduct = document.createElement('h2')
    const colorProduct = document.createElement('p')
    const priceProduct = document.createElement('p')
    const quantityProduct = document.createElement('p')
    const itemInput = document.createElement('input')
    const delet = document.createElement('p')

    //création des Div
    //Set attribute
    panierArticle.setAttribute('class', 'cart__item')
    panierArticle.setAttribute('data-id', `${product.id}`)
    panierArticle.setAttribute('data-color', `${product.color}`)

    panierDivImg.setAttribute('class', 'cart__item__img')

    panierDivContent.setAttribute('class', 'cart__item__content')

    panierDivDescription.setAttribute('class', "cart__item__content__description")
    panierDivSetting.setAttribute('class', 'cart__item__content__settings')

    divSettingQuantity.setAttribute('class', 'cart__item__content__settings__quantity')
    divSettingDelete.setAttribute('class', 'cart__item__content__settings__delete')

    //Append Child
    panierArticle.appendChild(panierDivImg)
    panierArticle.appendChild(panierDivContent)

    panierDivContent.appendChild(panierDivDescription)
    panierDivContent.appendChild(panierDivSetting)

    panierDivSetting.appendChild(divSettingQuantity)
    panierDivSetting.appendChild(divSettingDelete)

    //création interne des div
    //set attribute et append
    itemImg.setAttribute('src', product.imageUrl)
    itemImg.setAttribute('alt', product.altTxt)

    nameProduct.append(product.name)
    colorProduct.append(`Couleur : ${product.color}`)
    priceProduct.append(product.price + ' €')
    quantityProduct.append('Qté : ')
    itemInput.setAttribute('type', 'number')
    itemInput.setAttribute('class', 'itemQuantity')
    itemInput.setAttribute('name', 'itemQuantity')
    itemInput.setAttribute('min', '1')
    itemInput.setAttribute('max', '100')
    itemInput.setAttribute('value', `${product.quantity}`)
    delet.append('Supprimer')
    delet.setAttribute('class', "deleteItem")

    //append Child
    panierDivImg.appendChild(itemImg)

    panierDivDescription.appendChild(nameProduct)
    panierDivDescription.appendChild(colorProduct)
    panierDivDescription.appendChild(priceProduct)

    divSettingQuantity.appendChild(quantityProduct)
    divSettingQuantity.appendChild(itemInput)

    divSettingDelete.appendChild(delet)
    document.getElementById('cart__items').appendChild(panierArticle)
}

// Fonction permetant d'ajouter tout les produit de l'API dans le DOM
function addProductsToDOM() {
    products.forEach(product => {
        addProductToDOM(product);
    })
}

function totalQuantityAndPriceProduct() {
    let totalPrice = 0;
    let totalQuantity = 0;
    products.forEach(product => {
        totalQuantity += parseInt(product.quantity);
        totalPrice += parseInt(product.quantity) * product.price;
    });

    let addTotalQuantityToDom = document.getElementById('totalQuantity')
    let addTotalPriceToDom = document.getElementById('totalPrice')

    addTotalQuantityToDom.textContent = totalQuantity
    addTotalPriceToDom.textContent = totalPrice

    return totalQuantity
}

// Fonctions permettant de supprimer les differentes cle selectionné via leur data, du localStorage
function onClickDeleteProduct(event) {
    let article = event.target.parentElement.parentElement.parentElement.parentElement;
    let data = article.getAttribute('data-id') + ' - ' + article.getAttribute('data-color')
    localStorage.removeItem(data)
    article.remove();
    const productToRemove = products.find(element => element.id == article.getAttribute('data-id') && element.color == article.getAttribute('data-color'))
    products = products.filter(element => element != productToRemove)
    console.log(products);
    console.log(totalQuantityAndPriceProduct());
}

function addEventListnersToDeleteButtons() {
    let btnSupps = document.querySelectorAll('.deleteItem');
    btnSupps.forEach((element) => {
        element.addEventListener('click', onClickDeleteProduct);
    });
}


function ChangeQuantityProduct(event) {
    let parentInput = event.target.parentNode.parentNode.parentNode.parentNode;
    let dataInput = parentInput.getAttribute('data-id') + ' - ' + parentInput.getAttribute('data-color');
    let valInput = event.target.value;
    //console.log(event);

    const saveProduct = {
        id: parentInput.getAttribute('data-id'),
        quantity: +valInput,
        color: parentInput.getAttribute('data-color'),
    }

    if (valInput) {
        event.target.setAttribute('value', event.target.value);
        console.log(localStorage.setItem(dataInput, JSON.stringify(saveProduct)))

        let productToModify = products.find(element => element.id == parentInput.getAttribute('data-id') && element.color == parentInput.getAttribute('data-color'));
        productToModify.quantity = parseInt(valInput);
        console.log(products);
        console.log(totalQuantityAndPriceProduct());
    }

}
//Fonction permettant de modifier la quantité du produit dans la page et le LocalStorage
function addEventListenertoModifInput() {
    let inputNumber = document.querySelectorAll('.itemQuantity');
    inputNumber.forEach((input) => {
        input.addEventListener('change', ChangeQuantityProduct)
    })
}

initProducts();

// Fonctions permettant de valider les informations dans le formulaire
function isFirstNameValid() {
    const inputFirstName = document.getElementById('firstName');
    const errMsgFirstName = document.getElementById('firstNameErrorMsg')
    const regexFirstName = /^[A-Z][a-z]/.test(inputFirstName.value);

    if (regexFirstName === true) {
        errMsgFirstName.style.display = 'none'
        inputFirstName.style.border = 'none';
        return true
    } else {
        inputFirstName.style.border = '2px solid red';
        errMsgFirstName.style.display = 'contents'
        errMsgFirstName.textContent = "Ceci n'est pas un nom.    (exemple: Sébastien)"
        return false
    }
}

function addEventListenerToVerifieInputFirstName() {
    const inputFirstName = document.getElementById('firstName')
    inputFirstName.addEventListener('change', isFirstNameValid)
}


function isLastNameValid() {
    const inputLastName = document.getElementById('lastName');
    const errMsgLastName = document.getElementById('lastNameErrorMsg')
    const regexLastName = /^[A-Z][a-z]/.test(inputLastName.value);

    if (regexLastName === true) {
        errMsgLastName.style.display = 'none'
        inputLastName.style.border = 'none';
        return true
    } else {
        inputLastName.style.border = '2px solid red';
        errMsgLastName.style.display = 'contents'
        errMsgLastName.textContent = "Ceci n'est pas un prénom.    (exemple: Chinon)"
        return false
    }
}

function addEventListenerToVerifieInputLastName() {
    const inputLastName = document.getElementById('lastName')
    inputLastName.addEventListener('change', isLastNameValid)
}


function isAdressValid() {
    const inputAddress = document.getElementById('address');
    const errMsgAdress = document.getElementById('addressErrorMsg')
    const regexAdress = /^[0-9]+[ |[a-zà-ú.,-]/.test(inputAddress.value);

    if (regexAdress === true) {
        errMsgAdress.style.display = 'none'
        inputAddress.style.border = 'none';
        return true
    } else {
        inputAddress.style.border = '2px solid red';
        errMsgAdress.style.display = 'contents'
        errMsgAdress.textContent = "Ceci n'est pas une adresse.    (exemple: 80 Avenue de la division Leclerc)"
        return false
    }
}

function addEventListenerToVerifieInputAdress() {
    const inputLastName = document.getElementById('address')
    inputLastName.addEventListener('change', isAdressValid)
}


function isCityValid() {
    const inputCity = document.getElementById('city');
    const errMsgCity = document.getElementById('cityErrorMsg')
    const regexCity = /^[A-Z][a-z]+(?:[\s-][a-zA-Z]+)*$/.test(inputCity.value);

    if (regexCity === true) {
        errMsgCity.style.display = 'none'
        inputCity.style.border = 'none';
        return true
    } else {
        inputCity.style.border = '2px solid red';
        errMsgCity.style.display = 'contents'
        errMsgCity.textContent = "Ceci n'est pas le nom d'une ville.    (exemple: Paris ou Garges-Les-Gonesse)"
        return false
    }
}

function addEventListenerToVerifieInputCity() {
    const inputCity = document.getElementById('city')
    inputCity.addEventListener('change', isCityValid)
}


function isEmailValid() {
    const inputEmail = document.getElementById('email');
    const errMsgEmail = document.getElementById('emailErrorMsg')
    const regexEmail = /[^@]+@.+\.\w{2,3}$/.test(inputEmail.value);

    if (regexEmail === true) {
        errMsgEmail.style.display = 'none'
        inputEmail.style.border = 'none';
        return true
    } else {
        inputEmail.style.border = '2px solid red';
        errMsgEmail.style.display = 'contents'
        errMsgEmail.textContent = "Ceci n'est pas un email.    (exemple: abc@hotmail.fr, abcde@gmail.com)"
        return false
    }
}

function addEventListenerToVerifieInputEmail() {
    const inputEmail = document.getElementById('email')
    inputEmail.addEventListener('change', isEmailValid)
}


/*Fonction permettant d'envoyer les données du formulaire stocker dans un objet "contact" et les ID des produit dans un array "products" vers l'API afin de recevoir
une reponse de celle-ci puis de rediriger l'utilisateur vers la page confirmation dont l'url possede orderId donné par l'API , seulement si les conditions des 
forumaile return true, sinon une alert 
informeras l'utilisateur*/
function sendInformation(event) {
    event.preventDefault();
    if (Object.entries(localStorage) == 0) {
        alert("Veuillez ajoutez des articles")
        return
    }
    const inputOrder = document.getElementById('order')
    if (isFirstNameValid() && isLastNameValid() && isAdressValid() && isCityValid() && isEmailValid() == true) {
        const dataCommand = {
            contact: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value,
            },
            products: getIdsFromLS()
        };
        console.log(dataCommand);
        fetch("http://localhost:3000/api/products/order", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataCommand)

        })
            .then(res => res.json())
            .then(function (data) {
                console.log("lol", data.orderId);
                window.location.assign(`confirmation.html?id=${data.orderId}`)
            });
        //return true
    } else {
        alert('Veuillez remplir le formulaire correctement')
        return
    }

}

//Fonction permettant d'appeler la fonction sendInformation au click de Commander
function addEventListenerToSendInformation() {
    const inputOrder = document.getElementById('order')
    console.log(inputOrder);
    inputOrder.addEventListener('click', sendInformation)
}

console.log(getProductsFromLS());

