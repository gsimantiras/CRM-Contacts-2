export class ModalService {
  constructor() {}

  closeModal() {
    return function () {
      this.classList.remove('crm-show');
      this.classList.add('crm-hidden');
    };
  }

  openModal() {
    return function () {
      this.classList.add('crm-show');
      this.classList.remove('crm-hidden');
    };
  }
}
