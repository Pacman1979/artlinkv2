import { useDispatch } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

import logo from '../logo.png';

import { loadAccount } from '../store/interactions'

export default function Navigation({ account }) {
  const dispatch = useDispatch()

  const connectHandler = async () => {
    await loadAccount(dispatch)
  }

  return (
    <Navbar className='my-3' expand="lg">
      <img
        alt="logo"
        src={logo}
        width="40"
        height="40"
        className="d-inline-block align-top mx-3"
      />
      <Navbar.Brand href="#">
        <Link href="/">Artlink</Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="nav" />
      <Navbar.Collapse id="nav" className="justify-content-end">

        <ul className="navbar">
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

        <div className="d-flex justify-content-end mt-3">
          {account ? (
            <Navbar.Text className='d-flex align-items-center'>
              {account.slice(0, 4) + '...' + account.slice(39, 42)}
            </Navbar.Text>
          ) : (
            <Button onClick={connectHandler}>Connect</Button>
          )}
        </div>

      </Navbar.Collapse>
    </Navbar>
  );
}
