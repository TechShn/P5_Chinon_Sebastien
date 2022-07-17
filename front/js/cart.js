const allStorages = () => {
    let values = [];
    let  keys = Object.keys(localStorage);
    
    for (let i = 0; i < keys.length; i++) {
        values.push( JSON.parse(localStorage.getItem(keys[i])))
    }

    return values ;
}
console.log(allStorages());


const storageId =  () => {
    let arrStorageId = [];
    
    for(let i = 0; i < allStorages().length; i++) {
        arrStorageId.push(allStorages()[i].id)
    }

    return arrStorageId;
}
console.log(storageId());


/*const initProduct = () => {
    fetch(`http://localhost:3000/api/products/`)
        .then(function(res) {
            if (res.ok) {
                return (res.json());
            }
        })

        .then(function(product){
            console.log(product)
            getListPanier(product)
            //getIdPanier(product)
            deletPanier(product)
            
        })

        .catch(function(err) {
            
        });
}
initProduct()*/

const initProduct = async () => {
    Promise.all(storageId().map(id => 
        fetch(`http://localhost:3000/api/products/${id}`)
        .then(resp => resp.json())
      ))

      .then(function(product){
        console.log(product)
        getListPanier(product)
        //getIdPanier(product)
        deletPanier(product)
        totalPriceProduct(product)
    })

    .catch(function(err) {
            
    });
}

initProduct()


  
/*const  getIdPanier = (product) => {
    let datId = document.querySelectorAll('.cart__item')
       
    return datId
}
console.log(getIdPanier())*/


const getListPanier =  (product) => {
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
                itemImg.setAttribute('src', product[i].imageUrl)
                itemImg.setAttribute('alt', product[i].altTxt)

                nameProduct.append(product[i].name)
                colorProduct.append(`Couleur : ${allStorages()[i].color}`)
                priceProduct.append(product[i].price + ' €')
                quantityProduct.append('Qté : ')
                itemInput.setAttribute('type', 'number')
                itemInput.setAttribute('class', 'itemQuantity')
                itemInput.setAttribute('name', 'itemQuantity')
                itemInput.setAttribute('min', '1')
                itemInput.setAttribute('max', '100')
                itemInput.setAttribute('value', `${allStorages()[i].quantity}`)
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
        
    }
    const totalQuantityProduct = () => {
        const sisi = [];
        for( let i = 0; i < allStorages().length; i++) {
            sisi.push(parseInt(allStorages()[i].quantity));
        }
        console.log((sisi));

        let somme = 0
        for(let i =0; i < sisi.length; i++) {
            somme += sisi[i]
        }
        console.log(somme);

        const totalId = document.getElementById('totalQuantity');
        totalId.append(somme)
        return totalId
    }
    
    console.log(totalQuantityProduct());

    
    const soso = [];
    for( let i = 0; i < product.length; i++) {
        soso.push(product[i].price);
    }
        
    
    let sum = 0
    for(let i = 0; i < soso.length; i++) {
        sum += soso[i]
    }

    const totalPrice = document.getElementById('totalPrice')
    totalPrice.append(sum)

    const lala = document.querySelectorAll('.itemQuantity')
    lala.forEach((value) => console.log(value));

    
}

const deletPanier = (product) => {
    let btnSupp = document.querySelectorAll('.deleteItem');
    console.log(btnSupp[2]);
    let dataArticle = document.querySelectorAll('.cart__item')
    console.log(dataArticle)

    const turnGreen = () => {
        btnSupp.style.background = 'green'
    }


    btnSupp.forEach((element) => element.addEventListener('click', () => {
        console.log(element)
        element.style.background = 'green'

        console.log(btnSupp);

        const localStorageCle = Object.keys(localStorage);
        localStorageCle.forEach((id) => console.log(id))

        
        //localStorage.removeItem(nono)
    }))



    /*const deletLocalStorage = () => {

    }*/

    /*btnSupp.style.background = 'red'

    btnSupp.addEventListener('click', turnGreen )*/
    
}



/*const nono = Object.keys(localStorage);
console.log(nono);*/

//nono.forEach((cle) => console.log(cle));

console.log(allStorages());

