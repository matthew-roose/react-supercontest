import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../store/auth-context';
import classes from './Header.module.css';

export const Header = (props) => {
  const authCtx = useContext(AuthContext);

  let authDiv;
  if (!authCtx.isLoggedIn) {
    authDiv = (
      <div onClick={props.onStartAuth} className={classes.loginLogout}>
        <img src={require('../../assets/login.png').default} alt="Login" />
        <div>Log In</div>
      </div>
    );
  } else {
    authDiv = (
      <div
        onClick={authCtx.logout}
        className={`${classes.loginLogout} ${classes.logout}`}
      >
        <img src={require('../../assets/login.png').default} alt="Logout" />
        <div className={classes.firstName}>{authCtx.firstName}</div>
        <div className={classes.logoutText}>Log out</div>
      </div>
    );
  }

  const viewPicksUrl = authCtx.isLoggedIn
    ? `/viewPicks/${authCtx.username}?weekNumber=1`
    : '/viewPicks';

  return (
    <header>
      <div className={classes.logoAndLogin}>
        <Link to="/">
          <div className={classes.logo}>
            <img
              src={require('../../assets/gigachad.png').default}
              alt="GigaChad Sports logo"
            />
            <div className={classes.title}> Chad's Supercontest</div>
          </div>
        </Link>
        {authDiv}
      </div>
      <div className={classes.menuBar}>
        <div className={`${classes.dropdown} ${classes.picksDropdown}`}>
          <div className={classes.dropdownSymbols}>
            <div>Picks</div>
            <img
              src={require('../../assets/down_arrow.png').default}
              alt="Expand"
            />
          </div>
          <ul
            className={`${classes.dropdownList} ${classes.picksDropdownList}`}
          >
            <Link to="/makePicks">
              <li>Make Picks</li>
            </Link>
            <Link to={viewPicksUrl}>
              <li>View Picks</li>
            </Link>
          </ul>
        </div>

        <div className={`${classes.dropdown} ${classes.leaderboardDropdown}`}>
          <div className={classes.dropdownSymbols}>
            <div>Leaders</div>
            <img
              src={require('../../assets/down_arrow.png').default}
              alt="Expand"
            />
          </div>
          <ul
            className={`${classes.dropdownList} ${classes.leaderboardDropdownList}`}
          >
            <Link to="/seasonLeaderboard">
              <li>Season</li>
            </Link>
            <Link to="/weeklyLeaderboard">
              <li>Weekly</li>
            </Link>
          </ul>
        </div>

        <div className={`${classes.dropdown} ${classes.adminDropdown}`}>
          <div className={classes.dropdownSymbols}>
            <div>Admin</div>
            <img
              src={require('../../assets/down_arrow.png').default}
              alt="Expand"
            />
          </div>
          <ul
            className={`${classes.dropdownList} ${classes.adminDropdownList}`}
          >
            <Link to="/admin/postLines">
              <li>Post Lines</li>
            </Link>
            <Link to="/admin/scoreGames">
              <li>Score Games</li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};
