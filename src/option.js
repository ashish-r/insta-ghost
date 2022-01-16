(function () {
  var background = chrome.extension.getBackgroundPage();

  const btn = document.getElementById('ig-ghost-btn');
  const msg = document.getElementById('ig-ghost-msg');

  function setButton(flag) {
    if (flag === false) {
      btn.classList.remove('active');
      msg.innerText = 'Ghost Mode : OFF';
    } else {
      btn.classList.add('active');
      msg.innerText = 'Ghost Mode : ON';
    }
  }

  function savePreferences() {
    setButton(!background.iSOn);
    background.savePreferences();
  }

  function restorePreferences() {
    setButton(background.iSOn);
  }

  document.addEventListener('DOMContentLoaded', restorePreferences);
  btn.addEventListener('click', savePreferences);
})();
