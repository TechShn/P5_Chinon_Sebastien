
/* Salut Charle */

/*Voici la fonction fetch que je voulais utilier pour pouvoir faire une requete à l'API pour avoir toute les donnés des produit qui se trouvent dans le local Storage

*/
const initProduct = () => {
    fetch(`http://localhost:3000/api/products/`/*ici je pensait devoir mettre les id obtenue via la fonction getIdPanier, ce sont les id des produit qui se trouvent dans le localSorage */)
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

/* Ici c'est la fonction qui me permet d'obtenir la valeur de data-id (cart.html ligne 51) c'est dans la console les id sont ceux des produits qu'il y à dans le local
Storage ce sont des attributs de la balise article,
mais je quand j'appelle la fonction elle ne fonctionne pas, probleme d'initialisation */
const  getIdPanier = (product) => {
    for(let i = 0; i < allStorages().length; i++) {
        console.log(document.querySelectorAll('.cart__item')[i].dataset.id) 
    }
}

//La fonction qui me permet de mettre les donné du locaStorage dans un tableau, c'est dans la console
const allStorages = () => {

    let values = [];
    let  keys = Object.keys(localStorage);
    let  i = keys.length;
    
    for (let i = 0; i < keys.length; i++) {
        values.push( JSON.parse(localStorage.getItem(keys[i])) );
    }

    return values;
}

console.log(allStorages());


//La fonction qui me permet de créer les articles via le nombre de clé qu'il y à dans le localStorage , ça à l'air de fonctionner
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
/*En gros je n'arrive pas à ajouter les informations de l'API tel que l'image ou le prix ect.. dans les article que j'ai créée  */