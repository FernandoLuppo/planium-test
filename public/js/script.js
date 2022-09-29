//  1- Colocar name nos valores para conseguir pegar no back
//  2- Arrumar a distancia dos parágrafos dos inputs

let userInformations = document.getElementById("userInformations");
let select = document.getElementById("select");

function choosingValues() {
  let onePerson = document.getElementById("onePerson");
  let twoPeople = document.getElementById("twoPeople");
  let threePeople = document.getElementById("threePeople");
  let fourPeople = document.getElementById("fourPeople");

  //    If have just one beneficiary
  if (select.value == 1) {
    let item = document.createElement("div");
    item.setAttribute("id", "onePerson");
    item.setAttribute("class", "benefited-people");
    item.innerHTML = `

    <p class="beneficiariesTitle">Idade do beneficiário</p>
    <p class="beneficiariesSubtitle">1º Beneficiário idade</p>
    <input type="number" name="ageFirstPerson" placeholder="Idade">
    
    <p class="beneficiariesTitle">Nome do beneficiário</p>
    <p class="beneficiariesSubtitle">1º Beneficiário nome</p>
    <input type="text" name="nameFirstPerson" placeholder="Nome">`;

    //    Removing others options of beneficiary
    if (twoPeople || threePeople || fourPeople) {
      userInformations.removeChild(userInformations.lastChild);
    }

    userInformations.appendChild(item);
  }

  //    If have just two beneficiary
  if (select.value == 2) {
    let item = document.createElement("div");
    item.setAttribute("id", "twoPeople");
    item.setAttribute("class", "benefited-people");
    item.innerHTML = `

    <p class="beneficiariesTitle">Idade dos beneficiários</p>
    <p class="beneficiariesSubtitle">1º beneficiário idade</p>
    <input type="number" name="ageFirstPerson" placeholder="Idade">
    <p class="beneficiariesSubtitle">2º beneficiário idade</p>
    <input type="number" name="ageSecondPerson" placeholder="Idade">
    
    <p class="beneficiariesTitle">Nome dos beneficiários</p>
    <p class="beneficiariesSubtitle">1º beneficiário</p>
    <input type="text" name="nameFirstPerson" placeholder="Nome">
    <p class="beneficiariesSubtitle">2º beneficiário nome</p>
    <input type="text" name="nameSecondPerson" placeholder="Nome">`;

    //    Removing others options of beneficiary
    if (onePerson || threePeople || fourPeople) {
      userInformations.removeChild(userInformations.lastChild);
    }

    userInformations.appendChild(item);
  }

  //    If have just three beneficiary
  if (select.value == 3) {
    let item = document.createElement("div");
    item.setAttribute("id", "threePeople");
    item.setAttribute("class", "benefited-people");
    item.innerHTML = `

    <p class="beneficiariesTitle">Idade dos beneficiários</p>
    <p class="beneficiariesSubtitle">1º beneficiário</p>
    <input type="number" name="ageFirstPerson" placeholder="Idade">
    <p class="beneficiariesSubtitle">2º beneficiário</p>
    <input type="number" name="ageSecondPerson" placeholder="Idade">
    <p class="beneficiariesSubtitle">3º beneficiário</p>
    <input type="number" name="ageThirdPerson" placeholder="Idade">
    
    <p class="beneficiariesTitle">Nome dos beneficiários</p>
    <p class="beneficiariesSubtitle">1º beneficiário</p>
    <input type="text" name="nameFirstPerson" placeholder="Nome">
    <p class="beneficiariesSubtitle">2º beneficiário</p>
    <input type="text" name="nameSecondPerson" placeholder="Nome">
    <p class="beneficiariesSubtitle">3º beneficiário</p>
    <input type="text" name="nameThirdPerson" placeholder="Nome">`;

    //    Removing others options of beneficiary
    if (onePerson || twoPeople || fourPeople) {
      userInformations.removeChild(userInformations.lastChild);
    }

    userInformations.appendChild(item);
  }

  //    If have just four beneficiary
  if (select.value == 4) {
    let item = document.createElement("div");
    item.setAttribute("id", "fourPeople");
    item.setAttribute("class", "benefited-people");
    item.innerHTML = `

    <p class="beneficiariesTitle">Idade dos beneficiários</p>
    <p class="beneficiariesSubtitle">1º beneficiário</p>
    <input type="number" name="ageFirstPerson" placeholder="Idade">
    <p class="beneficiariesSubtitle">2º beneficiário</p>
    <input type="number" name="ageSecondPerson" placeholder="Idade">
    <p class="beneficiariesSubtitle">3º beneficiário</p>
    <input type="number" name="ageThirdPerson" placeholder="Idade">
    <p class="beneficiariesSubtitle">4º beneficiário</p>
    <input type="number" name="ageFourthPerson" placeholder="Idade">
    
    <p class="beneficiariesTitle">Nome dos beneficiários</p>
    <p class="beneficiariesSubtitle">1º beneficiário</p>
    <input type="text" name="nameFirstPerson" placeholder="Nome">
    <p class="beneficiariesSubtitle">2º beneficiário</p>
    <input type="text" name="nameSecondPerson" placeholder="Nome">
    <p class="beneficiariesSubtitle">3º beneficiário</p>
    <input type="text" name="nameThirdPerson" placeholder="Nome">
    <p class="beneficiariesSubtitle">4º beneficiário</p>
    <input type="text" name="nameFourthPerson" placeholder="Nome">`;

    //    Removing others options of beneficiary
    if (onePerson || twoPeople || threePeople) {
      userInformations.removeChild(userInformations.lastChild);
    }

    userInformations.appendChild(item);
  }
}

select.addEventListener("change", choosingValues);
