import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";

import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";

import { readFile } from "fs/promises";

import wallet from "./wallet.json";

const umi = createUmi("https://api.devnet.solana.com");
const uploader = createBundlrUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));

const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(signer));

(async () => {
  try {
    const file = "./logo.jpg";
    const buffer = await readFile(file);
    const image = createGenericFile(buffer, "logo.jpg");
    const [myUri] = await uploader.upload([image]);
    console.log(`image uri is: ${myUri}`);
  } catch (e) {
    console.log(`sth went wrong: ${e}`);
  }
})();

// https://arweave.net/wgoc8mVnBfzzU2C8tMcZJeoiGhTSL5BEA7oL7pSt1PM
