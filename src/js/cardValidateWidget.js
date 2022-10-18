import algLuhn from "./algLuhn";

export default class cardValidateWidget {
  constructor() {
    this.input = null;
    this.cardImage = [];
    this.paySystem = null;
  }

  init() {
    this.cardImage = Array.from(document.getElementsByClassName("card-img"));
    this.input = document.getElementById("num-card-input");

    console.log(this.cardImage);
    const validateButton = document.getElementById("num-card-submit");
    validateButton.addEventListener("click", event => {
      event.preventDefault();
      this.input.classList = "widget-input";
      this.validateCard(this.input.value);
    });

    this.input.addEventListener("keydown", event => {
      this.cardImage.forEach(item => item.classList.add("grey"));
      this.checkPaySystem(this.input.value);
      this.cardImage.forEach(item => {
        if (item.dataset.id === this.paySystem) {
          item.classList.remove("grey");
        }
      });
    });
  }

  validateCard(number) {
    if (number !== " " && algLuhn(number)) {
      this.input.classList.add("valid");
    } else {
      this.input.classList.add("invalid");
    }
  }

  checkPaySystem(number) {
    if (/^[0-9]+$/.test(number)) {
      if (/^4/.test(number)) {
        this.paySystem = "visa";
      } else if (/^5[1-5]/.test(number)) {
        this.paySystem = "mastercard";
      } else if (/^(34|37)/.test(number)) {
        this.paySystem = "american express";
      } else if (/^2/.test(number)) {
        this.paySystem = "mir";
      } else if (/^(60)/.test(number)) {
        this.paySystem = "discover";
      } else if (/^(62)/.test(number)) {
        this.paySystem = "unionpay";
      } else {
        this.paySystem = "";
      }
    }
  }
}
