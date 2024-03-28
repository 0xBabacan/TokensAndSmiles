import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";

import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";

import wallet from "./wallet.json";

const umi = createUmi("https://api.devnet.solana.com");
const uploader = createBundlrUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

(async () => {
  try {
    const image =
      "https://arweave.net/wgoc8mVnBfzzU2C8tMcZJeoiGhTSL5BEA7oL7pSt1PM";
    const metadata = {
      name: "Tokens & Smiles",
      symbol: "TST",
      description: "Tokens & Smiles logo",
      image,
      properties: {
        files: [
          {
            type: "image/png",
            uri: image,
          },
        ],
      },
    };
    const myUri = await uploader.uploadJson(metadata);
    console.log(`image uri is: ${myUri}`);
  } catch (e) {
    console.log(`sth went wrong: ${e}`);
  }
})();

// https://arweave.net/4ij97L-ai38Rx80vTA1huccdLCJ0ZIe4Yx8ssHQCPjI
