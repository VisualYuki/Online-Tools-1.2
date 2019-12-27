"use strict";

class Calculator {
  prevOperand;
  currOperand;
  operator = "";
  answer = 0;
  firstOperand = 0;
  isLastSingleOperator = false;
  isLastDoubleOperator = false;

  constructor(currentOperandText, previousOperandText) {
    this.prevOperand = previousOperandText;
    this.currOperand = currentOperandText;
  }

  delete() {
    this.doCorrectCurrentOperand();

    if (this.isLastSingleOperator || this.isLastDoubleOperator) {
      this.prevOperand.innerText = "";
    }

    if (this.currOperand.innerText.length > 1) {
      this.currOperand.innerText = this.currOperand.innerText.substring(
        0,
        this.currOperand.innerText.length - 1
      );
    } else {
      this.currOperand.innerText = "0";
    }
  }

  clearAll() {
    this.prevOperand.innerText = "";
    this.currOperand.innerText = "0";
    this.operator = "";
  }

  printSymbol(buttonInnerText) {
    this.doCorrectCurrentOperand();

    switch (buttonInnerText) {
      case ".":
        if (this.currOperand.innerText.indexOf(".") == -1)
          this.currOperand.innerText += ".";
        break;
      case "π":
        this.currOperand.innerText = "3.141";
        break;
      case "e":
        this.currOperand.innerText = "2.718";
        break;
      case "±":
        if (this.currOperand.innerText.indexOf("-") == -1) {
          if (this.currOperand.innerText != "0")
            this.currOperand.innerText = "-" + this.currOperand.innerText;
        } else {
          this.currOperand.innerText = this.currOperand.innerText.substring(
            1,
            this.currOperand.innerText.length
          );
        }
        break;
    }
  }

  printDigit(buttonInnerText) {
    this.doCorrectCurrentOperand();

    if (this.isLastSingleOperator || this.isLastDoubleOperator) {
      this.prevOperand.innerText = "";
    }

    if (this.currOperand.innerText != "0") {
      this.currOperand.innerText += buttonInnerText;
    } else if (this.currOperand.innerText === "0") {
      this.currOperand.innerText = buttonInnerText;
    }
  }

  chooseOperand(buttonInnerText) {
    this.doCorrectCurrentOperand();
    this.operator = buttonInnerText != "xy" ? buttonInnerText : "^";
    this.isLastSingleOperator = this.isLastDoubleOperator = false;

    this.firstOperand = parseFloat(this.currOperand.innerText);
    this.prevOperand.innerText = this.firstOperand + this.operator;
    this.currOperand.innerText = "0";
  }

  calculateSingleOperator(buttonInnerText) {
    this.isLastSingleOperator = true;
    this.isLastDoubleOperator = false;
    if (this.isCorrectOperand()) {
      let curNumber = parseFloat(this.currOperand.innerText);

      switch (buttonInnerText) {
        case "x!":
          try {
            let count = 1;
            for (let i = 2; i <= curNumber; i++) {
              count *= i;
            }
            this.currOperand.innerText = count;
            this.prevOperand.innerText = curNumber + "!" + " = ";
          } catch (error) {
            this.currOperand.innerText = "0";
          }
          break;

          break;
        case "asin":
          this.prevOperand.innerText = "asin(" + curNumber + ")" + " = ";
          this.currOperand.innerText = Math.asin(curNumber);

          break;

        case "sin":
          this.prevOperand.innerText = "sin(" + curNumber + ")" + " = ";
          this.currOperand.innerText = Math.sin(curNumber);
          break;
        case "1/x":
          this.prevOperand.innerText = "1/" + curNumber + " = ";
          if (curNumber != 0) this.currOperand.innerText = 1 / curNumber;
          else this.currOperand.innerText = "error";
          break;
        case "acos":
          this.prevOperand.innerText = "acos(" + curNumber + ")" + " = ";
          this.currOperand.innerText = Math.acos(curNumber);
          break;
        case "cos":
          this.prevOperand.innerText = "cos(" + curNumber + ")" + " = ";
          this.currOperand.innerText = Math.cos(curNumber);
          break;
        case "√":
          this.prevOperand.innerText = "√" + curNumber + " = ";
          if (curNumber >= 0) this.currOperand.innerText = Math.sqrt(curNumber);
          else this.currOperand.innerText = "error";
          break;
        case "atan":
          this.prevOperand.innerText = "atan(" + curNumber + ")" + " = ";
          this.currOperand.innerText = Math.atan(curNumber);
          break;
        case "tg":
          this.prevOperand.innerText = "tg(" + curNumber + ")" + " = ";
          this.currOperand.innerText = Math.tan(curNumber);
          break;
        case "ln":
          this.prevOperand.innerText = "ln(" + curNumber + ")" + " = ";
          this.currOperand.innerText = Math.log(curNumber);
          break;
        case "lg":
          this.prevOperand.innerText = "lg(" + curNumber + ")" + " = ";
          this.currOperand.innerText = Math.log10(curNumber);
          break;
      }
    } else {
      this.doCorrectCurrentOperand();
    }
    this.operator = "";
  }
  calculateBineryOperator() {
    this.isLastDoubleOperator = true;
    this.isLastSingleOperator = false;

    let secondOperand = parseFloat(this.currOperand.innerText);
    switch (this.operator) {
      case "*":
        this.answer = this.firstOperand * secondOperand;
        this.prevOperand.innerText =
          this.firstOperand + " * " + secondOperand + " = ";
        this.currOperand.innerText = this.answer;
        break;
      case "÷":
        this.answer = this.firstOperand / secondOperand;
        this.prevOperand.innerText =
          this.firstOperand + " / " + secondOperand + " = ";
        this.currOperand.innerText = this.answer;
        break;
      case "-":
        this.answer = this.firstOperand - secondOperand;
        this.prevOperand.innerText =
          this.firstOperand + " - " + secondOperand + " = ";
        this.currOperand.innerText = this.answer;
        break;
      case "+":
        this.answer = this.firstOperand + secondOperand;
        this.prevOperand.innerText =
          this.firstOperand + " + " + secondOperand + " = ";
        this.currOperand.innerText = this.answer;
        break;
      case "mod":
        this.answer = this.firstOperand % secondOperand;
        this.prevOperand.innerText =
          this.firstOperand + " mod " + secondOperand + " = ";
        this.currOperand.innerText = this.answer;
        break;
      case "^":
        this.answer = Math.pow(this.firstOperand, secondOperand);
        this.prevOperand.innerText =
          this.firstOperand + " ^ " + secondOperand + " = ";
        this.currOperand.innerText = this.answer;
        break;
    }
    this.operator = "";
  }

  doCorrectCurrentOperand() {
    if (this.isCorrectOperand(this.currOperand.innerText) == false) {
      this.currOperand.innerText = "0";
    }
  }

  isCorrectOperand() {
    if (Number.isFinite(parseFloat(this.currOperand.innerText))) return true;
    else return false;
  }
}

window.addEventListener("load", function() {
  let digitButtons = document.getElementsByName("data-digit"),
    previousOperandText = document.querySelector(".result__previous-operand"),
    currentOperandText = document.querySelector(".result__current-operand"),
    deleteButton = document.querySelector("[Del]"),
    clearButton = document.querySelector("[C]"),
    textOperands = this.document.querySelectorAll("[operandText]"),
    equalButton = this.document.querySelector("[equalButton]"),
    symbols = this.document.getElementsByName("symbol"),
    singleOperators = this.document.getElementsByName("single-operator");

  let calculator = new Calculator(currentOperandText, previousOperandText);

  this.document.onkeyup = function typeKey(event) {
    if (
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(event.key) !=
      -1
    )
      calculator.printDigit(event.key);

    if (["*", "/", "-", "+", "mod", "^"].indexOf(event.key) != -1)
      calculator.chooseOperand(event.key);

    if (["±", "π", "e", "."].indexOf(event.key) != -1)
      calculator.printSymbol(event.key);

    if ("Backspace" == event.key) calculator.delete();

    if ("C" == event.key || "c" == event.key) calculator.clearAll();

    if ("Enter" == event.code && calculator.operator != "")
      calculator.calculateBineryOperator();
  };

  digitButtons.forEach(function(button, index) {
    button.addEventListener("click", function() {
      calculator.printDigit(button.innerText);
    });
  });

  deleteButton.addEventListener("click", function() {
    calculator.delete();
  });
  clearButton.addEventListener("click", function() {
    calculator.clearAll();
  });

  textOperands.forEach(function(button) {
    button.addEventListener("click", function() {
      calculator.chooseOperand(button.innerText);
    });
  });
  equalButton.addEventListener("click", function() {
    if (calculator.operator != "") calculator.calculateBineryOperator();
  });

  symbols.forEach(function(button) {
    button.addEventListener("click", function() {
      calculator.printSymbol(button.innerText);
    });
  });

  singleOperators.forEach(function(button) {
    button.addEventListener("click", function() {
      calculator.calculateSingleOperator(button.innerText);
    });
  });
});
