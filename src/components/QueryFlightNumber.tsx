import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React, { FC, useCallback, useState } from "react";
import { notify } from "utils/notifications";
//import { getFlightMiles } from './FlightUtils';
import { getFlightMiles } from './ReadFlightFromFile';
import { transferTST } from 'tokenUtils/spl_transfer';
import { checkClaimedFlights } from './CheckClaimedFlights';
import { writeClaimedFlights } from './WriteClaimedFlights';

export const QueryFlightNumber: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [flightNumber, setFlightNumber] = React.useState("");

  const onClick = useCallback(async () => {
    try {
      if (!publicKey) {
        return notify({
          type: "error",
          message: "Error",
          description: "Wallet not connected!",
        });
      }

      if (!checkClaimedFlights(publicKey.toBase58(), flightNumber)) {
        //const flightMile = await getFlightMiles(flightNumber);
        const flightMile = await getFlightMiles(flightNumber);
        if (flightMile > 0) {
          console.log('publicKey: ', publicKey.toBase58());
          console.log('transferAmount: ', flightMile);
          writeClaimedFlights(publicKey.toBase58(), flightNumber);
          await transferTST(publicKey.toBase58(), flightMile);
          notify({
            type: "success",
            message: "Success",
            description: "Transaction successful!",
          });
        }
      } else {
        notify({ type: "error", message: "error", description: "You already claimed your tokens for this flight!" });
      }
// THIS PART WILL BE REMOVED
/*
      const lamports = await connection.getMinimumBalanceForRentExemption(0);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: Keypair.generate().publicKey,
          lamports,
        })
      );

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });

      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });
      notify({
        type: "success",
        message: "Success",
        description: "Transaction successful!",
      });
*/
    } catch (e) {
      notify({ type: "error", message: "error", description: e.message });
    }
  }, [publicKey, sendTransaction, connection]);

  return (
    <div>
      <div className="flex flex-row items-center">
        <div style={{ marginRight: "10px" }}>Flight Number:</div>
        <input
            id="flightNumber"
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            style={{ width: "100px", color: "#EBF5FF", background: "#002060", border: "1px #EBF5FF", borderRadius: "8px", paddingLeft: "6px"}}
        />
      </div>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-24 mt-4"
        onClick={() => onClick()}
      >
        Earn your Tokens & Smiles!
      </button>
    </div>
  );
};
