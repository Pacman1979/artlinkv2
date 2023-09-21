import Page from './page';
import { Provider } from 'react-redux';
import { createStore } from 'redux'; // Import createStore from Redux

import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

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
import OnboardingPopup from '../OnboardingPopup';

// Components
import Navigation from './Navigation';

// Import your reducers and create a rootReducer if necessary
// import rootReducer from './store/reducers'; // Replace with the actual path to your reducers

const store = createStore(rootReducer); // Create your Redux store

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
  const dispatch = useDispatch()

  const loadProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    dispatch(setProvider(provider))

    return provider
  }

  const loadNetwork = async (provider) => {
    const { chainId } = await provider.getNetwork()
    dispatch(setNetwork(chainId))

    return chainId
  }

  const loadAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = ethers.utils.getAddress(accounts[0])
    dispatch(setAccount(account))

    return account
  }

  useEffect(() => {
    const provider = loadProvider()
    loadNetwork(provider)
    loadAccount()
  }, [])

  return (
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Page /> {/* Render your RainbowApp component here */}
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  )
}

export default RainbowApp
