class View {
  constructor() {
    this.todoList = document.getElementById("todo-list");
    this.addInput = document.getElementById("add-input");
  }

  addAppItem(listItem) {
    this.todoList.appendChild(listItem);
    this.addInput.value = "";
  }
}

class Model {
  constructor() {
    this.View = new View();
  }

  createItem(title) {
    const checkBox = this.createElement("input", {
      className: "checkbox",
      type: "checkbox"
    });
    const label = this.createElement("label", { className: "title" }, title);
    const input = this.createElement("input", {
      className: "textfield",
      type: "text"
    });
    const editButton = this.createElement("button", { className: "edit" });
    const deleteButton = this.createElement("button", { className: "delete" });
    const listItem = this.createElement(
      "li",
      { className: "todo-item" },
      checkBox,
      label,
      input,
      editButton,
      deleteButton
    );
    this.View.addAppItem(listItem);
    // console.log(listItem);
  }

  createElement(tag, props, ...children) {
    const item = document.createElement(tag);
    Object.keys(props).forEach(prop => {
      item[prop] = props[prop];
    });

    if (children.length > 0) {
      children.forEach(function(child) {
        if (typeof child == "string") {
          item.textContent = child;
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
    this.addButton.addEventListener("click", this.addButtonEvent.bind(this));
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
