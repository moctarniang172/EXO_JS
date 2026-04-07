// function createNode(element) {
//     return document.createElement(element);
// }

// function append(parent, el) {
//   return parent.appendChild(el);
// }

// const ul = document.getElementById('authors');
// const url = 'https://randomuser.me/api/?results=10';
// const url2 = 'https://restcountries.com/v3.1/all?fields=name,capital,languages,flags,region,population;';



// fetch(url2)
// .then((resp) => resp.json())
// .then(function(afficher){
//     let pays  = afficher.result
//     return afficher.map(function(les_donnees){
//         let li = createNode('li');
//     let img = createNode('img');
//     let span = createNode('span');
//     let langage = createNode('p')

//       img.src = les_donnees.flags.png;                                        
//       img.alt = les_donnees.name.common;
//       span.innerHTML = `pays: ${les_donnees.name.common} <br> capital: ${les_donnees.capital} <br> langage: ${les_donnees.languages} <br> ${les_donnees.region} `;

//       append(li, img);
//       append(li, span);
//       append(li,langage)
//       append(ul, li);
    

//     })
   
// })
// .catch(function(error) {
//     console.log(error);
    
// });

// fetch(url)
// .then((resp) => resp.json())
// .then(function(data) {
//   let authors = data.results;
//   return authors.map(function(author) {
//     let li = createNode('li');
//     let img = createNode('img');
//     let span = createNode('span');
//     img.src = author.picture.medium;
//     span.innerHTML = `${author.name.first} ${author.name.last}`;
//     append(li, img);
//     append(li, span);
//     append(ul, li);
//   })
// })
// .catch(function(error) {
//   console.log(error);
// });
// let fil = document.getElementById("sec");
// let lien = 'https://restcountries.com/v3.1/all?fields=name,capital,languages,flags,region,population'

// fetch(lien)
// .then(function(resp){
//   return resp.json();
// })
// .then(function(data){
//   data.map(function(donnee){
//     let img = document.createElement("img");
//     let pays;
//     let capital;
//     let population;
//     let resultat = document.createElement("div");
//     pays = donnee.name.common;
//     capital = donnee.capital? donnee.capital[0]: "Pas de capitale";
//     population = donnee.population;
//     img.src = donnee.flags.png;
//     img.style.width = "100px";



//     resultat.innerHTML = `   
//                             <div class="w-[30%] h-[]">
//                             <strong>Pays:</strong>${pays}
//                             <strong>Capitale:</strong>${capital}
//                             <strong>Population:</str>${population}
//                             </div>`
//     resultat.prepend(img);

//     fil.appendChild(resultat);
    


//   })
 
// })
//  .catch(function(error){
//     console.log(error)
//   })

  //api pour chercher un pays
 
  async function valider(){
    let ajoute = document.getElementById("affiche")
    let pays = document.getElementById("pays-chercher").value.trim()
     // Vérification
  if (pays === "") {
    alert("Veuillez entrer un pays");
    return;
  }
   // Nettoyage affichage
  ajoute.innerHTML = "";
    let url = `https://restcountries.com/v3.1/name/${pays}`
     fetch(url)
    .then(function(resp){
       if(!resp.ok) throw new Error("Pays non trouvé : " + resp.status);
      return resp.json();
    })
    .then(function(data){
      data.map(function(donnee){
      
      let nom = donnee.name.common;
      let capital = donnee.capital ? donnee.capital[0] : "capitale non trouvée"
      let population = donnee.population;

      let resultat = document.createElement("div");
        resultat.innerHTML = `
          <div class="grid grid-cols-1 rounded-md bg-black text-white w-[30%]">
            pays: ${nom} <br> 
            capital: ${capital} <br>
            population: ${population}
          </div>
          `;

        ajoute.appendChild(resultat);
    })
    })
     .catch(function(error){
      console.log(error)
    })
  }