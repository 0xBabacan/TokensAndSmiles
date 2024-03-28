import { Commitment, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import wallet from "./wallet.json";

const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const tokenAddress = new PublicKey("5DbQ2JUN9uhUa1xWRQ1npAihrZjXmNk9udJskqmBMamF");
const TOKEN_DECIMALS = 1_000_000;

export async function transferTST(pubKeyString: string, transferAmount: number) {
//(async () => {
  try {
    const recipientAddress = new PublicKey(pubKeyString);

    const from_ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      tokenAddress,
      keypair.publicKey
    );

    const to_ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      tokenAddress,
      recipientAddress
    );

    const tx = await transfer(
      connection,
      keypair,
      from_ata.address,
      to_ata.address,
      keypair.publicKey,
      transferAmount * TOKEN_DECIMALS
      //100000
    );

    console.log(
      `Succesfully transfered! Transaction Here: https://explorer.solana.com/tx/${tx}?cluster=devnet`
    );
  } catch (error: any) {
      if (error.response) {
          console.error('HTTP error:', error.response.status);
      } else if (error.request) {
          console.error('Request error:', error.request);
      } else {
          console.error('Error:', error.message);
      }
  }
}
//})();