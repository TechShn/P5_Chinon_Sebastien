// Code pour récuprer l'ID
const str = window.location;
const url = new URL(str)
const id = url.searchParams.get('id');
console.log(id);

// Code pour demander uen requete à l'API
fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(res) {
        if (res.ok) {
            return (res.json());
        }
    })

    .then(function(product){
            console.log(product)
            addProduct(product)
            createOption(product)
            detailProduct(product)
    })

    .catch(function(err) {
        
    });

//Code d'ajout des information du produit
const addProduct = (product) => {
    let img = document.createElement('img') 
    let item = document.querySelector('.item__img')
    

    document.getElementById('title').textContent = (product.name)
    document.getElementById('price').textContent = ( product.price + ' ' )
    document.getElementById('description').textContent = ( product.description)
    img.setAttribute('src', product.imageUrl)
    img.setAttribute('alt', product.altTxt)

    item.appendChild(img)
}


const createOption = (product) => {
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
 

const btn = document.getElementById('addToCart')
const qty = document.getElementById('quantity')
console.log(qty)

for (let i = 0; i < btn; i++) {
const save = () => {
    const colorId = document.getElementById('colors')
    
    const saveProduct = {
        id: id,
        quantity: quantity.value,
        color: colorId.options[colorId.selectedIndex].value
    }

localStorage.setItem("saveProduct", JSON.stringify(saveProduct))
}
btn.addEventListener('click', save)
}




