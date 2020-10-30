import React, { useEffect, useState } from 'react';

import TextInputWithExtraButton from '../../ControlPanel/AddItemLayout/Form/TextInputWithExtraButton/TextInputWithExtraButton';
import { addActiveElement, removeFocusedElement } from "../../../actions/MainNavigation/mainNavigationActions";
import { getAdditionalPackageInfo, addPackage } from '../../../ControlPanelService/Package';
import NameServers from '../../ControlPanel/AddItemLayout/Form/NameServers/NameServers';
import SelectInput from '../../ControlPanel/AddItemLayout/Form/SelectInput/SelectInput';
import TextInput from '../../ControlPanel/AddItemLayout/Form/TextInput/TextInput';
import AddItemLayout from '../../ControlPanel/AddItemLayout/AddItemLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toolbar from '../../MainNav/Toolbar/Toolbar';
import { useHistory } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import { useDispatch } from 'react-redux';

import './AddPackage.scss';

const AddPackage = props => {
  const token = localStorage.getItem("token");
  const { i18n } = window.GLOBAL.App;
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    loading: false,
    okMessage: '',
    errorMessage: '',
    webTemplates: [],
    webSystem: '',
    backendTemplates: [],
    backendSystem: '',
    dnsTemplates: [],
    dnsSystem: '',
    sshTemplates: [],
    usersNS: [],
    webDomains: '',
    webAliases: '',
    dnsDomains: '',
    dnsRecords: '',
    mailDomains: '',
    mailAccounts: '',
    databases: '',
    cronJobs: '',
    backups: '',
    quota: '',
    bandwidth: '',
  });

  useEffect(() => {
    dispatch(addActiveElement('/list/package/'));
    dispatch(removeFocusedElement());

    setState({ ...state, loading: true });

    setTimeout(() => fetchData(), 1000);
  }, []);

  const fetchData = () => {
    getAdditionalPackageInfo()
      .then(result => {
        setState({
          ...state,
          webTemplates: result.data.webTemplates,
          webSystem: result.data.webSystem,
          backendTemplates: result.data.backendTemplates,
          backendSystem: result.data.backendSystem,
          dnsTemplates: result.data.dnsTemplates,
          dnsSystem: result.data.dnsSystem,
          sshTemplates: result.data.sshTemplates,
          usersNS: result.data.nameServers,
          webDomains: '1',
          webAliases: '1',
          dnsDomains: '1',
          dnsRecords: '1',
          mailDomains: '1',
          mailAccounts: '1',
          databases: '1',
          cronJobs: '1',
          backups: '1',
          quota: '1000',
          bandwidth: '1000',
          loading: false
        });
      })
      .catch(err => console.err(err));
  }

  const submitFormHandler = event => {
    event.preventDefault();
    let newPackage = {};

    for (var [name, value] of (new FormData(event.target)).entries()) {
      newPackage[name] = value;
    }

    if (Object.keys(newPackage).length !== 0 && newPackage.constructor === Object) {
      setState({ ...state, loading: true });

      addPackage(newPackage)
        .then(result => {
          if (result.status === 200) {
            const { error_msg, ok_msg } = result.data;

            if (error_msg) {
              setState({ ...state, errorMessage: error_msg, okMessage: '', loading: false });
            } else if (ok_msg) {
              setState({ ...state, errorMessage: '', okMessage: ok_msg, loading: false });
            } else {
              setState({ ...state, loading: false })
            }
          }
        })
        .catch(err => console.error(err));
    }
  }

  const toggleUnlimited = inputName => {
    let inputNameToUpdate = state[inputName];
    let defaultValue;

    if (inputName === 'quota' || inputName === 'bandwidth') {
      defaultValue = '1000';
    } else {
      defaultValue = '1';
    }

    if (inputNameToUpdate !== 'unlimited') {
      setState({ ...state, [inputName]: 'unlimited' });
    } else {
      setState({ ...state, [inputName]: defaultValue });
    }
  }

  return (
    <div className="edit-template add-package">
      <Toolbar mobile={false}>
        <div></div>
        <div className="search-toolbar-name">{i18n['Adding Package'] ?? 'Adding Package'}</div>
        <div className="error">
          <span className="error-message">
            {state.errorMessage ? <FontAwesomeIcon icon="long-arrow-alt-right" /> : ''}
            {state.errorMessage}</span>
        </div>
        <div className="success">
          <span className="ok-message">
            {state.okMessage ? <FontAwesomeIcon icon="long-arrow-alt-right" /> : ''}
            <span dangerouslySetInnerHTML={{ __html: state.okMessage }}></span>
          </span>
        </div>
      </Toolbar>
      <AddItemLayout>
        {state.loading ? <Spinner /> : (
          <form onSubmit={event => submitFormHandler(event)}>
            <input type="hidden" name="ok" value="add" />
            <input type="hidden" name="token" value={token} />

            <TextInput name="v_package" id="packageName" title={i18n['Package Name'] ?? 'Package Name'} />

            <SelectInput
              options={state.webTemplates}
              name="v_web_template"
              id="webTemplates"
              title={i18n['Web Template'] ?? 'Web Template'}
              optionalTitle={state.webSystem} />

            <SelectInput
              options={state.backendTemplates}
              name="v_backend_template"
              id="backendTemplates"
              title={i18n['Backend Template'] ?? 'Backend Template'}
              optionalTitle={state.backendSystem} />

            <SelectInput
              options={state.dnsTemplates}
              name="v_dns_template"
              id="dnsTemplates"
              title={i18n['DNS Template'] ?? 'DNS Template'}
              optionalTitle={state.dnsSystem} />

            <SelectInput
              options={state.sshTemplates}
              name="v_shell"
              id="shells"
              title={i18n['SSH Access'] ?? 'SSH Access'} />

            <TextInputWithExtraButton title={i18n['Web Domains'] ?? 'Web Domains'} id="webDomains" name="v_web_domains" value={state.webDomains}>
              <button type="button" onClick={() => toggleUnlimited('webDomains')}>
                <FontAwesomeIcon icon="infinity" />
              </button>
            </TextInputWithExtraButton>

            <TextInputWithExtraButton title={i18n['Web Aliases'] ?? 'Web Aliases'} optionalTitle={i18n['per domain'] ?? 'per domain'} id="webAliases" name="v_web_aliases" value={state.webAliases}>
              <button type="button" onClick={() => toggleUnlimited('webAliases')}>
                <FontAwesomeIcon icon="infinity" />
              </button>
            </TextInputWithExtraButton>

            <TextInputWithExtraButton title={i18n['DNS Domains'] ?? 'DNS Domains'} id="dnsDomains" name="v_dns_domains" value={state.dnsDomains}>
              <button type="button" onClick={() => toggleUnlimited('dnsDomains')}>
                <FontAwesomeIcon icon="infinity" />
              </button>
            </TextInputWithExtraButton>

            <TextInputWithExtraButton title={i18n['DNS Records'] ?? 'DNS Records'} optionalTitle={i18n['per domain'] ?? 'per domain'} id="dnsRecords" name="v_dns_records" value={state.dnsRecords}>
              <button type="button" onClick={() => toggleUnlimited('dnsRecords')}>
                <FontAwesomeIcon icon="infinity" />
              </button>
            </TextInputWithExtraButton>

            <TextInputWithExtraButton title={i18n['Mail Domains'] ?? 'Mail Domains'} id="mailDomains" name="v_mail_domains" value={state.dnsRecords}>
              <button type="button" onClick={() => toggleUnlimited('mailDomains')}>
                <FontAwesomeIcon icon="infinity" />
              </button>
            </TextInputWithExtraButton>

            <TextInputWithExtraButton title={i18n['Mail Accounts'] ?? 'Mail Accounts'} optionalTitle={i18n['per domain'] ?? 'per domain'} id="mailAccounts" name="v_mail_accounts" value={state.mailAccounts}>
              <button type="button" onClick={() => toggleUnlimited('mailAccounts')}>
                <FontAwesomeIcon icon="infinity" />
              </button>
            </TextInputWithExtraButton>

            <TextInputWithExtraButton title={i18n['Databases'] ?? 'Databases'} id="databases" name="v_databases" value={state.databases}>
              <button type="button" onClick={() => toggleUnlimited('databases')}>
                <FontAwesomeIcon icon="infinity" />
              </button>
            </TextInputWithExtraButton>

            <TextInputWithExtraButton title={i18n['Cron Jobs'] ?? 'Cron Jobs'} id="cronJobs" name="v_cron_jobs" value={state.cronJobs}>
              <button type="button" onClick={() => toggleUnlimited('cronJobs')}>
                <FontAwesomeIcon icon="infinity" />
              </button>
            </TextInputWithExtraButton>

            <TextInput name="v_backups" id="backups" defaultValue={state.backups} title={i18n['Backups'] ?? 'Backups'} />

            <TextInputWithExtraButton title={i18n['Quota'] ?? 'Quota'} optionalTitle={i18n['in megabytes'] ?? 'in megabytes'} id="quota" name="v_disk_quota" value={state.quota}>
              <button type="button" onClick={() => toggleUnlimited('quota')}>
                <FontAwesomeIcon icon="infinity" />
              </button>
            </TextInputWithExtraButton>

            <TextInputWithExtraButton title={i18n['Bandwidth'] ?? 'Bandwidth'} optionalTitle={i18n['in megabytes'] ?? 'in megabytes'} id="bandwidth" name="v_bandwidth" value={state.bandwidth}>
              <button type="button" onClick={() => toggleUnlimited('bandwidth')}>
                <FontAwesomeIcon icon="infinity" />
              </button>
            </TextInputWithExtraButton>

            <NameServers usersNS={state.usersNS} />

            <div className="buttons-wrapper">
              <button type="submit" className="add">{i18n.Add ?? 'Add'}</button>
              <button type="button" className="back" onClick={() => history.push('/list/package/')}>{i18n.Back ?? 'Back'}</button>
            </div>
          </form>
        )}
      </AddItemLayout>
    </div>
  );
}

export default AddPackage;