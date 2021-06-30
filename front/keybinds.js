export default function createKeyboardListener(document) {

  function setupBtn(btnId, textId, callback) {
    document.getElementById(btnId).addEventListener("click", () => {
      const letter = document.getElementById(textId).value;
      console.log(`Guessing letter: ${letter}`);
      callback(letter);
      document.getElementById(textId).value = "";
    });
  }

  return {
    setupBtn
  }
}