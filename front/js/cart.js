

const initProduct = () => {
    fetch(`http://localhost:3000/api/products/`)
        .then(function(res) {
            if (res.ok) {
                return (res.json());
            }
        })

        .then(function(product){
            console.log(product);
            getListPanier(product)
            getIdPanier(product)

        })

        .catch(function(err) {
            
        });
}

initProduct()


/*const lol = (product) => {
    console.log(document.querySelectorAll('.cart__item'))
}

console.log(lol());*/




/*function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( JSON.parse(localStorage.getItem(keys[i]) ));
    }

    return values;
}*/

const  getIdPanier = (product) => {
    for(let i = 0; i < allStorages().length; i++) {
        console.log(document.querySelectorAll('.cart__item')[i].dataset.id) 
    }
}


const allStorages = () => {

    let values = [];
    let  keys = Object.keys(localStorage);
    let  i = keys.length;
    
    for (let i = 0; i < keys.length; i++) {
        values.push( JSON.parse(localStorage.getItem(keys[i])) );
    }

    return values;
}







//console.log(getId());
//console.log(getColor(allStorages()));

//console.log(localStorage.getItem(saveProduct.id + ' - ' + saveProduct.color));
//console.log(localStorage.getItem(saveProduct.id));
//console.log(localStorage.getItem('quantity'));
//console.log(localStorage.getItem('color'));

/*let saved = JSON.parse(localStorage.getItem('quantity'));
let savedQty = JSON.parse(localStorage.getItem('quantity'))
console.log(saved);
console.log(savedQty);*/



//Article et Div





const getListPanier = (product) => {
    if (allStorages() != null) {
            for(let i = 0; i < allStorages().length; i++) {
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
                panierArticle.setAttribute('class','cart__item')
                panierArticle.setAttribute('data-id', `${allStorages()[i].id}`)
                panierArticle.setAttribute('data-color',`${allStorages()[i].color}`)

                panierDivImg.setAttribute('class', 'cart__item__img')

                panierDivContent.setAttribute('class', 'cart__item__content')

                panierDivDescription.setAttribute('class', "cart__item__content__description")
                panierDivSetting.setAttribute('class', 'cart__item__content__settings')

                divSettingQuantity.setAttribute('class', 'cart__item__content__settings__quantity')
                divSettingDelete.setAttribute('class','cart__item__content__settings__delete')

                //Append Child
                panierArticle.appendChild(panierDivImg)
                panierArticle.appendChild(panierDivContent)

                panierDivContent.appendChild(panierDivDescription)
                panierDivContent.appendChild(panierDivSetting)

                panierDivSetting.appendChild(divSettingQuantity)
                panierDivSetting.appendChild(divSettingDelete)

                //création interne des div
                //set attribute et append
                itemImg.setAttribute('alt', '../images/product01.jpg')
                itemImg.setAttribute('alt', "Photographie d'un canapé")

                nameProduct.append(product.name)
                colorProduct.append('Vert')
                priceProduct.append('42,00 €')
                quantityProduct.append('Qté : ')
                itemInput.setAttribute('type', 'number')
                itemInput.setAttribute('class', 'itemQuantity')
                itemInput.setAttribute('name', 'itemQuantity')
                itemInput.setAttribute('min', '1')
                itemInput.setAttribute('max', '100')
                itemInput.setAttribute('value', '42')
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

                //const panierId = document.querySelectorAll('.cart__item')[i].dataset.id
                //console.log(panierId);
        }
        
    }
}
