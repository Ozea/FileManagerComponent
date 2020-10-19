import React, { useState } from 'react';
import AdditionalFtp from '../AdditionalFtp/AddtionalFtp';

const AdditionalFtpWrapper = props => {
  const { i18n } = window.GLOBAL.App;
  const [state, setState] = useState({
    additionalFtp: [1]
  });

  const renderAdditionalFtps = () => {
    if (state.additionalFtp.length) {
      return state.additionalFtp.map((ftp, index) => {
        return <AdditionalFtp
          key={index}
          prefixI18N={props.prefixI18N}
          index={index + 1}
          order={ftp}
          domain={props.domain}
          onDeleteAdditionalFtp={order => onDeleteFtp(order)} />;
      });
    } else {
      props.unCheckAdditionalFtpBox();
    }
  }

  const onDeleteFtp = index => {
    let additionalFtpsDuplicate = [...state.additionalFtp];

    additionalFtpsDuplicate.splice(index - 1, 1);

    setState({ ...state, additionalFtp: additionalFtpsDuplicate });
  }

  const addAdditionalFtp = () => {
    let additionalFtpArrayLength = state.additionalFtp.length;
    let additionalFtpsDuplicate = [...state.additionalFtp];

    additionalFtpsDuplicate.push(additionalFtpArrayLength + 1);

    setState({ ...state, additionalFtp: additionalFtpsDuplicate });
  }

  return (
    <div>
      {renderAdditionalFtps()}

      <button type="button" onClick={() => addAdditionalFtp()}>
        {i18n['Add one more FTP Account']}
      </button>
    </div>
  );
}

export default AdditionalFtpWrapper;