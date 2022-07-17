var products = [];

function getIdsFromLS() {
    let arrStorageId = [];

    for (let i = 0; i < getProductsFromLS().length; i++) {
        arrStorageId.push(getProductsFromLS()[i].id)
    }

    return arrStorageId;
}

function getProductsFromLS() {
    let values = [];
    let keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
        values.push(JSON.parse(localStorage.getItem(keys[i])))
    }

    return values;
}


const initProducts = async () => {
    Promise.all(getIdsFromLS().map(id =>
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(resp => resp.json())
    ))
    .then(function (productsFromAPI) {
        let products = mergeProductsFromAPIAndLS(productsFromAPI, getProductsFromLS());
        console.log('products', products);
        addProductsToDOM();
        totalQuantityAndPriceProduct();
        addEventListnersToDeleteButtons();
    })

    .catch(function (err) {
        console.error("Impossible de récuper la liste des produits depuis l'API", err)
    });
}

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

function addProductsToDOM() {
    products.forEach(product => {
        addProductToDOM(product);
    })
}

function totalQuantityAndPriceProduct() {
    let totalPrice = 0;
    let totalQuantity = 0;
    products.forEach(product => {
        totalQuantity += product.quantity;
        totalPrice += product.quantity * product.price;
    });
    console.log('Total price : ', totalPrice);
    console.log('Total quantity', totalQuantity);
    // TODO: Add it to DOM
}

function onClickDeleteProduct(event) {
    let article = event.target.parentElement.parentElement.parentElement.parentElement;

    console.log('article :', article.getAttribute('data-id'), article.getAttribute('data-color'))
    // Remove element from LS
    // Remove element from products (liste enrichie)
    totalQuantityAndPriceProduct();
}

function addEventListnersToDeleteButtons() {
    let btnSupps = document.querySelectorAll('.deleteItem');
    btnSupps.forEach((element) => {
        element.addEventListener('click', onClickDeleteProduct);
    });
}

initProducts();