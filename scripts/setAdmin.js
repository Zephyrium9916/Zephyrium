const admin = require("firebase-admin");
const serviceAccount = require("./path-to-your-serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const email = "chicoajsmith@gmail.com"; 

admin
  .auth()
  .getUserByEmail(email)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log(`Admin role granted to ${email}`);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
