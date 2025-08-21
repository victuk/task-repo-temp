module.exports = function (a, b) {
    let c = a + b;
    return c;
}


const encryptionKey = "dg/oS06OpOEbKmwUnwP+AQd+Pjs2LU3FNR3IxI6Sl4o=";

(async function encryptAES() {

    const data = "142";
    const token = encryptionKey;
    const nonce = "38sioeprihry";

    if (nonce.length !== 12) {
        throw new Error("Nonce must be exactly 12 characters long");
    }

    const cryptoSubtle = globalThis.crypto?.subtle || require("crypto").webcrypto?.subtle;
    if (!cryptoSubtle) {
        throw new Error("Crypto API is not available in this environment.");
    }

    const decodedKeyBytes = Uint8Array.from(atob(token), c => c.charCodeAt(0));

    const key = await cryptoSubtle.importKey(
        "raw",
        decodedKeyBytes,
        { name: "AES-GCM" },
        false,
        ["encrypt"]
    );
    const iv = new TextEncoder().encode(nonce);

    const encryptedData = await cryptoSubtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        new TextEncoder().encode(data)
    );

    console.log(btoa(String.fromCharCode(...new Uint8Array(encryptedData))));
})();

