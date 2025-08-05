import { NETWORK } from "@/constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import * as Dialog from "@radix-ui/react-dialog";

export function WrongNetworkAlert() {
  const { network, connected } = useWallet();

  return !connected || network?.name === NETWORK ? (
    <></>
  ) : (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg p-6 github-card border border-github-border transition-transform duration-300 ease-in-out w-[90vw] max-w-md">
          <div className="text-center">
            <Dialog.Title className="text-3xl font-semibold mb-4 text-github-text">
              Wrong Network
            </Dialog.Title>
            <Dialog.Description className="text-lg text-github-text-muted">
              Your wallet is currently on <span className="font-bold text-github-accent">{network?.name}</span>. Please switch to{" "}
              <span className="font-bold text-github-accent">{NETWORK}</span> to continue using the app.
            </Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
