// let nomProduit = document.getElementById("nom").value.trim();
 let produits = JSON.parse(localStorage.getItem("tableProduit")) || [];
 let imageProduit ;
 let sotockimage = "";
 let image = document.getElementById("image");

    image.addEventListener("change", function(){
         imageProduit = image.files[0]
        
        let scaner = new FileReader();

        scaner.readAsDataURL(imageProduit)

        scaner.onload = function(){
            let contenu = document.getElementById("apercu");
            sotockimage = scaner.result;
            contenu.src = sotockimage;
            contenu.style.display = "block"
        }
    })


function validerFormulaire(){
    let nomProduit = document.getElementById("nom").value.trim();
    let categorie = document.getElementById("categorie").value.trim();
     let stock = document.getElementById("stock").value.trim();
    let prix = document.getElementById("prix").value.trim();

    if(!nomProduit || !categorie || !stock || !prix || !sotockimage){
        alert("remplis tous les champs !!")
        return;
    }
    
    produits.push({nom: nomProduit, categorie: categorie, stock: stock, prix: prix, image: sotockimage});
    souvgarder()
    alert("Produit ajouté avec succès !");
    window.location.href = "liste.html";

     



}
document.getElementById("btn-2").addEventListener("click", validerFormulaire);


function souvgarder(){
      localStorage.setItem("tableProduit", JSON.stringify(produits));
}
function recharger(){
   
  
}





