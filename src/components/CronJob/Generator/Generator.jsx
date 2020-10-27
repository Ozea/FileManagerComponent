import React, { useEffect, useRef, useState } from 'react';

import RunCommandSelect from './RunCommandSelect/RunCommandSelect';
import SelectsWrapper from './OtherSelects/SelectsWrapper';
import { Link, useHistory } from 'react-router-dom';
import QS from 'qs';

import './Generator.scss';

const Generator = props => {
  const formElement = useRef(null);
  const { i18n } = window.GLOBAL.App;
  const history = useHistory();
  const [state, setState] = useState({
    activeTab: '1'
  });

  useEffect(() => {
    let parsedQuery = QS.parse(history.location.search, { ignoreQueryPrefix: true });
    let activeTab = parsedQuery.activeTab || '1';

    setState({ ...state, activeTab });
  }, [history.location.search]);

  const activeClassName = tab => {
    return state.activeTab === tab ? 'active' : '';
  }

  const emulateFormSubmit = () => {
    let generatedCronJob = {};

    for (let i = 0; i <= 4; i++) {
      let iterableFormElement = formElement.current[i];

      generatedCronJob[iterableFormElement.name] = iterableFormElement.value;
    }

    props.generatedCronJob(generatedCronJob);
  }

  return (
    <div className="cron-job-generator">
      <div className="header">
        <Link to='/add/cron?activeTab=1' className={activeClassName('1')}>{i18n.Minutes ?? 'Minutes'}</Link>
        <Link to='/add/cron?activeTab=2' className={activeClassName('2')}>{i18n.Minutes ?? 'Hourly'}</Link>
        <Link to='/add/cron?activeTab=3' className={activeClassName('3')}>{i18n.Minutes ?? 'Daily'}</Link>
        <Link to='/add/cron?activeTab=4' className={activeClassName('4')}>{i18n.Minutes ?? 'Weekly'}</Link>
        <Link to='/add/cron?activeTab=5' className={activeClassName('5')}>{i18n.Minutes ?? 'Monthly'}</Link>
      </div>

      <div className="body">

        <form ref={formElement}>
          <RunCommandSelect activeTab={state.activeTab} />

          <SelectsWrapper activeTab={state.activeTab} />

          <div className="form-actions">
            <button type="button" onClick={emulateFormSubmit}>{i18n.Generate ?? 'Generate'}</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Generator;