import PrimaryButton from "@/components/Button";
import { useWeb3 } from "@/context/useWeb3";
import { useEffect, useState } from "react";

export default function Home() {
  const { address, getUserAddress, sendCUSD } = useWeb3();
  const [signingLoading, setSigningLoading] = useState(false);
  const [tx, setTx] = useState<any>(undefined);
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    getUserAddress().then(async () => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  async function sendingCUSD() {
    if (recipient && amount) {
      setSigningLoading(true);
      try {
        const tx = await sendCUSD(recipient, amount);
        console.log(recipient);
        console.log(tx);
        setTx("transaction succeful");
        setTx(tx);
      } catch (error) {
        console.log(error);
      } finally {
        setSigningLoading(false);
      }
    }
  }

  return (
    <div className="container">
      <h1>Wisdom cUSD Wallet</h1>
      {address && (
        <>
          <div className="address">
            Here is your address: <span>{address}</span>
          </div>

          {tx && (
            <p className="transaction">
              Tx Completed: {(tx.transactionHash as string).substring(0, 6)}
              ...
              {(tx.transactionHash as string).substring(
                tx.transactionHash.length - 6,
                tx.transactionHash.length
              )}
            </p>
          )}
          <div className="input-group">
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <PrimaryButton
              loading={signingLoading}
              onClick={sendingCUSD}
              title="Send cUSD"
              className="primary-button"
            />
          </div>
        </>
      )}
    </div>
  );
}
