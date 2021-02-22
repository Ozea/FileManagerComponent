import React, { useEffect, useState } from 'react';
import EditMailAccount from 'src/components/MailAccount/Edit/EditMailAccount';
import EditMail from 'src/components/Mail/Edit/EditMail';
import { useHistory } from 'react-router-dom';
import QueryString from 'qs';

export default function EditMailWrapper() {
  const history = useHistory();
  const parsedQueryString = QueryString.parse(history.location.search, { ignoreQueryPrefix: true });
  const [isMailAccount, setIsMailAccount] = useState(false);

  useEffect(() => {
    if (parsedQueryString.domain && parsedQueryString.account) {
      setIsMailAccount(true);
    } else {
      setIsMailAccount(false);
    }
  }, [history.location]);

  return (
    <>
      {
        isMailAccount
          ? <EditMailAccount domain={parsedQueryString.domain} account={parsedQueryString.account} />
          : <EditMail />
      }
    </>
  );
}