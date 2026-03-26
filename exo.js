let etudiant = []; //notre tableau initialement declarer
let indexEnCours = -1; // variable globale

let formulaire = document.getElementById("mon-formulaire");

formulaire.addEventListener("submit", function(event) {
    event.preventDefault(); //empecher le rechargements par defaut

    let nom     = document.getElementById("nom").value.trim(); //trim() est une methode qui nous permet d'eviter les insjctions c'est-a dire pour securiser nos champs de formulaire !!!
    let prenom  = document.getElementById("prenom").value.trim();
    let adresse = document.getElementById("adresse").value.trim();

    //verifier si les champs sont remplirs
    if (!nom || !prenom || !adresse) {
        alert("Remplir tous les champs !");
        return;
    }

    //  mettre la logique pour verifier si on fait une modification ou un ajout
    if (indexEnCours !== -1) {
        // On modifier les valeurs saisies
        etudiant[indexEnCours].nom     = nom;
        etudiant[indexEnCours].prenom  = prenom;
        etudiant[indexEnCours].adresse = adresse;
        indexEnCours = -1;
        document.querySelector("#btn-2").value = "Valider";
        alert("Modifié avec succès !");
      
    } else {
        // On fait un ajout sur le tableux  
        etudiant.push({ nom: nom, prenom: prenom, adresse: adresse });
        alert("Etudiant Ajouté avec succès !");
    }

    afficher(etudiant);
   //on initialise le formulaire apres avoir enrigistrer les donnees
    document.getElementById("nom").value     = "";
    document.getElementById("prenom").value  = "";
    document.getElementById("adresse").value = "";
});
//creer la function afficher qui va nous permettre d'afficher le tableau des etudiants
function afficher(tableau) {
    const resultat = tableau.map(function(personne, index) {
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
                <td class="border border-gray-300 text-center py-1">
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
        `;
    });
    document.getElementById("liste").innerHTML = resultat.join("");
}
 //methode ou fonction pour la suppression d'un etudiant
function supprimer(index) {
    etudiant.splice(index, 1);
    afficher(etudiant);
}
 //fonction pour la modification d'un etudiant
function update(index) {
    indexEnCours = index; //  variable globale qu'on avait declarer en haut
    let e = etudiant[index];
    document.getElementById("nom").value     = e.nom;
    document.getElementById("prenom").value  = e.prenom;
    document.getElementById("adresse").value = e.adresse;
    
    
}