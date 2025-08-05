import { useWallet } from "@aptos-labs/wallet-adapter-react";
// Internal components
import { LabelValueGrid } from "@/components/LabelValueGrid";

export function WalletDetails() {
  const { wallet } = useWallet();
  return (
    <div className="flex flex-col gap-6 github-card p-6">
      <h4 className="text-lg font-medium text-github-text">Wallet Details</h4>
      <LabelValueGrid
        items={[
          {
            label: "Icon",
            value: wallet?.icon ? <img src={wallet.icon} alt={wallet.name} width={24} height={24} className="rounded" /> : <span className="text-github-text-muted">Not Present</span>,
          },
          {
            label: "Name",
            value: <p className="text-github-text">{wallet?.name ?? "Not Present"}</p>,
          },
          {
            label: "URL",
            value: wallet?.url ? (
              <a href={wallet.url} target="_blank" rel="noreferrer" className="text-github-accent hover:text-github-accent/80 transition-colors">
                {wallet.url}
              </a>
            ) : (
              <span className="text-github-text-muted">Not Present</span>
            ),
          },
        ]}
      />
    </div>
  );
}
