import React, { useEffect, useState } from 'react';
import AddDomainNameSystem from 'src/components/DomainNameSystem/Add/AddDomainNameSystem';
import AddDNSRecord from 'src/components/DNSRecord/Add/AddDNSRecord';
import { useHistory } from 'react-router-dom';
import QueryString from 'qs';

export default function AddDNSWrapper() {
  const history = useHistory();
  const parsedQueryString = QueryString.parse(history.location.search, { ignoreQueryPrefix: true });
  const [isDnsRecord, setIsDnsRecord] = useState(false);

  useEffect(() => {
    if (parsedQueryString.domain) {
      setIsDnsRecord(true);
    } else {
      setIsDnsRecord(false);
    }
  }, [history.location]);

  return (
    <>
      {
        isDnsRecord
          ? <AddDNSRecord domain={parsedQueryString.domain} />
          : <AddDomainNameSystem />
      }
    </>
  );
}