import React, { useEffect, useState } from 'react';
import MailAccount from 'src/components/MailAccount/MailAccount';
import { useHistory } from 'react-router-dom';
import Mails from '../Mails/Mails';
import QueryString from 'qs';

export default function MailWrapper(props) {
  const [mailDomain, setMailDomain] = useState('');
  const history = useHistory();

  useEffect(() => {
    const parsedQueryString = QueryString.parse(history.location.search, { ignoreQueryPrefix: true });

    if (parsedQueryString.domain) {
      setMailDomain(parsedQueryString.domain);
    } else {
      setMailDomain('');
    }
  }, [history.location]);

  return (
    <>
      {
        mailDomain
          ? <MailAccount {...props} domain={mailDomain} changeSearchTerm={props.handleSearchTerm} />
          : <Mails {...props} changeSearchTerm={props.handleSearchTerm} />
      }
    </>
  );
}