import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { NETWORK, PERMISSION_EXPIRY_MODULE_ADDRESS } from "../frontend/constants";

const config = new AptosConfig({ network: NETWORK as Network });
const aptos = new Aptos(config);

/**
 * Gas Estimation for Permission Expiry Smart Contract Functions
 */

export interface GasEstimate {
  functionName: string;
  estimatedGasUnits: number;
  description: string;
  category: "entry" | "view";
}

// Typical gas costs for Move operations on Aptos
export const gasEstimates: GasEstimate[] = [
  {
    functionName: "initialize",
    estimatedGasUnits: 1500,
    description: "Initialize permission registry - creates global resource",
    category: "entry"
  },
  {
    functionName: "grant_permission", 
    estimatedGasUnits: 2000,
    description: "Grant new permission - writes to storage, emits event",
    category: "entry"
  },
  {
    functionName: "revoke_permission",
    estimatedGasUnits: 1800,
    description: "Revoke existing permission - updates storage, emits event", 
    category: "entry"
  },
  {
    functionName: "view_is_permission_valid",
    estimatedGasUnits: 0,
    description: "Check permission validity - read-only operation",
    category: "view"
  },
  {
    functionName: "view_permission",
    estimatedGasUnits: 0,
    description: "Get permission details - read-only operation",
    category: "view"
  },
  {
    functionName: "is_admin",
    estimatedGasUnits: 0,
    description: "Check admin status - read-only operation",
    category: "view"
  },
  {
    functionName: "get_admin",
    estimatedGasUnits: 0,
    description: "Get admin address - read-only operation", 
    category: "view"
  },
  {
    functionName: "registry_exists",
    estimatedGasUnits: 0,
    description: "Check if registry exists - read-only operation",
    category: "view"
  }
];

/**
 * Simulate transaction to get actual gas estimation
 */
export async function simulateTransaction(
  senderAddress: string,
  functionName: string,
  functionArguments: any[]
): Promise<number> {
  try {
    const transaction = await aptos.transaction.build.simple({
      sender: senderAddress,
      data: {
        function: `${PERMISSION_EXPIRY_MODULE_ADDRESS}::permission_expiry::${functionName}`,
        functionArguments: functionArguments,
      },
    });

    const simulation = await aptos.transaction.simulate.simple({
      signerPublicKey: "0x" + "0".repeat(64), // Dummy public key for simulation
      transaction,
    });

    return parseInt(simulation[0].gas_used);
  } catch (error) {
    console.error(`Error simulating ${functionName}:`, error);
    return 0;
  }
}

/**
 * Display gas estimates in a formatted table
 */
export function displayGasEstimates(): void {
  console.log("\n🔥 GAS CONSUMPTION ANALYSIS - Permission Expiry Smart Contract");
  console.log("=".repeat(80));
  console.log("| Function Name              | Gas Units | Category | Description");
  console.log("=".repeat(80));
  
  gasEstimates.forEach(estimate => {
    const gasDisplay = estimate.estimatedGasUnits === 0 ? "FREE" : estimate.estimatedGasUnits.toString();
    const categoryIcon = estimate.category === "entry" ? "💰" : "👁️";
    
    console.log(
      `| ${estimate.functionName.padEnd(25)} | ${gasDisplay.padEnd(8)} | ${categoryIcon} ${estimate.category.padEnd(5)} | ${estimate.description}`
    );
  });
  
  console.log("=".repeat(80));
  console.log("\n📊 GAS COST BREAKDOWN:");
  console.log("• Entry Functions: Require gas payment (state changes)");
  console.log("• View Functions: FREE - No gas required (read-only)");
  console.log("• Estimated costs based on typical Move operations");
  console.log("• Actual costs may vary based on network conditions");
}

// Export the function to display gas estimates
export { displayGasEstimates as default };
