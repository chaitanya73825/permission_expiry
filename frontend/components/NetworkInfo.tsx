import { Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
// Internal components
import { DisplayValue, LabelValueGrid } from "@/components/LabelValueGrid";
import { isValidNetworkName } from "@/utils/helpers";

export function NetworkInfo() {
  const { network } = useWallet();
  return (
    <div className="flex flex-col gap-6 github-card p-6">
      <h4 className="text-lg font-medium text-github-text">Network Info</h4>
      <LabelValueGrid
        items={[
          {
            label: "Network name",
            value: (
              <DisplayValue
                value={network?.name ?? "Not Present"}
                isCorrect={isValidNetworkName(network)}
                expected={Object.values<string>(Network).join(", ")}
              />
            ),
          },
          {
            label: "URL",
            value: network?.url ? (
              <a href={network.url} target="_blank" rel="noreferrer" className="text-github-accent hover:text-github-accent/80 transition-colors">
                {network.url}
              </a>
            ) : (
              <span className="text-github-text-muted">Not Present</span>
            ),
          },
          {
            label: "Chain ID",
            value: <p className="text-github-text">{network?.chainId ?? "Not Present"}</p>,
          },
        ]}
      />
    </div>
  );
}
