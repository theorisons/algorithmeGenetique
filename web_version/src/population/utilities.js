const LETTERS_ALLOWED =
  "AaàâBbCcçDdEeéèêFfGgHhIiîJjKkLlMmNnOoôPpQqRrSsTtUuûµùVvWwXxYyZz 0123456789<>&~#'-_\"\\,?;.:/!%*^§¤°$€£=+()[]@";

export const generateRandomChar = () => {
  return LETTERS_ALLOWED[
    Math.floor(Math.random() * Math.floor(LETTERS_ALLOWED.length))
  ];
};

export const randomValue = max => {
  // Generate a random number beetwen [0; max[
  return Math.floor(Math.random() * Math.floor(max));
};

export const checkForLetters = word => {
  let newWord = "";
  for (let i = 0; i < word.length; i++) {
    if (LETTERS_ALLOWED.indexOf(word[i]) !== -1) {
      newWord = newWord + word[i];
    }
  }
  return newWord;
};
