(function() {
  let passwordLength = 10;
  let options = {
    lower: true,
    upper: true,
    digits: true,
    symbols: false
  };
  let symbolSets = {
    lower: "zyxwvutsrqponmlkjihgfedcba",
    upper: "ZYXWVUTSRQPONMLKJIHGFEDCBA",
    digits: "1234567890",
    symbols: ";%:?*()_+=-~/<>[]{}!"
  };
  let symbolsForPassword =
    "1234567890ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba";

  document.querySelector(".password-length__range").oninput = function(event) {
    document.querySelector(
      ".number-symbols"
    ).textContent = passwordLength = this.value;
  };

  document.querySelectorAll("input[type=checkbox]").forEach(item => {
    item.addEventListener("change", function(event) {
      if (event.target.checked == false) {
        let count = 0;
        for (let item in options) {
          if (options[item]) count++;
        }

        if (count > 1) options[event.target.id] = event.target.checked;
        else event.target.checked = true;
      } else options[event.target.id] = event.target.checked;

      symbolsForPassword = "";

      for (let prop in options) {
        if (options[prop]) symbolsForPassword += symbolSets[prop];
      }
    });
  });

  document
    .querySelector(".generate")
    .addEventListener("click", function(event) {
      generatePassword();
    });

  generatePassword();

  function generatePassword() {
    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      newPassword +=
        symbolsForPassword[
          Math.trunc(Math.random() * 1000) % symbolsForPassword.length
        ];
    }
    document.querySelector(".password").textContent = newPassword;
  }
})();
