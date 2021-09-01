import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AuthContext } from '../../store/auth-context';
import classes from './Header.module.css';

export const Header = (props) => {
  const authCtx = useContext(AuthContext);

  const [currentWeekNumber, setCurrentWeekNumber] = useState(1);

  useEffect(() => {
    const getCurrentWeekNumber = async () => {
      const response = await fetch(
        'https://api.chadssupercontest.net:8080/getCurrentWeekNumber'
      );
      const data = await response.json();
      setCurrentWeekNumber(data);
    };
    getCurrentWeekNumber();
  });

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
    ? `/viewPicks/${authCtx.username}?weekNumber=${currentWeekNumber}`
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
            <NavLink to="/makePicks" activeClassName={classes.active}>
              <li>Make Picks</li>
            </NavLink>
            <NavLink to={viewPicksUrl} activeClassName={classes.active}>
              <li>View Picks</li>
            </NavLink>
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
            <NavLink to="/seasonLeaderboard" activeClassName={classes.active}>
              <li>Season</li>
            </NavLink>
            <NavLink
              to={`/weeklyLeaderboard?weekNumber=${currentWeekNumber}`}
              activeClassName={classes.active}
            >
              <li>Weekly</li>
            </NavLink>
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
            <NavLink to="/admin/postLines" activeClassName={classes.active}>
              <li>Post Lines</li>
            </NavLink>
            <NavLink to="/admin/scoreGames" activeClassName={classes.active}>
              <li>Score Games</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </header>
  );
};
