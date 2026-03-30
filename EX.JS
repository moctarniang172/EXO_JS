let tableauEtudiant = [];
let indexglobal = -1;



let formulaire = document.getElementById("formulaire");

formulaire.addEventListener("submit", function(event){
    //empecher le rechargement par defaut
    event.preventDefault();
        let nom = document.getElementById("nom").value.trim();
        let prenom = document.getElementById("prenom").value.trim();
        let age = document.getElementById("age").value.trim();
    
    //verifier si les sont vide ou pas

    if(nom || prenom || age){
       
        if(age>50){
           return alert("saisie l'age valide !!!")
        }
        if(indexglobal !== -1){
            tableauEtudiant[indexglobal].nom = nom
            tableauEtudiant[indexglobal].prenom = prenom
            tableauEtudiant[indexglobal].age = age
            indexglobal = -1;
            document.getElementById("btn-2").value = "Modifier"
            alert("modifier avec succee !!")
        }else{

         tableauEtudiant.push({nom:nom, prenom: prenom, age: age});
          alert("Etudiant Ajouté avec succès !");
          
        }
        afficher(tableauEtudiant)
           document.getElementById("nom").value     = "";
           document.getElementById("prenom").value  = "";
           document.getElementById("age").value = "";


    }
    
    else{
       
       alert("remplir tous les camps!!!");
        
    }

   

   
  
})
//fonction map pour parcourire le tableau

function afficher(tab){
    let parcourire = tab.map(function(personne, index){
        return `<tr>
                    <td class="border border-gray-300 text-center">${index + 1}</td>
                <td class="border border-gray-300">
                    <div class="flex items-center gap-2 px-2">
                        <i class="fa-solid fa-circle-user text-blue-500"></i>
                        <span>${personne.nom}</span>
                    </div>
                <td class="border border-gray-300">
                    <div class="flex items-center gap-2 px-2">
                        <i class="fa-solid fa-circle-user text-blue-500"></i>
                        <span>${personne.prenom}</span>
                    </div>
                    <td class="border border-gray-300">
                    <div class="flex items-center gap-2 px-2">
                        <i class="fa-solid fa-circle-user text-blue-500"></i>
                        <span>${personne.age}</span>
                    </div>

                       <td class="flex border border-gray-300 text-center py-1">
                    <button onclick="supprimer(${index})"
                        class="bg-red-500 text-white px-3 py-1 rounded-lg text-sm mr-1">
                         Supprimer
                    </button>
                    <button onclick="modifier(${index})"
                        class="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm">
                         Modifier
                    </button>
                </td>
        
        
        </tr>`
    })
    document.getElementById("liste").innerHTML = parcourire.join("");
}
function supprimer(index){
    tableauEtudiant.splice(index,1)
    afficher(tableauEtudiant)
}
function modifier(indexM){
    indexglobal = indexM
    let e = tableauEtudiant[indexM];
    let nom = document.getElementById("nom").value = e.nom;
    let prenom = document.getElementById("prenom").value = e.prenom;
    let age = document.getElementById("age").value = e.age;
}

