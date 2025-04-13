export class LoadMoreButton {
  static HIDDEN_CLASS = 'is-hidden';

  constructor(buttonEl) {
    this.button = buttonEl;
    this.prevText = '';
  }

  disable() {
    this.button.disable = true;
    this.prevText = this.button.textContent;
    this.button.textContent = 'Loading...';
  }

  enable() {
    this.button.disable = false;
    this.button.textContent = this.prevText;
  }

  hide() {
    this.button.classList.add(LoadMoreButton.HIDDEN_CLASS);
  }

  show() {
    this.button.classList.remove(LoadMoreButton.HIDDEN_CLASS);
  }
}
