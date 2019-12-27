class View {
  constructor() {}
}

class Controller {
  constructor() {
    this.addButton = document.querySelector(".add-button");
  }

  initEvent() {
    this.addButton.addEventListener("click", this.addButtonEvent);
  }

  addButtonEvent({ target }) {
    const addButtonParent = target.parentNode;
    const addInput = addButtonParent.getElementById("add-input");

    if (addInput.value !== "") {
    }
  }
}
