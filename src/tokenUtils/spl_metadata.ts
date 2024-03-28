import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";

import wallet from "./wallet.json";

const mint = publicKey("5DbQ2JUN9uhUa1xWRQ1npAihrZjXmNk9udJskqmBMamF");

const umi = createUmi("https://api.devnet.solana.com");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      mintAuthority: signer,
    };
    let data: DataV2Args = {
      name: "Tokens & Smiles",
      symbol: "TST",
      uri: "https://arweave.net/4ij97L-ai38Rx80vTA1huccdLCJ0ZIe4Yx8ssHQCPjI",
      sellerFeeBasisPoints: 500,
      creators: null,
      collection: null,
      uses: null,
    };
    let args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };
    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });
    let result = await tx
      .sendAndConfirm(umi)
      .then((r) => r.signature.toString());
    console.log(result);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

/*
90,119,77,140,19,135,141,56,78,54,7,107,65,175,183,125,199,177,27,124,109,127,65,204,113,67,193,25,216,136,178,0,117,152,253,148,62,215,87,148,125,140,12,123,137,103,35,176,67,105,182,101,133,229,53,199,83,241,128,9,217,55,9,11
*/