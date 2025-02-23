("use strict");

const firstName = document.getElementById("first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const select = document.querySelector("select");
const phoneNo = document.querySelector("#mobile");
const pass = document.querySelector("#pass");
const confiPass = document.querySelector("#confpass");
const errorMsg = document.querySelector("#msg");
let img = document.querySelector("img");
let user = document.querySelector("#user-information");
console.log(select.childElementCount);

// const subBtn = document.querySelector("#sub");
const form = document.getElementById("sign-up-form");
const resBtn = document.querySelector("#res");

const togglePass = document.querySelector("#togglepass");

// toggle password
togglePass.addEventListener("click", function () {
  let type = pass.getAttribute("type") == "password" ? "text" : "password";
  pass.setAttribute("type", type);
  if (type == "password") {
    this.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
  } else {
    this.innerHTML = '<i class="fa-regular fa-eye"></i>';
  }
});

//form validation

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // form validation
  if (
    !firstName.value.trim() ||
    !lastName.value.trim() ||
    !phoneNo.value.trim() ||
    !pass.value.trim() ||
    !confiPass.value.trim() ||
    !select.value.trim()
  ) {
    errorMsg.innerText = "Please fill in all fields";
    if (firstName.value.trim() === "") {
      firstName.value = "";
      return;
    }
    if (lastName.value.trim() === "") {
      lastName.value = "";
      return;
    }
    if (phoneNo.value.trim() === "") {
      phoneNo.value = "";
      return;
    }
    if (pass.value.trim() === "") {
      pass.value = "";
      return;
    }
    if (confiPass.value.trim() === "") {
      confiPass.value = "";
      return;
    }
    if (select.value.trim() === "") {
      select.value = "";
      return;
    }
    return;
  }

  isValidPass();

  // let passValue = pass.value;
  // let confValue = confiPass.value;
});

// password match
function isValidPass() {
  if (pass.value.trim() !== confiPass.value.trim()) {
    errorMsg.innerText = "password do not match";
    errorMsg.style.color = "red";
  } else {
    // errorMsg.style.display = "block";
    errorMsg.innerText = "Form submitted successfully!";
    errorMsg.style.color = "green";
    // form.submit();
    let eliment = document.createElement("div");
    let selectedId = select.options[select.selectedIndex];

    eliment.innerHTML = `<div class="user-data-hello">
    <p>Name = ${firstName.value} ${lastName.value}</p>
    <p>Email = ${email.value} </p>
    <p>PhonNo = ${selectedId.id} ${phoneNo.value}</p>
    <p>Password = ${pass.value} </p>
    <p>ConfirmPass = ${confiPass.value} </p>
    </div>
    <button type="button" id="delete">delete</button>`;
    eliment.classList.add("user-data-collect");
    let delet = eliment.querySelector("#delete");
    delet.addEventListener("click", () => {
      user.removeChild(eliment);
    });

    user.prepend(eliment);
    clearInput();
  }
  return;
}

//dropdown validation
let getData = async () => {
  let response = await fetch("CountryCodes.json");

  let data = await response.json();

  return data;
};

let jsonData = async () => {
  let data = await getData();
  data.forEach((eli) => {
    let newOption = document.createElement("option");
    newOption.innerText = `${eli.name} ${eli.dial_code}`;
    newOption.id = eli.dial_code;
    newOption.value = eli.code;

    // console.log(newOption.name);
    if (eli.dial_code === "+91") {
      newOption.selected = "selected";
    }

    select.append(newOption);

    resBtn.addEventListener("click", () => {
      errorMsg.innerText = "";
      if (eli.dial_code === "+91") {
        newOption.selected = "selected";
        img.src = `https://flagsapi.com/${select.value}/flat/64.png`;
      }
      clearInput();
    });
  });
  img.src = `https://flagsapi.com/${select.value}/flat/64.png`;

  select.addEventListener("input", () => {
    let seletValue = select.value;

    img.src = `https://flagsapi.com/${seletValue}/flat/64.png`;
  });
};
jsonData();

const clearInput = () => {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  phoneNo.value = "";
  pass.value = "";
  confiPass.value = "";
};
