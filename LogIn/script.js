let login = document.querySelector("#submit");
const fname = document.querySelector("#fname");
const lName = document.querySelector("#lname");
const message = document.querySelector("#message");
login.addEventListener("submit", (event) => {
  event.preventDefault();
  CheckUser();
});

function CheckUser() {
  fetch("https://testapi.io/api/ABukis/resource/ToDoUsers")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((result) => {
      console.log(result);
      let isUserExist = result.data.filter((element) => {
        return element.name === fname.value && element.lastName === lName.value;
      });
      console.log(isUserExist);
      if (isUserExist.length > 0) {
        localStorage.setItem("userToDo", `${fname.value} ${lName.value}`);
        fname.value = "";
        lName.value = "";
        window.location = "../ToDoPage/index.html";
      } else {
        const text = document.createElement("p");
        text.innerHTML = "This User does not exist, please register";
        fname.value = "";
        lName.value = "";

        message.appendChild(text);
        message.style.color = "red";
        text.style.fontSize = "40px";
        message.style.textAlign = "center";
        setTimeout(() => {
          message.style.display = "none";
          window.location = "../RegistrationForm/index.html";
        }, 2000);
      }
    });
}
