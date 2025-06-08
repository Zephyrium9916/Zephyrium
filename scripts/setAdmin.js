const admin = require("firebase-admin");
const serviceAccount = require("nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDLV9/YoIBMuypF\nUFckTLhneviH0OLfpJntOjRclG4Rd1R4eyuiaOban73xWeXp1CwKUxzBFQ5F3J8G\noW2qAQ3T2F6FH7WP+m/jMuH39Yt2SYGKo4TgkCpaqpgQUAxeAAZ8/sdKG9rMVxY1\nJqfGKLjpWQiWrfME8rPUA2XgGYK7rKaZzD0exiuVwfMdgAS+X/Xjcv0uuR5YSbUb\n+96ub5C/PygSWf052Pg52AACGfNO0E6EgmVpbQZFoNfTuU+M5sLqvxXVQw3E9bmn\nJceYuyz/JMj1dlaOYT0Y3OAY1qqLqAPg/QUo74o3mi/p5U44gQWuc2FOuO93g7Nq\nPn7Ir27nAgMBAAECggEAMxCMTFByJ9LQ2LtGRv1lScdd5m2Uq+kgJqz5PU6hHY3E\nDsWPvaduYfS/tH6I+GGp9aXNkMeC4BR5cybS7WB6Ynrxsai25cNUmc/LY4OsVDY9\na92InwRVPpOcwGv5zxleh8FLttar6ajtEMf2VhMf7KnJOF3Sq6lvc4yu5spBRHOy\nR9nQRETbAw6qq+XQT+rhWPPvLGn/ALS6UuyEb8f/3rPhSjaS9rZ3YzOrsfEFARg+\nNcvBd86q0kYCiy0d9a1/+/zseWK+pIfmif6AV2z3lotsVSixdGjEhIb0fAdtZCeF\nJSCGPdTGK16g4jS7J64/RFcn6TGDjutKrToqtgU68QKBgQDzF6coEz9PlrtYcLUp\nKCcrfvz81hnFeH/JwAoJDG+/tirvTrn96NyFWH582jx++aoEdyoS0NovL2YaJLHK\nyiy1xaqGXHkpYsRqyY7KzwyeqTBF2Ab5Bh/7uGFn3ZYpcKMlpYmuh2Oy45+xbB35\n3XmtvRtf+kxyBr9resv4opL/QwKBgQDWI+mpR8yuJGSu+w5sn5kt4hec+h/uh/CS\njAbf3PnhS3h05bkdkNze/ayHlE03UzuESdp/BvKtwkCDvUhlNAky+2ElEpMzgZrQ\nmANGPQvuUO5G0NPW54I6izQunHB78qfkiZJVUaQrMm4X0Sh2mcksCcIVq4IZcqaz\nwLUxT3TdjQKBgGTD4zhLciztkE8CuTWMPWBcTUYJAbnHT0Ez53UEwLW5L2bvPU2w\n3ugvXI8ob3c6ymz7cGdIR4jTnwErQL+MuqfGff8gCeFL3ZteXWBYHyUNgMMS3yEO\nludi8I17Xqli1V3flojP+lXG4QVMichvM+b+woAwYsvJXEOTLUWtLj29AoGAURQ7\n7npfBziEXrR0G7C6IONQKYGTAY+7COG34J8cha87ppcsZgNpfYzy/Eqsidwb1tTX\nw+zvidbY8oiClr8DFKiVeaH01jWmVoCYDMokcFF4Rpve+amiZ2Q5l8Rn2qZf52on\nW+KTlD9968qn1XAY+XGgaPANTHFaqQi4EjmReCkCgYBchlskSjY6IjZVwdIZBNmG\nd6O497LvpQRQdwokaPvPa1pqAOQMy6ItMBh4hO24T9yr869t+9FKa7BicAnwJAl9\nfZw8SkU4E6/EsWs/3dVqma5TOrB70QQJRMjO/Il22uDZd8UZtDkwRqWf4Xy7QKOR\nYXYcX0rg1BD4oQ9m1X4sFw==");

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
