import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

const mint = new PublicKey("5DbQ2JUN9uhUa1xWRQ1npAihrZjXmNk9udJskqmBMamF");

(async () => {
  try {
    // Create an ATA
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    console.log(`Your ata is: ${ata.address.toBase58()}`);

    // Mint to ATA
    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair.publicKey,
      1000n * token_decimals
    );
    console.log(`Your mint txid: ${mintTx}`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();

/*
Your ata is: CPUzMv318ATSLrdZToLKtDZE2QsXhbV6Rk2eWrUaFjwr
Your mint txid: 5K5EY2GJFCUpUF717xtMnT7xgEr5P1BoZf1XfeJbBwkvVK8XmSEJyNx35c11zc3KmWmy8wLyupVEfba5T8JXSpZ3
*/