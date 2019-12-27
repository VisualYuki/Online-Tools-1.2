class View {
  constructor() {}
}

class Model {
  constructor() {}

  createItem(title) {
    const checkBox = this.createElement(
      "input",
      new { class: "checkbox", type: "checkbox" }()
    );
    const label = this.createElement("label", { class: "title" }, title);
    const input = this.createElement("input", {
      class: "textfield",
      type: "text"
    });
    const editButton = this.createElement(
      "button",
      { class: "edit" },
      "Изменить"
    );
    const deleteButton = this.createElement(
      "button",
      { class: "delete" },
      "Удалить"
    );
    const listItem = document.createElement(
      "li",
      { class: "todo-item" },
      checkBox,
      label,
      input,
      editButton,
      deleteButton
    );

    console.log(item);
  }

  createElement(tag, props, ...children) {
    const item = document.createElement(tag);
    Object.keys(props).forEach(function(prop) {
      item[prop] = props[prop];
    });

    if (children.length > 0) {
      children.forEach(function(child) {
        if (typeof child == "string") {
          item.contentText = child;
        } else item.appendChild(child);
      });
    }

    return item;
  }
}

class Controller {
  constructor(model) {
    this.model = model;
    this.addButton = document.getElementById("add-button");
  }

  initEvents() {
    this.addButton.addEventListener("click", this.addButtonEvent);
  }

  addButtonEvent(event) {
    event.preventDefault();
    const addButtonParent = event.target.parentNode;
    const addInput = document.getElementById("add-input");

    if (addInput.value !== "") {
      this.model.createItem(addInput.value);
    }
  }
}

function main() {
  const model = new Model();
  const controller = new Controller(model);
  controller.initEvents();
}

main();
