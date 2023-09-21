'use client'

import { useEffect, useState } from 'react' // useEffect is used to perform side effects in your components, such as data fetching, subscriptions, or manually changing the DOM. useState is used to add state to your functional components
import { useDispatch, provider } from 'react-redux' // used for state management. useDispatch returns a reference to the dispatch function from the Redux store and can be used to dispatch actions. If your website uses Redux for state management and needs to dispatch actions, this would be required.

import { Container } from 'react-bootstrap'
import { ethers } from 'ethers'

// Components
import Navbar from './Navigation';
import Home from './Home';
import Jobs from './Jobs';
import Talent from './Talent';
import Profile from './Profile';
import Message from './Message';

import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadArtlink                   // I think I need this to link to the Artlink.sol contract.
} from '../store/interactions'  // TODO: needs to be established but less complicated!

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
