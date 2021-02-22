import React, { useEffect, useState } from 'react';
import EditDomainNameSystem from 'src/components/DomainNameSystem/Edit/EditDomainNameSystem';
import EditDNSRecord from 'src/components/DNSRecord/Edit/EditDNSRecord';
import { useHistory } from 'react-router-dom';
import QueryString from 'qs';

export default function EditDNSWrapper() {
  const history = useHistory();
  const parsedQueryString = QueryString.parse(history.location.search, { ignoreQueryPrefix: true });
  const [isDnsRecord, setIsDnsRecord] = useState(false);

  useEffect(() => {
    if (parsedQueryString.domain && parsedQueryString.record_id) {
      setIsDnsRecord(true);
    } else {
      setIsDnsRecord(false);
    }
  }, [history.location]);

  return (
    <>
      {
        isDnsRecord
          ? <EditDNSRecord domain={parsedQueryString.domain} record_id={parsedQueryString.record_id} />
          : <EditDomainNameSystem />
      }
    </>
  );
}