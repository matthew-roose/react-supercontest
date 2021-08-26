import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { AuthContext } from '../../store/auth-context';
import { ViewPickIndividualGame } from '../../components/ViewPickIndividualGame/ViewPickIndividualGame';

import classes from './ViewPicks.module.css';

export const ViewPicks = (props) => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const weekNumberQueryParam = queryParams.get('weekNumber');

  const params = useParams();

  const [picks, setPicks] = useState([]);

  let wins = 0;
  let losses = 0;
  let pushes = 0;

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const getWeeklyPicks = async () => {
        const response = await fetch(
          // can look up picks from any user
          `http://localhost:8080/getPicks/${params.username}?weekNumber=${weekNumberQueryParam}`,
          {
            headers: {
              'Login-Token': authCtx.loginToken,
              'Content-Type': 'application/json',
            },
          }
        );
        const pickData = await response.json();
        setPicks(pickData.picks);
      };
      getWeeklyPicks();
    }
  }, [authCtx, params.username, weekNumberQueryParam]);

  const changeFilterHandler = (event) => {
    history.push(`${location.pathname}?weekNumber=${event.target.value}`);
    // setWeekFilter(event.target.value);
  };

  const pickedGameElements = picks.map((pick) => {
    if (pick.result === 'WIN') {
      wins++;
    } else if (pick.result === 'LOSS') {
      losses++;
    } else if (pick.result === 'PUSH') {
      pushes++;
    }
    return <ViewPickIndividualGame key={pick.gameId} pick={pick} />;
  });

  return (
    <React.Fragment>
      <div className={classes.weekNumberTitle}>
        Week {weekNumberQueryParam}: {wins}-{losses}
        {pushes !== 0 ? `-${pushes}` : ''}
      </div>
      <select onChange={changeFilterHandler}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <div>{pickedGameElements}</div>
    </React.Fragment>
  );
};
