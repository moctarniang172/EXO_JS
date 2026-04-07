import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc,       // AJOUTER un document
  getDocs,      // LIRE tous les documents
  updateDoc,    // MODIFIER un document
  deleteDoc,    // SUPPRIMER un document  ← manquait !
  doc           // POINTER vers un document précis ← manquait !
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
 
 
// ============================================================
// CONFIGURATION — connexion à Firebase
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyAJ9Ouu6MBGB824MgxCQKJ1amhErzFwq8s",
  authDomain: "projet-javascript-debutant.firebaseapp.com",
  projectId: "projet-javascript-debutant",
  storageBucket: "projet-javascript-debutant.firebasestorage.app",
  messagingSenderId: "631704873973",
  appId: "1:631704873973:web:223272cbb89d5c0a508ebc"
};
 
const mon_porte_entrer   = initializeApp(firebaseConfig);
const ma_base_de_donnee  = getFirestore(mon_porte_entrer);

let tableau = [];
let indexglobal = -1;

 await rechargement();

 let btnFormulaire = document.getElementById("formulaire");
 btnFormulaire.addEventListener("submit", async function(event){
    event.preventDefault();
    let nom = document.getElementById("nom").value.trim();
    let prenom = document.getElementById("prenom").value.trim();
    let age = document.getElementById("age").value.trim();

    if(!nom || !prenom || !age){

        return alert("rempilis tous les champs !!");
        
    }
    if(indexglobal!== -1){
        let iddoc = tableau[indexglobal].id
        await updateDoc(doc(ma_base_de_donnee, "tabeletudiants", iddoc),{
            nom: nom,
            prenom: prenom,
            age: age
        })
        indexglobal = -1;
        document.getElementById("btn-2").value = "Modifier";
        alert("Modifié avec succès !");
    }else{
    await addDoc(collection(ma_base_de_donnee, "tabeletudiants"),{
        nom: nom, prenom: prenom, age: age
    });
    alert("Ajouter avec succès !");
    }
    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("age").value = "";
   
    await rechargement()

 })

 //la fonction de rechargement
 async function rechargement(){
    let tab = [];
    let cours = await getDocs(collection(ma_base_de_donnee, "tabeletudiants"))

    cours.forEach(function(document){
        tab.push({id: document.id, ...document.data()})
    })
    tableau = tab;
    afficher(tableau) ;
 }

 function afficher(tab){
    if (tab.length === 0) {
    document.getElementById("liste").innerHTML = 
      `<tr><td colspan="5" class="text-center p-4 text-gray-400">Aucun étudiant</td></tr>`;
    return;
  }
 
  let lignes = tab.map(function(personne, index) {
    return `
      <tr>
        <td class="border border-gray-300 text-center">${index + 1}</td>
        <td class="border border-gray-300">
          <div class="flex items-center gap-2 px-2">
            <i class="fa-solid fa-circle-user text-blue-500"></i>
            <span>${personne.nom}</span>
          </div>
        </td>
        <td class="border border-gray-300">
          <div class="flex items-center gap-2 px-2">
            <span>${personne.prenom}</span>
          </div>
        </td>
        <td class="border border-gray-300">
          <div class="flex items-center gap-2 px-2">
            <span>${personne.age}</span>
          </div>
        </td>
        <td class="flex border border-gray-300 text-center py-1">
          <button onclick="supprimer('${personne.id}')"
            class="bg-red-500 text-white px-3 py-1 rounded-lg text-sm mr-1">
            Supprimer
          </button>
          <button onclick="modifier(${index})"
            class="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm">
            Modifier
          </button>
        </td>
      </tr>`;
    // CORRECTIONS :
    // 1. supprimer('${personne.id}')  ← ID Firebase entre guillemets simples
    // 2. modifier(${index})           ← index du tableau local (pas l'ID Firebase)
  });
 
  document.getElementById("liste").innerHTML = lignes.join("");
}
window.supprimer = supprimer;
window.modifier  = modifier;
//fonction pour supprimer une etudiant
async function supprimer(id){
    const supp = await deleteDoc(doc(ma_base_de_donnee, "tabeletudiants",id));
    await rechargement();

}

//fonction pour modifier 
async function modifier(index) {
    indexglobal = index;
    let etu = tableau[indexglobal]
    document.getElementById("nom").value = etu.nom;
    document.getElementById("prenom").value = etu.prenom;
    document.getElementById("age").value = etu.age;

    document.getElementById("btn-2").value = "Mettre à jour";

    
}

 
 
