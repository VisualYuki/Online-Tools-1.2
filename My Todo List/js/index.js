class View {
  constructor() {
    this.todoList = document.getElementById("todo-list");
    this.addInput = document.getElementById("add-input");
  }

  addAppItem(listItem) {
    this.todoList.appendChild(listItem);
    this.addInput.value = "";
  }

  deleteItem(listItem) {
    listItem.remove();
  }

  editing(listItem, title) {
    listItem.classList.toggle("editing");
    listItem.querySelector(".textfield").value = title;
  }

  saveEditing(listItem, title) {
    listItem.classList.toggle("editing");
    listItem.querySelector(".title").textContent = title;
  }
}

class Model {
  constructor() {}

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
    editButton.onclick = controller.editButtonEvent;

    const deleteButton = this.createElement("button", { className: "delete" });
    deleteButton.addEventListener("click", controller.deleteButtonEvent);

    const listItem = this.createElement(
      "li",
      { className: "todo-item" },
      checkBox,
      label,
      input,
      editButton,
      deleteButton
    );
    view.addAppItem(listItem);
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
  constructor() {
    this.addButton = document.getElementById("add-button");
  }

  initEvents() {
    this.addButton.addEventListener("click", this.addButtonEvent.bind(this));
  }

  deleteButtonEvent(event) {
    view.deleteItem(event.target.parentNode);
  }

  saveEditingButtonEvent(event) {
    const listItem = event.target.parentNode;
    const title = listItem.querySelector(".textfield").textContent;
    view.saveEditing(listItem, title);

    event.target.onclick = this.editButtonEvent;
  }

  editButtonEvent(event) {
    const listItem = event.target.parentNode;
    const title = listItem.querySelector(".title").textContent;

    view.editing(event.target.parentNode, title);
    event.target.onclick = this.saveEditingButtonEvent;
  }

  addButtonEvent(event) {
    event.preventDefault();
    const addButtonParent = event.target.parentNode;
    const addInput = document.getElementById("add-input");

    if (addInput.value !== "") {
      model.createItem(addInput.value);
    }
  }
}

const model = new Model();
const controller = new Controller();
const view = new View();

controller.initEvents();
