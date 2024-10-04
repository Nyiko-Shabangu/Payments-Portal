import React from 'react';
import { Link } from 'react-router-dom';


const navigationBar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/login" style={styles.navLink}>Login</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/registration" style={styles.navLink}>Register</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/transactionpage" style={styles.navLink}>Transactions</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/admin" style={styles.navLink}>Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px'
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0
  },
  navItem: {
    margin: '0 15px'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px'
  }
};

export default navigationBar;