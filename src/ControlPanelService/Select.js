export const values = select => {
  return {
    usersList: [
      { value: 'rebuild', name: select.rebuild },
      { value: 'rebuild web', name: select.rebuild_web },
      { value: 'rebuild dns', name: select.rebuild_dns },
      { value: 'rebuild mail', name: select.rebuild_mail },
      { value: 'rebuild db', name: select.rebuild_db },
      { value: 'rebuild cron', name: select.rebuild_cron },
      { value: 'update counters', name: select.update_counters },
      { value: 'suspend', name: select.suspend },
      { value: 'unsuspend', name: select.unsuspend },
      { value: 'delete', name: select.delete }
    ],
    webList: [
      { value: 'suspend', name: select.suspend },
      { value: 'unsuspend', name: select.unsuspend },
      { value: 'delete', name: select.delete }
    ],
    dnsList: [select.suspend, select.unsuspend, select.delete],
    mailList: [select.suspend, select.unsuspend, select.delete],
    dbList: [select.suspend, select.unsuspend, select.delete],
    cronList: [select.turn_on_notifications, select.suspend, select.unsuspend, select.delete],
    backupList: [select.delete],
    packagesList: [select.delete],
    internetProtocolsList: [select.reread_ip, select.delete],
    updatesList: [select.update],
    firewallList: [select.delete],
    serverList: [select.stop, select.start, select.restart]
  }
};