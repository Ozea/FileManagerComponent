import React, { useState, useEffect } from 'react';
import { getAppNotifications, deleteNotification } from 'src/ControlPanelService/Notifications';
import { addNotifications } from 'src/actions/Notification/notificationActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Notifications.scss';
import { useDispatch, useSelector } from 'react-redux';

const Notifications = () => {
  const { i18n } = useSelector(state => state.session);
  const { notifications } = useSelector(state => state.notifications);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!notifications.length) {
      fetchData();
    }
  }, [notifications]);

  const fetchData = () => {
    setLoading(true);
    getAppNotifications()
      .then(res => {
        if (res.data) {
          const result = [];

          for (let notification in res.data) {
            result.push(res.data[notification]);
          }

          dispatch(addNotifications(result));
          setLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      })
  }

  const removeNotification = id => {
    deleteNotification(id)
      .then(() => {
        fetchData();
      })
      .catch(err => console.error(err));
  }

  const renderOptions = () => {
    if (notifications.length) {
      return notifications.map(item => {
        return (
          <React.Fragment>
            <div className="dropdown-item">
              <span className="title"><b>{item.TOPIC}</b></span>
              <span className="delete-notification" onClick={() => removeNotification(item.ID)}></span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: item.NOTICE }}></div>
            <div className="dropdown-divider"></div>
          </React.Fragment>
        );
      });
    } else {
      return (
        <div className="dropdown-item" style={{ cursor: 'default', marginBottom: '10' }}>
          <span className="title">{i18n['no notifications']}</span>
        </div>
      );
    }
  }

  return (
    <div className="btn-group">
      <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div className="bell">
          <FontAwesomeIcon icon="bell" />
        </div>
      </button>
      <div className="dropdown-menu">
        {loading ? 'Loading' : renderOptions()}
      </div>
    </div>
  );
};

export default Notifications;