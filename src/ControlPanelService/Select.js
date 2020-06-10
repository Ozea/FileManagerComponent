export const values = select => {
  return {
    usersList: [
      { value: 'rebuild', name: select.rebuild },
      { value: 'rebuild web', name: select['rebuild web'] },
      { value: 'rebuild dns', name: select['rebuild dns'] },
      { value: 'rebuild mail', name: select['rebuild mail'] },
      { value: 'rebuild db', name: select['rebuild db'] },
      { value: 'rebuild cron', name: select['rebuild cron'] },
      { value: 'update counters', name: select['update counters'] },
      { value: 'suspend', name: select.suspend },
      { value: 'unsuspend', name: select.unsuspend },
      { value: 'delete', name: select.delete }
    ],
    webList: [
      { value: 'suspend', name: select.suspend },
      { value: 'unsuspend', name: select.unsuspend },
      { value: 'delete', name: select.delete }
    ],
    dnsList: [
      { value: 'suspend', name: select.suspend },
      { value: 'unsuspend', name: select.unsuspend },
      { value: 'delete', name: select.delete }
    ],
    mailList: [
      { value: 'suspend', name: select.suspend },
      { value: 'unsuspend', name: select.unsuspend },
      { value: 'delete', name: select.delete }
    ],
    dbList: [
      { value: 'suspend', name: select.suspend },
      { value: 'unsuspend', name: select.unsuspend },
      { value: 'delete', name: select.delete }
    ],
    cronList: [
      { value: 'turn on notifications', name: select['turn on notifications'] },
      { value: 'turn off notifications', name: select['turn off notifications'] },
      { value: 'suspend', name: select.suspend },
      { value: 'unsuspend', name: select.unsuspend },
      { value: 'delete', name: select.delete }
    ],
    backupList: [select.delete],
    packagesList: [select.delete],
    internetProtocolsList: [select.reread_ip, select.delete],
    updatesList: [select.update],
    firewallList: [select.delete],
    serverList: [select.stop, select.start, select.restart]
  }
};