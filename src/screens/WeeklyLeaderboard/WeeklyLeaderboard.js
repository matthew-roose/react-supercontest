import React from 'react';

import { useHistory, useLocation } from 'react-router-dom';

export const WeeklyLeaderboard = () => {
  const history = useHistory();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const weekNumberQueryParam = queryParams.get('weekNumber');

  const changeFilterHandler = (event) => {
    history.push(`${location.pathname}?weekNumber=${event.target.value}`);
  };

  // useEffect with api call for each change in weekNumberQueryParam
  return (
    <React.Fragment>
      <div>Weekly Leaderboard</div>
      <div>{weekNumberQueryParam}</div>
      <select onChange={changeFilterHandler}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </React.Fragment>
  );
};
