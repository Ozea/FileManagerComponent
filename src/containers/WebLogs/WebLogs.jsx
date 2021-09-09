import React, { useEffect, useState } from 'react';

import { addActiveElement } from 'src/actions/MainNavigation/mainNavigationActions';
import TopPanel from 'src/components/TopPanel/TopPanel';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QueryString from 'qs';

import './WebLogs.scss';
import { getWebLogs } from 'src/ControlPanelService/WebLogs';
import Spinner from 'src/components/Spinner/Spinner';
import { Helmet } from 'react-helmet';

export default function WebLogs() {
  const { i18n } = window.GLOBAL.App;
  const history = useHistory();
  const dispatch = useDispatch();
  const mainNavigation = useSelector(state => state.mainNavigation);
  const [domain, setDomain] = useState();
  const [state, setState] = useState({
    data: "",
    loading: false
  });

  useEffect(() => {
    let parsedQueryString = QueryString.parse(history.location.search, { ignoreQueryPrefix: true });

    if (!parsedQueryString && !parsedQueryString.domain && !parsedQueryString.type) {
      return history.goBack();
    }

    setDomain(domain);
    let uri = `/list/web-log/?domain=${domain}&type=${parsedQueryString.type}`;
    history.push(uri);

    fetchData(uri);

    dispatch(addActiveElement(`/list/web-log/${parsedQueryString.type}`));
  }, [mainNavigation.activeElement]);

  const fetchData = uri => {
    setState({
      ...state,
      loading: true
    });

    getWebLogs(uri)
      .then(result => {
        if (result.data) {
          setState({ ...state, data: result.data.data, loading: false });
        }
      })
      .catch(error => {
        console.error(error);
        setState({ ...state, loading: false });
      });
  }

  return (
    <div className="web-logs">
      <Helmet>
        <title>{`Vesta - ${i18n.WEB}`}</title>
      </Helmet>
      <TopPanel domain={domain} />
      <div className="content">
        {
          state.loading
            ? <Spinner />
            : (
              <pre>
                {state.data}
              </pre>
            )
        }
      </div>
    </div>
  );
}