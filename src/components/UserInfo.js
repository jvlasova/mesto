export default class UserInfo {
  constructor({ nameValueSelector, jobValueSelector }) {
    this._nameValue = document.querySelector(nameValueSelector);
    this._jobValue = document.querySelector(jobValueSelector);

    this._nameInput = document.querySelector('.popup__input_type_name');
    this._jobInput = document.querySelector('.popup__input_type_job');
  }
  
  getUserInfo() {
    return {
      nameValueSelector: this._nameValue.textContent,
      jobValueSelector: this._jobValue.textContent,
    }
  }

  setUserInfo(data) {
    this._nameValue.textContent = data.name;
    this._jobValue.textContent = data.job;
  }
}
