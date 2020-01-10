class View {
  constructor() {
    this.addInput = document.getElementById("add-input");
  }

  addAppItem(listItem) {
    const selectedIndex = listItem.children[3].selectedIndex;
    let selectedIndexName;

    switch (selectedIndex) {
      case 0:
        selectedIndexName = "A";
        break;
      case 1:
        selectedIndexName = "B";
        break;
      case 2:
        selectedIndexName = "C";
        break;
    }

    const priorityItem = document.querySelector("." + selectedIndexName);
    priorityItem.appendChild(listItem);
    this.addInput.value = "";
  }

  deleteItem(listItem) {
    listItem.remove();
  }

  editing(listItem, title) {
    listItem.classList.toggle("editing");
    listItem.querySelector(".textfield").value =
      title.charAt(0).toUpperCase() + title.substr(1, title.length - 1);
  }

  saveEditing(listItem, title) {
    listItem.classList.toggle("editing");
    listItem.querySelector(".title").textContent = title;
  }

  updateCompletedTask(listItem, isChecked) {
    if (isChecked) {
      listItem.classList.add("completed");
    } else listItem.classList.remove("completed");
  }
}

class Model {
  constructor() {}

  createItem(title, priorityList) {
    priorityList.addEventListener("change", controller.changePriorityItem);
    const checkBox = this.createElement("input", {
      className: "checkbox",
      type: "checkbox"
    });

    checkBox.onclick = controller.checkBoxEvent;

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
      priorityList,

      editButton,
      deleteButton
    );
    view.addAppItem(listItem);
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

  checkBoxEvent(event) {
    view.updateCompletedTask(event.target.parentNode, event.target.checked);
  }

  deleteButtonEvent(event) {
    view.deleteItem(event.target.parentNode);
  }

  saveEditingButtonEvent(event) {
    const listItem = event.target.parentNode;
    const title = listItem.querySelector(".textfield").value;

    view.saveEditing(listItem, title);
    event.target.onclick = controller.editButtonEvent;
  }

  editButtonEvent(event) {
    const listItem = event.target.parentNode;
    const title = listItem.querySelector(".title").textContent;

    view.editing(event.target.parentNode, title);
    event.target.onclick = controller.saveEditingButtonEvent;
  }

  changePriorityItem(event) {
    view.addAppItem(event.target.parentNode);
  }

  addButtonEvent(event) {
    event.preventDefault();
    const addButtonParent = event.target.parentNode;
    const addInput = document.getElementById("add-input");
    const priorityList = addButtonParent.querySelector("select");
    const timePriorityList = priorityList.cloneNode(true);

    if (addInput.value !== "") {
      model.createItem(addInput.value, priorityList);
      addInput.after(timePriorityList);
    }
  }
}

const model = new Model();
const controller = new Controller();
const view = new View();

controller.initEvents();
