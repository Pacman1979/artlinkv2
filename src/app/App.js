import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  canto
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import OnboardingPopup from './OnboardingPopup';

// Components
import Navigation from './Navigation';

const cantoTest = {
    id: 7701,
    name: 'Canto Testnet',
    network: 'cantotestnet',
    iconUrl: 'https://example.com/icon.svg',
    iconBackground: '#fff',
    nativeCurrency: {
      decimals: 18,
      name: 'Testnet Canto',
      symbol: 'CANTO',
    },
    rpcUrls: {
      public: { http: ['https://testnet-archive.plexnode.wtf'] },
      default: { http: ['https://testnet-archive.plexnode.wtf'] },
    },
    blockExplorers: {
      default: { name: 'Canto Testnet EVM Explorer (Blockscout)', url: 'https://testnet.tuber.build' }
    },
    testnet: true,
  };

const { chains, publicClient } = configureChains(
    [canto, cantoTest],
    [
      publicProvider()
    ]
  );

const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'd0acf05e3f3266987f227011f35d1b02',
    chains
  });

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

function RainbowApp() {
  return (
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <OnboardingPopup />
    </RainbowKitProvider>
  </WagmiConfig>
  )
}

export default RainbowApp
