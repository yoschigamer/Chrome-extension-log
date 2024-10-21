
chrome.storage.local.set({ DOLAPIKEY: "undefined" }).then(() => {
  console.log("Waiting For Key");
});

// cest pour ca que jutilise le stockage de google  et faut forcement que le gars mette sa propre clé fin au mieux