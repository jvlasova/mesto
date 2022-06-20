export default class UserInfo {
  constructor({ nameValueSelector, jobValueSelector, avatarSelector}) {
    this._nameValue = document.querySelector(nameValueSelector);
    this._jobValue = document.querySelector(jobValueSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  
  getUserInfo() {
    return {
      nameValueSelector: this._nameValue.textContent,
      jobValueSelector: this._jobValue.textContent,
    }
  }

  setUserInfo(data) {
    this._nameValue.textContent = data.name;
    this._jobValue.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
