import React, { useEffect, useState } from 'react';
import BackupRestoreSettings from '../../components/Backup/RestoreSettings/BackupRestoreSettings';
import { useHistory } from 'react-router-dom';
import Backups from '../Backups/Backups';
import QueryString from 'qs';

export default function BackupWrapper(props) {
  const history = useHistory();
  const parsedQueryString = QueryString.parse(history.location.search, { ignoreQueryPrefix: true });
  const [isBackupSettings, setIsBackupSettings] = useState(false);

  useEffect(() => {
    if (parsedQueryString.backup) {
      setIsBackupSettings(true);
    } else {
      setIsBackupSettings(false);
    }
  }, [history.location]);

  return (
    <>
      {
        isBackupSettings
          ? <BackupRestoreSettings backup={parsedQueryString.backup} />
          : <Backups {...props} changeSearchTerm={props.handleSearchTerm} />
      }
    </>
  );
}