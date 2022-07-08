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
        
    });
    

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
   newImg.append('')
   newArticle.appendChild(newImg)
   newArticle.appendChild(newTitleProduct)
   newArticle.appendChild(newDescriptionProduct)
   

   document.getElementById('items').appendChild(newAnchor);
   newAnchor.appendChild(newArticle);
}
 






