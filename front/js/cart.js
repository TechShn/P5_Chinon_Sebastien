let products = [];
console.log(products);

function getIdsFromLS() {
    let arrGetIdFromLS = [];

    for (let i = 0; i < getProductsFromLS().length; i++) {
        arrGetIdFromLS.push(getProductsFromLS()[i].id)
    }

    return arrGetIdFromLS;
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
        inputQuantity();
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

    let addTotalQuantityToDom = document.getElementById('totalQuantity')
    let addTotalPriceToDom = document.getElementById('totalPrice')

    addTotalQuantityToDom.append(totalQuantity)
    addTotalPriceToDom.append(totalPrice)
    
}

function onClickDeleteProduct(event) {
    let article = event.target.parentElement.parentElement.parentElement.parentElement;

    console.log(article);

    let data = article.getAttribute('data-id')+ ' - ' + article.getAttribute('data-color')
    console.log(data);
    // Remove element from LS
    //localStorage.removeItem(data)
    // Remove element from products (liste enrichie)
    //totalQuantityAndPriceProduct();
    //console.log(totalQuantityAndPriceProduct());
    //location.reload();
}

function addEventListnersToDeleteButtons() {
    let btnSupps = document.querySelectorAll('.deleteItem');
    btnSupps.forEach((element) => {
        element.addEventListener('click', onClickDeleteProduct);
    });
}


function inputQuantity() {
    let inputQté = document.querySelectorAll('.itemQuantity');
    inputQté.forEach((input) =>{ 

        let valInput = input.value
        input.style.background = 'red'
        let parentInput =  input.parentNode.parentNode.parentNode.parentNode
        let dataInput = parentInput.getAttribute('data-id')+ ' - ' + parentInput.getAttribute('data-color');
        /*const saveProduct = {
            id: id,
            quantity: valInput,
            color: colorId.options[colorId.selectedIndex].value,
        }*/

        const saveProduct = {
            id: getProductsFromLS()[1].id,
            quantity: valInput,
            color: 'colorId.options[colorId.selectedIndex].value',
        }
        console.log(saveProduct.quantity);
        

        
        console.log(parentInput);
        console.log(valInput);
        console.log(dataInput);
        
        if(valInput) {
            input.style.background ='green'
            //input.value = saveProduct.quantity
            
            //console.log(localStorage.setItem(dataInput, JSON.stringify(saveProduct)))
            //location.reload();
        }
    });
    let quantityFromLS = getProductsFromLS().forEach((element) => console.log(element.quantity))
    console.log(quantityFromLS);
    console.log(inputQté);


}

initProducts();

