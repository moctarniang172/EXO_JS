// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
//   import {getFirestore,  collection, addDoc, getDocs, updateDoc, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA8o0NswJ6JfxAiYAtEAU5GWvQO5V6Ho-k",
//   authDomain: "atelier-javscript.firebaseapp.com",
//   projectId: "atelier-javscript",
//   storageBucket: "atelier-javscript.firebasestorage.app",
//   messagingSenderId: "964398870182",
//   appId: "1:964398870182:web:65de8e381af8f1c614ce67",
//   measurementId: "G-LGYDV4G97V"
// };

// const app = initializeApp(firebaseConfig);
// const donnee =  getFirestore(app);

// let produits = [];
// let panier = [];
// let indexproduit = -1;
// let stockImage = null;


// // INTERACTION AVEC SIDBARE
// let open = document.getElementById("btn-ouvrir-panier");
// open.addEventListener("click", function(){
//     // Retire la classe qui cachait le panier
//   document.getElementById("panier-sidebar").classList.remove("translate-x-full");
//   // Affiche le fond sombre derrière
//   document.getElementById("btn-ouvrir-panier").classList.remove("hidden");

// })

// let fermer = document.getElementById("btn-fermer-panier");

// fermer.addEventListener("click", function(){
//   // Remet la classe → le panier glisse hors de l'écran
//   document.getElementById("panier-sidebar").classList.add("translate-x-full");
//   // Cache le fond sombre
//   document.getElementById("btn-ouvrir-panier").classList.remove("hidden");
// })

// // image du produits
// let image = document.getElementById("image-produit");
// image.addEventListener("change", async function() {
//     let input = image.files[0];
//     let rdear = new FileReader()

//     rdear.readAsDataURL(input)

//     rdear.onload = function(){
//         stockImage = rdear.result;
//        let apercu = document.getElementById("apercu");
//        if(apercu){
//         apercu.src = stockImage
//          apercu.classList.remove("hidden");
//        }
      

//     }
    
// })


// let ajoutProduit = document.getElementById("formulaire-admin");
// ajoutProduit.addEventListener("submit", async function(event){
//     event.preventDefault();

//     let nomProduit = document.getElementById("nom-produit").value.trim();
//     let prix = document.getElementById("prix-produit").value.trim();
//     let description = document.getElementById("description-produit").value.trim();

//     if(!nomProduit || !prix || !description || !stockImage){
//         return alert("remplis tous les champs !")
//     }
//     if(indexproduit !== -1){
//         let iddoc = produits[indexglobal].id

//         await updateDoc(doc(donnee, ("produits"),iddoc),{
//         nomProduit: nomProduit,
//         prix: prix,
//         description: description,
//         image: stockImage
//         })
//         indexproduit = -1;
//         document.querySelector("#btn").value= "modifier";
//         alert("Modifié avec succès !");
        
//     }else{
//         await addDoc(collection(donnee, "produits"),{
//            nomProduit: nomProduit,
//             prix: prix,
//             description: description,
//             image: stockImage
//         })
//         alert("Produit ajouté avec succès!")
//     };

//     document.getElementById("nom-produit").value = "";
//     document.getElementById("prix-produit").value = "";
//     document.getElementById("description-produit").value = "";
//     stockImage = null;

//     chargerProduit();
// })

// function afficherProduit(tab){

//     if (tab.length === 0) {
//     document.getElementById("liste-produits").innerHTML =
//       `<p class="text-gray-400 col-span-4 text-center py-10">
//          Aucun produit disponible
//        </p>`;
//     return;
//   }

//     let produits = tab.map(function(articles,index){
//         return ` <div class="bg-white rounded-xl shadow-md overflow-hidden
//                         hover:shadow-xl transition duration-300">
//                 <!-- Image du produit -->
//                 <img src="${articles.image}" alt="T-shirt Dakar" class="w-full h-48 object-cover"/> 
             
//                 <div class="p-4">
//                     <h3 class="font-bold text-gray-800 text-lg">${articles.nomProduit}</h3>
//                     <p class="text-gray-500 text-sm mt-1">${articles.description}</p>

//                     <!-- Prix + Bouton sur la même ligne -->
//                     <div class="flex justify-between items-center mt-4">
//                         <span class="text-[#16668e] font-bold text-lg">${articles.prix}</span>
//                         <button onclick="ajouter(${index})" class="bg-[#16668e] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#0f4a6a] transition">
//                         <i class="fa-solid fa-cart-plus mr-1"></i> Ajouter
//                         </button>
//                     </div>
//                 </div>
//             </div>`
//     })
//     document.getElementById("liste-produits").innerHTML = produits.join("");
// }

// onSnapshot(collection(donnee, "produits"), function (snapshot) {
//   let tab = [];
 
//   // forEach parcourt chaque document retourné
//   snapshot.forEach(function (document) {
//     tab.push({
//       id: document.id,    // L'ID Firebase (ex: "KzT3mN8p")
//       ...document.data()  // Les champs : nomProduit, prix, description, image
//     });
//   });
 
//   produits = tab;        // Met à jour le tableau global
//   afficherProduit(tab);  // Reconstruit les cartes HTML
// });

// //une fonction mpour le rechargement  des donnees depuis firebase

// // async function chargerProduit(){
// //     let tab = []
// //     const produit = await getDocs(collection(donnee, "produits"));
// //     let produits = produit.forEach(function(document){
// //         tab.push({id:document.id, ...document.data()})
   
// //     });
// //     produits = tab;
// //     afficherProduit(produits)
// // }

// //bouton ajouter un produit 

// async function ajouter(index){
//     let indexProduit = produits[index];
//     let produitAjouter = panier.find(function(items){
//         return items.id === indexProduit.id
//     })
//     if(produitAjouter){
//         produitAjouter.quantite = dejaDansPanier.quantite ++;

//     }else{
//         panier.push({
//       id:          produits.id,
//       nomProduit:  produits.nomProduit,
//       prix:        produits.prix,
//       image:       produits.image,
//       quantite:    1
//     });
//   }
 
//   afficherPanier(); // Met à jour l'affichage du panier


//  }
//  //fonction pour retirer un produit sur la panier
//  function retire(){
//     let article = panier.find(items=> items.id === index);

//     if(!article) return; 
//     if(article>1){

//            article.quantite = article.quantite - 1;

//     }
//     afficherPanier();
//  }
//  function afficherPanier(tab){
//     let listePanier = document.getElementById("liste-panier");
 
//   // Si le panier est vide
//   if (panier.length === 0) {
//     listePanier.innerHTML = `
//       <p class="text-gray-400 text-center mt-10">
//         <i class="fa-solid fa-basket-shopping text-4xl mb-3 block"></i>
//         Ton panier est vide
//       </p>`;
 
//     // Remet le compteur à 0
//     document.getElementById("compteur-panier").textContent = "0";
//     document.getElementById("total-panier").textContent    = "0 FCFA";
//     return;
//   }

//    // Construire chaque ligne du panier
//   let lignes = panier.map(function (item) {
//     return `
//       <div class="flex items-center gap-3 py-3 border-b border-gray-100">
        
//         <img src="${item.image}" alt="${item.nomProduit}"
//              class="w-14 h-14 object-cover rounded-lg"/>
        
//         <div class="flex-1">
//           <p class="font-semibold text-gray-800 text-sm">${item.nomProduit}</p>
//           <p class="text-[#16668e] text-sm font-bold">${item.prix} FCFA</p>
//         </div>
        
//         <!-- Contrôles quantité : - chiffre + -->
//         <div class="flex items-center gap-2">
//           <button onclick="retirerDuPanier('${item.id}')"
//             class="w-7 h-7 bg-gray-200 rounded-full text-gray-700 hover:bg-red-100 transition font-bold">
//             −
//           </button>
//           <span class="font-bold text-gray-800 w-4 text-center">${item.quantite}</span>
//           <button onclick="ajouterAuPanier(${produits.findIndex(p => p.id === item.id)})"
//             class="w-7 h-7 bg-gray-200 rounded-full text-gray-700 hover:bg-green-100 transition font-bold">
//             +
//           </button>
//         </div>
//       </div>`;
//   });
 
//   listePanier.innerHTML = lignes.join("");


//  }




// ============================================================
// IMPORTS — tous les outils Firebase dont on a besoin
// CORRECTION 1 : firebase-firestore.js et non firebase-analytics.js
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// ============================================================
// CONFIGURATION FIREBASE
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyA8o0NswJ6JfxAiYAtEAU5GWvQO5V6Ho-k",
  authDomain: "atelier-javscript.firebaseapp.com",
  projectId: "atelier-javscript",
  storageBucket: "atelier-javscript.firebasestorage.app",
  messagingSenderId: "964398870182",
  appId: "1:964398870182:web:65de8e381af8f1c614ce67"
};

// initializeApp = "ouvre la connexion à Firebase"
const app    = initializeApp(firebaseConfig);
// getFirestore = "donne-moi accès à la base de données"
const donnee = getFirestore(app);

// ============================================================
// VARIABLES GLOBALES
// produits  = tableau des produits chargés depuis Firebase
// panier    = tableau des articles dans le panier (en mémoire)
// indexProduit = -1 (mode ajout) | autre (mode modification)
// stockImage   = l'image en base64 après lecture FileReader
// ============================================================
let produits     = [];
let panier       = [];
let indexProduit = -1;
let stockImage   = null;

// ============================================================
// OUVRIR / FERMER LE PANIER
// translate-x-full = classe Tailwind qui cache le sidebar à droite
// remove() = retire la classe → le panier apparaît
// add()    = remet la classe  → le panier disparaît
// CORRECTION 2 : on écoutait overlay-panier au lieu de btn-ouvrir-panier
// ============================================================
document.getElementById("btn-ouvrir-panier").addEventListener("click", function () {
  // Retire la classe qui cachait le panier
  document.getElementById("panier-sidebar").classList.remove("translate-x-full");
  // Affiche le fond sombre derrière
  document.getElementById("overlay-panier").classList.remove("hidden");
});

document.getElementById("btn-fermer-panier").addEventListener("click", function () {
  // Remet la classe → le panier glisse hors de l'écran
  document.getElementById("panier-sidebar").classList.add("translate-x-full");
  // Cache le fond sombre
  document.getElementById("overlay-panier").classList.add("hidden");
});

// Cliquer sur le fond sombre ferme aussi le panier
document.getElementById("overlay-panier").addEventListener("click", function () {
  document.getElementById("panier-sidebar").classList.add("translate-x-full");
  document.getElementById("overlay-panier").classList.add("hidden");
});

// ============================================================
// LECTURE DE L'IMAGE (FileReader)
// FileReader lit un fichier local et le convertit en base64
// .readAsDataURL(fichier) = démarre la lecture
// .onload = fonction appelée quand la lecture est terminée
// .result = le contenu de l'image en base64 (une longue chaîne)
// CORRECTION 3 : new FileReader() avec () + reader.readAsDataURL()
// ============================================================
document.getElementById("image-produit").addEventListener("change", function () {
  let fichier = this.files[0]; // Le fichier sélectionné par l'utilisateur

  if (!fichier) return; // Si aucun fichier, on s'arrête

  let reader = new FileReader(); // Crée un lecteur de fichier
  reader.readAsDataURL(fichier); // Démarre la lecture en base64

  reader.onload = function () {
    stockImage = reader.result; // Stocke l'image en base64

    // Affiche un aperçu de l'image dans la page
    let apercu = document.getElementById("apercu");
    if (apercu) {
      apercu.src = stockImage;
      apercu.classList.remove("hidden");
    }
  };
});

// ============================================================
// FORMULAIRE ADMIN — AJOUTER / MODIFIER UN PRODUIT
// ============================================================
document.getElementById("formulaire-admin").addEventListener("submit", async function (event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Lire les valeurs des champs
  // CORRECTION 4 : "document" avec le "d" — "ocument" ne fonctionne pas
  let nomProduit  = document.getElementById("nom-produit").value.trim();
  let prix        = document.getElementById("prix-produit").value.trim();
  let description = document.getElementById("description-produit").value.trim();

  // Vérification : tous les champs doivent être remplis
  if (!nomProduit || !prix || !description || !stockImage) {
    return alert("Remplis tous les champs et choisis une image !");
  }

  // ── MODE MODIFICATION ──────────────────────────────────
  // CORRECTION 6 : indexproduit !== -1  (et non !== 1)
  if (indexProduit !== -1) {
    let idDoc = produits[indexProduit].id; // L'ID Firebase du produit

    await updateDoc(doc(donnee, "produits", idDoc), {
      nomProduit:  nomProduit,
      prix:        prix,
      description: description,
      image:       stockImage
    });

    indexProduit = -1;
    alert("Modifié avec succès !");

  // ── MODE AJOUT ─────────────────────────────────────────
  } else {
    await addDoc(collection(donnee, "produits"), {
      nomProduit:  nomProduit,
      prix:        prix,
      description: description,
      image:       stockImage // L'image en base64 stockée par FileReader
    });
    alert("Produit ajouté avec succès !");
  }

  // Vider le formulaire
  document.getElementById("nom-produit").value        = "";
  document.getElementById("prix-produit").value       = "";
  document.getElementById("description-produit").value = "";
  stockImage = null; // Réinitialise l'image
});

// ============================================================
// AFFICHER LES PRODUITS — construit les cartes HTML
// tab = tableau de produits venant de Firebase
// .map() = parcourt chaque produit et retourne du HTML
// ============================================================
function afficherProduit(tab) {
  if (tab.length === 0) {
    document.getElementById("liste-produits").innerHTML =
      `<p class="text-gray-400 col-span-4 text-center py-10">
         Aucun produit disponible
       </p>`;
    return;
  }

  let cartes = tab.map(function (article, index) {
    return `
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
        
        <img src="${article.image}" alt="${article.nomProduit}"
             class="w-full h-48 object-cover"/>
        
        <div class="p-4">
          <h3 class="font-bold text-gray-800 text-lg">${article.nomProduit}</h3>
          <p class="text-gray-500 text-sm mt-1">${article.description}</p>
          
          <div class="flex justify-between items-center mt-4">
            <span class="text-[#16668e] font-bold text-lg">${article.prix} FCFA</span>
            
            <div class="flex gap-2">
              <!-- Bouton ajouter au panier — passe l'index pour retrouver le produit -->
              <button onclick="ajouterAuPanier(${index})"
                class="bg-[#16668e] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#0f4a6a] transition">
                <i class="fa-solid fa-cart-plus mr-1"></i> Ajouter
              </button>
              
              <!-- Bouton supprimer (admin) -->
              <button onclick="supprimerProduit('${article.id}')"
                class="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>`;
  });

  document.getElementById("liste-produits").innerHTML = cartes.join("");
}

// ============================================================
// CHARGER LES PRODUITS — lit Firebase en temps réel
// onSnapshot = écoute continue : dès qu'un produit est
// ajouté/modifié/supprimé dans Firebase, la page se met
// à jour automatiquement sans recharger
// CORRECTION 5 : on utilisait doc() au lieu de collection()
// ============================================================
onSnapshot(collection(donnee, "produits"), function (snapshot) {
  let tab = [];

  // forEach parcourt chaque document retourné
  snapshot.forEach(function (document) {
    tab.push({
      id: document.id,    // L'ID Firebase (ex: "KzT3mN8p")
      ...document.data()  // Les champs : nomProduit, prix, description, image
    });
  });

  produits = tab;        // Met à jour le tableau global
  afficherProduit(tab);  // Reconstruit les cartes HTML
});

// ============================================================
// PANIER — LA LOGIQUE COMPLÈTE
//
// Le panier est un tableau d'objets :
// [
//   { id: "abc", nomProduit: "T-shirt", prix: 5000, quantite: 2 },
//   { id: "xyz", nomProduit: "Sac",     prix: 12000, quantite: 1 }
// ]
//
// Chaque fois qu'on ajoute un produit :
//   1. On cherche s'il est déjà dans le panier
//   2. OUI → on augmente sa quantité
//   3. NON → on l'ajoute avec quantite: 1
//   4. On recalcule le total
//   5. On réaffiche le panier
// ============================================================
function ajouterAuPanier(index) {
  let produit = produits[index]; // Récupère le produit depuis le tableau global

  // Cherche si ce produit est déjà dans le panier
  // .find() retourne l'élément trouvé, ou undefined si absent
  let dejaDansPanier = panier.find(function (item) {
    return item.id === produit.id;
  });

  if (dejaDansPanier) {
    // Le produit est déjà là → on augmente juste la quantité
    dejaDansPanier.quantite = dejaDansPanier.quantite + 1;
  } else {
    // Nouveau produit → on l'ajoute avec quantite: 1
    panier.push({
      id:          produit.id,
      nomProduit:  produit.nomProduit,
      prix:        produit.prix,
      image:       produit.image,
      quantite:    1
    });
  }

  afficherPanier(); // Met à jour l'affichage du panier
}

// ============================================================
// RETIRER DU PANIER — diminue la quantité ou supprime l'article
// ============================================================
function retirerDuPanier(id) {
  // Trouve l'article dans le panier par son ID
  let article = panier.find(item => item.id === id);

  if (!article) return; // Sécurité : si l'article n'existe pas

  if (article.quantite > 1) {
    // Il en reste plusieurs → on diminue juste de 1
    article.quantite = article.quantite - 1;
  } else {
    // Il n'en reste qu'un → on le retire complètement du tableau
    // .filter() crée un nouveau tableau sans l'élément qu'on veut retirer
    panier = panier.filter(item => item.id !== id);
  }

  afficherPanier(); // Réaffiche le panier mis à jour
}

// ============================================================
// AFFICHER LE PANIER — construit le HTML de la liste des articles
// ============================================================
function afficherPanier() {
  let listePanier = document.getElementById("liste-panier");

  // Si le panier est vide
  if (panier.length === 0) {
    listePanier.innerHTML = `
      <p class="text-gray-400 text-center mt-10">
        <i class="fa-solid fa-basket-shopping text-4xl mb-3 block"></i>
        Ton panier est vide
      </p>`;

    // Remet le compteur à 0
    document.getElementById("compteur-panier").textContent = "0";
    document.getElementById("total-panier").textContent    = "0 FCFA";
    return;
  }

  // Construire chaque ligne du panier
  let lignes = panier.map(function (item) {
    return `
      <div class="flex items-center gap-3 py-3 border-b border-gray-100">
        
        <img src="${item.image}" alt="${item.nomProduit}"
             class="w-14 h-14 object-cover rounded-lg"/>
        
        <div class="flex-1">
          <p class="font-semibold text-gray-800 text-sm">${item.nomProduit}</p>
          <p class="text-[#16668e] text-sm font-bold">${item.prix} FCFA</p>
        </div>
        
        <!-- Contrôles quantité : - chiffre + -->
        <div class="flex items-center gap-2">
          <button onclick="retirerDuPanier('${item.id}')"
            class="w-7 h-7 bg-gray-200 rounded-full text-gray-700 hover:bg-red-100 transition font-bold">
            −
          </button>
          <span class="font-bold text-gray-800 w-4 text-center">${item.quantite}</span>
          <button onclick="ajouterAuPanier(${produits.findIndex(p => p.id === item.id)})"
            class="w-7 h-7 bg-gray-200 rounded-full text-gray-700 hover:bg-green-100 transition font-bold">
            +
          </button>
        </div>
      </div>`;
  });

  listePanier.innerHTML = lignes.join("");

  // ── Calculer le total ──────────────────────────────────
  // reduce() parcourt le tableau et accumule une valeur
  // total = 0 au début, puis on ajoute prix × quantité à chaque tour
  let total = panier.reduce(function (cumul, item) {
    return cumul + (parseInt(item.prix) * item.quantite);
  }, 0); // 0 = valeur de départ

  // Affiche le total formaté
  document.getElementById("total-panier").textContent =
    total.toLocaleString("fr-FR") + " FCFA";

  // Calcule le nombre total d'articles (somme des quantités)
  let nbArticles = panier.reduce(function (cumul, item) {
    return cumul + item.quantite;
  }, 0);

  // Met à jour le badge rouge sur l'icône panier
  document.getElementById("compteur-panier").textContent = nbArticles;
}

// ============================================================
// SUPPRIMER UN PRODUIT (admin)
// ============================================================
async function supprimerProduit(id) {
  if (!confirm("Supprimer ce produit ?")) return;
  await deleteDoc(doc(donnee, "produits", id));
  // Pas besoin de rechargement : onSnapshot s'en occupe automatiquement
}

// ============================================================
// EXPOSER LES FONCTIONS AU HTML
// Dans un module ES6, les fonctions sont privées.
// Les onclick="..." dans le HTML cherchent dans window.
// On les attache à window pour les rendre accessibles.
// ============================================================
window.ajouterAuPanier  = ajouterAuPanier;
window.retirerDuPanier  = retirerDuPanier;
window.supprimerProduit = supprimerProduit;