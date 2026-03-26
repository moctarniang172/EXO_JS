let etudiant = JSON.parse(localStorage.getItem("tableEtudiant")) || [];
afficher(etudiant); 

//ou let donneeetudiant = localstorage.getitem("etudiant");
// if( let donneeetudiant ){
// JSON.parse(donneeetudiant);
// afficher(donneesEtudiant)
//else{
    // donneesEtudiant =[]
    //}}

    //on va creer une fonction pour souvgarder les donnees sur localstorage
    function souvgarde(){
        localStorage.setItem("tableEtudiant", JSON.stringify(etudiant));
       
    }


let indexglobal = -1;
let formulaire =  document.getElementById("mon-formulaire");

formulaire.addEventListener("submit", function(event){
    event.preventDefault();
    let nom = document.getElementById("nom").value.trim();
    let prenom = document.getElementById("prenom").value.trim();
    let adresse = document.getElementById("adresse").value.trim();

    if(!nom || !prenom || !adresse){
        alert("remplir tous les champs");
        return;
    }
    if(indexglobal !== -1){
        etudiant[indexglobal].nom = nom;
        etudiant[indexglobal].prenom = prenom;
        etudiant[indexglobal].adresse = adresse;
        indexglobal = -1;

        document.querySelector("#btn-2").value = "valider";
        alert("Modifié avec succès !");
    }else{
        etudiant.push({nom: nom, prenom: prenom, adresse: adresse});
        alert("etudiant ajouter avec succès !");
    }
        afficher(etudiant);
          souvgarde()
        
        document.getElementById("nom").value     = "";
        document.getElementById("prenom").value  = "";
        document.getElementById("adresse").value = "";

});

function afficher(tableau) {
    let parcourire = tableau.map(function(personne, index){
        return `
        <tr>
                <td class="border border-gray-300 text-center">${index + 1}</td>
                <td class="border border-gray-300">
                    <div class="flex items-center gap-2 px-2">
                        <i class="fa-solid fa-circle-user text-blue-500"></i>
                        <span>${personne.nom}</span>
                    </div>
                </td>
                <td class="border border-gray-300 px-2">${personne.prenom}</td>
                <td class="border border-gray-300 px-2">
                    <i class="fa-solid fa-map-pin text-red-400"></i>
                    ${personne.adresse}
                </td>
                <td class="flex border border-gray-300 text-center py-1">
                    <button onclick="supprimer(${index})"
                        class="bg-red-500 text-white px-3 py-1 rounded-lg text-sm mr-1">
                         Supprimer
                    </button>
                    <button onclick="update(${index})"
                        class="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm">
                         Modifier
                    </button>
                </td>
            </tr>
        `

    })
    document.getElementById("liste").innerHTML = parcourire.join("")
};

//methode pour delete (supprimer)
function supprimer(index_supp){
    etudiant.splice(index_supp, 1)
     souvgarde();
    afficher(etudiant);
}

//method pour update (modifier)
function update(index2){
    indexglobal = index2;
    let etudiantModifier = etudiant[index2];
    document.getElementById("nom").value = etudiantModifier.nom;
    document.getElementById("prenom").value = etudiantModifier.prenom;
    document.getElementById("adresse").value = etudiantModifier.adresse;
    document.querySelector("#btn-2").value ="Modifier"

    
     

}
//partie filtrage
let recherher = document.getElementById("filtrage");
recherher.addEventListener("input", function(){
    let motChercher = document.getElementById("filtrage").value.toLowerCase();
    let resultat = etudiant.filter(function(personne, index){
        return personne.nom.toLowerCase().includes(motChercher);
    });
    if(resultat.length === 0){
         document.getElementById("liste").innerHTML =
        `<tr><td colspan="5" class="text-center text-red-500 py-4">
            Aucun étudiant trouvé 
        </td></tr>`;
        return;
    }

    afficher(resultat);
});

