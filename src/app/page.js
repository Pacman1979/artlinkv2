import { useEffect, useState } from 'react' // useEffect is used to perform side effects in your components, such as data fetching, subscriptions, or manually changing the DOM. useState is used to add state to your functional components
import { useDispatch } from 'react-redux' // used for state management. useDispatch returns a reference to the dispatch function from the Redux store and can be used to dispatch actions. If your website uses Redux for state management and needs to dispatch actions, this would be required.
// import { HashRouter, Routes, Route } from 'react-router-dom' - not required due to 'next/link'
import { Container } from 'react-bootstrap'
import { ethers } from 'ethers' // I'm pretty sure this isn't required.

// Components
import Navbar from './Navigation';
import Jobs from './Jobs';          // TODO: needs to be established
import Talent from './Talent';      // TODO: needs to be established
import Profile from './Profile';    // TODO: needs to be established

import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadArtlink
} from '../store/interactions' // TODO: needs to be established but less complicated!

// WORK THROUGH THE FOLLOWING AND CHECK TO SEE WHAT IS NECESSARY!!!

function App() {

  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = await loadProvider(dispatch)

    // Fetch current network's chainId (e.g. hardhat: 31337, kovan: 42)
    const chainId = await loadNetwork(provider, dispatch)

    // Reload page when network changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })

    // Fetch current account from Metamask when changed
    window.ethereum.on('accountsChanged', async () => {
      await loadAccount(dispatch)
    })

    // Initiate contracts
    await loadTokens(provider, chainId, dispatch)
    await loadArtlink(provider, chainId, dispatch) // 'Artlink.sol' now exists. I think AMM referred to the AMM.sol contract.
  }

  useEffect(() => {
    loadBlockchainData()
  }, []);

  return (
    <Container>
      <Navigation />
      <hr />
      <Home />
      <Jobs />
      <Talent />
      <Profile />
    </Container>
  );
}

export default App;
