/*Fonction permettant de faire une requete à l'API afin de recevoir un tableau contenant tout les produits se trouvant dans l'API,
nous donnant une réponse d'afficher chaque produits dans la console et de lancer la fonction creatArticle pour chaque produit*/
function initProducts () {
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
          if (res.ok) {
            return res.json();
          }
        })

        .then(function(products){
            products.forEach(product => {
                console.log(product)
                creatArticle(product)
            });
        })

        .catch(function(err) {
            console.error("Impossible de récuper la liste des produits depuis l'API", err)
        });
}

//Fonction permettant de créer un article contenant le titre, l'image, la description ect puis de l'inserer dans le DOM
const creatArticle = (product) => {

    let newAnchor = document.createElement('a');
    let newArticle = document.createElement('article');
    let newImg = document.createElement('img')
    let newTitleProduct = document.createElement('h3');
    let newDescriptionProduct = document.createElement('p');
   

   newAnchor.setAttribute('href', './product.html?id=' + product._id)
   newTitleProduct.append(product.name)
   newDescriptionProduct.append(product.description)
   newImg.setAttribute('src', product.imageUrl)
   newImg.setAttribute('alt', product.altTxt)
   //newImg.append('')
   newArticle.appendChild(newImg)
   newArticle.appendChild(newTitleProduct)
   newArticle.appendChild(newDescriptionProduct)
   

   document.getElementById('items').appendChild(newAnchor);
   newAnchor.appendChild(newArticle);
}

initProducts()