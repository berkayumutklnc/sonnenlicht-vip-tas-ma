import { getApps, initializeApp, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

function loadServiceAccount() {
  // Dev ortamı: secrets/service-account.json'dan oku
  const p = path.join(process.cwd(), "secrets", "service-account.json");
  if (!fs.existsSync(p)) {
    // Prod ya da alternatif: base64 env ile dene
    const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    if (!b64) {
      throw new Error(
        "Service account bulunamadı. secrets/service-account.json yok ve FIREBASE_SERVICE_ACCOUNT_BASE64 env de yok."
      );
    }
    return JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
  }
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}

const serviceAccount = loadServiceAccount();

const adminApp = getApps().length
  ? getApp()
  : initializeApp({
      credential: cert(serviceAccount as any),
    });

export const adminDb = getFirestore(adminApp);
