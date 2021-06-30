export default function createKeyboardListener(document) {

  function setupBtn(btnId, textId, callback) {
    document.getElementById(btnId).addEventListener("click", () => {
      const letter = document.getElementById(textId).value;
      callback(letter);
      document.getElementById(textId).value = "";
    });
  }

  return {
    setupBtn
  }
}