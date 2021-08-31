import classes from './Footer.module.css';

export const Footer = () => {
  return (
    <footer>
      <div className={classes.leftFooter}>&copy; 2021 GigaChad Sports</div>
      <div className={classes.rightFooter}>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <img
            src={require('../../assets/instagram.png').default}
            alt="Instagram"
          />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <img
            src={require('../../assets/twitter.png').default}
            alt="Twitter"
          />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <img
            src={require('../../assets/facebook.png').default}
            alt="Facebook"
          />
        </a>
      </div>
    </footer>
  );
};
