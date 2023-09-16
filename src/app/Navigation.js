import Link from 'next/link';

import logo from '../logo.png';

export default function Navbar({ account }) {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <img
            alt="logo"
            src="./logo.png"
            width="40"
            height="40"
          />
        </li>
        <li>
          <Link href="/">
            <a>Artlink</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/jobs">
            <a>Jobs</a>
          </Link>
        </li>
        <li>
          <Link href="/talent">
            <a>Talent</a>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </li>
      </ul>
      <div className="account-info">
        {account.slice(0, 4) + '...' + account.slice(39, 42)}
      </div>
    </nav>
  );
}

