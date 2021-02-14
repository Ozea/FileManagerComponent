import React, { useEffect, useState } from 'react';
import AddMailAccount from 'src/components/MailAccount/Add/AddMailAccount';
import AddMail from 'src/components/Mail/Add/AddMail';
import { useHistory } from 'react-router-dom';
import QueryString from 'qs';

export default function AddMailWrapper() {
  const history = useHistory();
  const [domain, setDomain] = useState(false);

  useEffect(() => {
    const parsedQueryString = QueryString.parse(history.location.search, { ignoreQueryPrefix: true });

    if (parsedQueryString.domain) {
      setDomain(parsedQueryString.domain);
    } else {
      setDomain('');
    }
  }, [history.location]);

  return (
    <>
      {
        domain
          ? <AddMailAccount domain={domain} />
          : <AddMail />
      }
    </>
  );
}