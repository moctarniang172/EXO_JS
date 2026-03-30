let tab = [];
let indexEtudiant = -1;
let pageNavigueActuel = 1;
let parPage = 5;


recharger();



 
let fitrage = document.getElementById("filtrage");
fitrage.addEventListener("input", function(){
    let motChercher = document.getElementById("filtrage").value.toLowerCase();

    if(motChercher=== ""){
        afficher(tab);
        return 
    }
    let parcourireFiltre = tab.filter(function(personne,index){
        return (personne.nom.toLowerCase().includes(motChercher)||
            personne.prenom.toLowerCase().includes(motChercher) ||
            String(personne.age).toLowerCase().includes(motChercher)
    )
    });
    afficher(parcourireFiltre); 



})
function souvgarde(){

    localStorage.setItem("tableEtudiant", JSON.stringify(tab));
    
}
function recharger(){
    tab = JSON.parse(localStorage.getItem("tableEtudiant"))||[]
    afficher(tab);
    afficherPARnombre()

}

function afficher(tab){
    if(tab.length  === 0){

     document.getElementById("liste").innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-red-400 py-8">
                    Aucun étudiant 
                </td>
            </tr>
        `;
        return;

    }
    let parcourire = tab.map(function(personne,index){
       let Etudiant = (pageNavigueActuel - 1) * parPage + index
         return `<tr>
                    <td class="border border-gray-300 text-center">${Etudiant + 1}</td>
                <td class="border border-gray-300">
                   <div class="w-8 h-8 rounded-full bg-red-100 text-blue-500
                                    flex items-center justify-center font-bold text-sm">
                        <span>${personne.nom.charAt(0).toUpperCase()}</span>
                    </div>
                 </td>

                <td class="border border-gray-300">
                    <div class="flex items-center gap-2 px-2">
                        <span>${personne.prenom}</span>
                    </div>
                </td>   
                    <td class="border border-gray-300">
                    <div class="flex items-center gap-2 px-2">
                        <span>${personne.age} ans</span>
                    </div>
                </td>    

                <td class="flex border border-gray-300 text-center py-1 gap-4 justify-center">
                    <button onclick="supp(${index})"
                        class="bg-red-500 text-white px-3 py-1 rounded-lg text-sm mr-1">
                         Supprimer
                    </button>
                    <button onclick="modif(${index})"
                        class="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm">
                         Modifier
                    </button>
                    <button onclick="modifier(${index})"
                        class="bg-green-700 text-white px-3 py-1 rounded-lg text-sm">
                         Voir
                    </button>
                </td>
        
        
        </tr>`

    });
    document.getElementById("liste").innerHTML = parcourire.join("");
 
}
let ajouter = document.getElementById("ajouter");
ajouter.addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById("formulaire").classList.toggle("hidden"); 
});

function valider(){
    let nom    = document.getElementById("nom").value.trim();
    let prenom = document.getElementById("prenom").value.trim();
    let age    = document.getElementById("age").value.trim();

   
    if(!nom || !prenom || !age){
        alert("Remplis tous les champs !");
        return;
    }

   
    if(age > 40){
        alert("Saisis un âge valide (max 40) !");
        return; 
    }

    tab.push({ nom: nom, prenom: prenom, age: age });
    alert("avec succee !!")
    souvgarde();
   afficherPARnombre(); 

    document.getElementById("formulaire").classList.add("hidden");
    document.getElementById("nom").value    = "";
    document.getElementById("prenom").value = "";
    document.getElementById("age").value    = "";
}

//fonction pour supprimer(update)
function supp(index){
     if (confirm("Tu veux vraiment supprimer cet étudiant ?")) {

    tab.splice(index, 1);
    souvgarde();
    let totalPAge = Math.ceil(tab.length / parPage) || 1;
    if(pageNavigueActuel > totalPAge) pageNavigueActuel = totalPAge; 

     afficherPARnombre();
     }
}
// fonction pour modifier
function modif(index){
    indexEtudiant = index;
    let etudiants = tab[indexEtudiant];
     document.getElementById("modif-nom").value    = etudiants.nom;
    document.getElementById("modif-prenom").value = etudiants.prenom;
    document.getElementById("modif-age").value    = etudiants.age;
     document.getElementById("formulaireModification").classList.toggle("hidden");
    
}

//fonction pour annuler une modification 
function fermerModification(){
    document.getElementById("formulaireModification").classList.add("hidden")
    indexEtudiant = -1;
}

// fonction pour valider la modification
function enregistrerModif(){

    let nom     = document.getElementById("modif-nom").value.trim();
    let prenom  = document.getElementById("modif-prenom").value.trim();
    let age = document.getElementById("modif-age").value.trim();

   
    tab[indexEtudiant].nom = nom;
    tab[indexEtudiant].prenom = prenom;
    tab[indexEtudiant].age = age;
    souvgarde();
    fermerModification();
    afficherPARnombre();

}


//la pagination 

function afficherPARnombre(){
    let debut =(pageNavigueActuel-1)* parPage;
    let fin = pageNavigueActuel * parPage;

    let data = tab.slice(debut,fin)

    afficher(data);

    let totalPage = Math.ceil(tab.length / parPage) || 1;
    document.getElementById("nombrepage").innerHTML = pageNavigueActuel+ "/" + totalPage;

    
    
};

 // bouton precedent
document.getElementById("precedent").addEventListener("click", function(){
    let totalPAge = Math.ceil(tab.length / parPage);
    if(pageNavigueActuel > 1){
        pageNavigueActuel--;
        afficherPARnombre()
    }
});

 //bouton suivant
document.getElementById("suivant").addEventListener("click", function(){
    let totalPage = Math.ceil(tab.length / parPage);

    if(pageNavigueActuel < totalPage){

        pageNavigueActuel++;
        afficherPARnombre()
    }
})

