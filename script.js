const { prismaClient } = require("./src/app/db/prisma/prismaClient.js");

async function login() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  emailInput.style.borderColor = "#ccc";
  emailError.style.display = "none";
  passwordInput.style.borderColor = "#ccc";
  passwordError.style.display = "none";

  if (emailInput.validity.valueMissing) {
    emailInput.style.borderColor = "#ff3333";
    emailError.style.display = "block";
  }

  if (passwordInput.validity.valueMissing) {
    passwordInput.style.borderColor = "#ff3333";
    passwordError.style.display = "block";
  }

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  const findUser = await prismaClient.user.findFirst({
    where: {
      email: emailValue,
    },
  });

  console.log(findUser);
}
