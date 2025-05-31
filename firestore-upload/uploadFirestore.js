const admin = require("firebase-admin");
const fs = require("fs");

// Load your service account key JSON file
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load your product data
const rawData = fs.readFileSync("data.json");
const data = JSON.parse(rawData);

async function uploadProducts() {
  const batch = db.batch();
  const productsCollection = db.collection("products");

  if (!Array.isArray(data.products)) {
    console.error("JSON does not contain a 'products' array");
    return;
  }

  data.products.forEach((product) => {
    if (!product.id) {
      console.warn("Skipping product with missing id:", product);
      return;
    }
    // Use product.id as document ID in Firestore
    const docRef = productsCollection.doc(product.id);
    // Clone product and remove id from fields
    const productData = { ...product };
    delete productData.id;
    batch.set(docRef, productData);
  });

  await batch.commit();
  console.log("Uploaded products successfully!");
}

uploadProducts().catch((err) => {
  console.error("Error uploading products:", err);
});
