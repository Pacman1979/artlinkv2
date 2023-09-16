import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function OnboardingPopup() {
    return (
        <div className="onboarding-popup">
            <header>
                <img src="path_to_artlink_symbol" alt="Artlink Symbol" />
                <h1>Artlink</h1>
                <nav>
                    <button className="hamburger-icon"></button>
                    <button className="chat-icon"></button>
                </nav>
            </header>

            <main>
                <p>Connect...</p>
                <Button variant="neutral">G Continue with Google</Button>
                <div className="social-buttons">
                    <Button variant="neutral">Instagram</Button>
                    <Button variant="neutral">Twitter</Button>
                </div>

                <input type="text" placeholder="Email or Phone" />
                <Button variant="brand">Continue</Button>

                <p>or</p>
                <p>External wallet</p>
                <ConnectButton variant="brand">CONNECT WITH WALLET</ConnectButton>
            </main>
        </div>
    );
}

export default OnboardingPopup;