const lettersAllowed =
  "éèêà€AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789<>&~#'-_\"\\,?;.:/!%*^$=+()[]@";

export const generateRandomChar = () => {
  return lettersAllowed[
    Math.floor(Math.random() * Math.floor(lettersAllowed.length))
  ];
};

export const randomValue = max => {
  // Generate a random number beetwen [0; max[
  return Math.floor(Math.random() * Math.floor(max));
};
