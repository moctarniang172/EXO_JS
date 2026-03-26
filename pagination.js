let tableau    = JSON.parse(localStorage.getItem("tableEtudiant")) || [];
let pageActuel = 1;
let parPage    = 5;
let indexglobal = -1;

//  SAUVEGARDE 
function souvgarde() {
    localStorage.setItem("tableEtudiant", JSON.stringify(tableau));
}

//  AFFICHER AU DÉMARRAGE 
affichageParPORTION();

//  BOUTON PRÉCÉDENT
document.getElementById("precedent").addEventListener("click", function() {
    if (pageActuel > 1) {
        pageActuel--;
        affichageParPORTION();
    }
});

// BOUTON SUIVANT  
document.getElementById("suivant").addEventListener("click", function() {
    let totalPage = Math.ceil(tableau.length / parPage);
    if (pageActuel < totalPage) {
        pageActuel++;
        affichageParPORTION();
    }
});

// PAGINATION 
function affichageParPORTION() {
    document.getElementById("compteur").innerHTML = tableau.length;

    let debut = (pageActuel - 1) * parPage;
    let fin   =  pageActuel      * parPage;
    let data  = tableau.slice(debut, fin);

    afficher(data);

    //  Calculer totalPage correctement
    let totalPage = Math.ceil(tableau.length / parPage) || 1;
    document.getElementById("info-page").innerHTML =
        "Page " + pageActuel + " / " + totalPage;

    // Désactiver les boutons
    document.getElementById("precedent").disabled = pageActuel === 1;
    document.getElementById("suivant").disabled   = pageActuel === totalPage;
}

// AFFICHER 
function afficher(tab) {
    if (tab.length === 0) {
        document.getElementById("liste").innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-red-400 py-8">
                    Aucun étudiant 
                </td>
            </tr>
        `;
        return;
    }

    let parcourire = tab.map(function(personne, index) {
        let vraiIndex = (pageActuel - 1) * parPage + index;
        return `
            <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
                <td class="px-4 py-3 text-sm text-gray-400">${vraiIndex + 1}</td>
                <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-500
                                    flex items-center justify-center font-bold text-sm">
                            ${personne.nom.charAt(0).toUpperCase()}
                        </div>
                        <span class="font-bold text-gray-700">${personne.nom}</span>
                    </div>
                </td>
                <td class="px-4 py-3 text-gray-600">${personne.prenom}</td>
                <td class="px-4 py-3">
                    <span class="bg-blue-50 text-blue-500 text-xs px-3 py-1 rounded-full">
                         ${personne.adresse}
                    </span>
                </td>
                <td class="px-4 py-3">
                    <button onclick="modifier(${vraiIndex})"
                        class="bg-yellow-400 hover:bg-yellow-500 text-white
                               text-xs px-3 py-1 rounded-lg mr-1 transition">
                         Modifier
                    </button>
                    <button onclick="supprimer(${vraiIndex})"
                        class="bg-red-500 hover:bg-red-600 text-white
                               text-xs px-3 py-1 rounded-lg transition">
                         Supprimer
                    </button>
                     <button onclick="voir(${vraiIndex})"
                        class="bg-green-500 hover:bg-green-700 text-white
                               text-xs px-3 py-1 rounded-lg transition">
                         voir
                    </button>
                </td>
            </tr>
        `;
    });
    document.getElementById("liste").innerHTML = parcourire.join("");
}

// SUPPRIMER  
function supprimer(index) {
    if (confirm("Tu veux vraiment supprimer cet étudiant ?")) {
        tableau.splice(index, 1);
        alert("etudiant supprimer avec succee")
        souvgarde();

        // Reculer si la page est vide
        let totalPage = Math.ceil(tableau.length / parPage) || 1;
        if (pageActuel > totalPage) pageActuel = totalPage;

        affichageParPORTION(); // 
    }
}

// MODIFIER 
function modifier(index) {
    indexglobal = index;
    let etudiant = tableau[index];
    document.getElementById("nom").value     = etudiant.nom;
    document.getElementById("prenom").value  = etudiant.prenom;
    document.getElementById("adresse").value = etudiant.adresse;
    document.getElementById("formulaireModification").classList.remove("hidden");
}

function fermerModification() {
    document.getElementById("formulaireModification").classList.add("hidden");
    indexglobal = -1;
}

function enregistrerModif() {
    let nom     = document.getElementById("nom").value.trim();
    let prenom  = document.getElementById("prenom").value.trim();
    let adresse = document.getElementById("adresse").value.trim();

    if (!nom || !prenom || !adresse) {
        alert("Remplir tous les champs !");
        return;
    }

    tableau[indexglobal].nom     = nom;
    tableau[indexglobal].prenom  = prenom;
    tableau[indexglobal].adresse = adresse;

    souvgarde();
    fermerModification();
    affichageParPORTION();
}
//bouton voir
function voir(index2){
    indexglobal = index2;

    let etudiant = tableau[index2];
    let nom = document.getElementById("nom").value     = etudiant.nom;
    let prenom = document.getElementById("prenom").value  = etudiant.prenom;
    let adresse = document.getElementById("adresse").value = etudiant.adresse;
    alert(nom + "\n" + prenom +  "\n "+ adresse)


}
// FILTRAGE 
document.getElementById("filtrage").addEventListener("input", function() {
    let motChercher = this.value.toLowerCase();

    if (motChercher === "") {
        pageActuel = 1;
        affichageParPORTION();
        return;
    }

    let resultat = tableau.filter(function(personne) {
        return (
            personne.nom.toLowerCase().includes(motChercher)    ||
            personne.prenom.toLowerCase().includes(motChercher) ||
            personne.adresse.toLowerCase().includes(motChercher)
        );
    });

    afficher(resultat);
    document.getElementById("compteur").innerHTML = resultat.length;
});