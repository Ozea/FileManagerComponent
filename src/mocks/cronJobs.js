export const cronJobs = {
  1: {
    "MIN": "15",
    "HOUR": "02",
    "DAY": "*",
    "MONTH": "*",
    "WDAY": "*",
    "CMD": "sudo /usr/local/vesta/bin/v-update-sys-queue disk",
    "JOB": "1",
    "SUSPENDED": "no",
    "TIME": "09:46:16",
    "DATE": "2015-07-04"
  },
  2: {
    "MIN": "10",
    "HOUR": "00",
    "DAY": "*",
    "MONTH": "*",
    "WDAY": "*",
    "CMD": "sudo /usr/local/vesta/bin/v-update-sys-queue traffic",
    "JOB": "2",
    "SUSPENDED": "no",
    "TIME": "09:46:16",
    "DATE": "2015-07-04"
  },
  3: {
    "MIN": "30",
    "HOUR": "03",
    "DAY": "*",
    "MONTH": "*",
    "WDAY": "*",
    "CMD": "sudo /usr/local/vesta/bin/v-update-sys-queue webstats",
    "JOB": "3",
    "SUSPENDED": "no",
    "TIME": "09:46:17",
    "DATE": "2015-07-04"
  },
  4: {
    "MIN": "*/5",
    "HOUR": "*",
    "DAY": "*",
    "MONTH": "*",
    "WDAY": "*",
    "CMD": "sudo /usr/local/vesta/bin/v-update-sys-queue backup",
    "JOB": "4",
    "SUSPENDED": "no",
    "TIME": "09:46:17",
    "DATE": "2015-07-04"
  },
  5: {
    "MIN": "10",
    "HOUR": "05",
    "DAY": "*",
    "MONTH": "*",
    "WDAY": "*",
    "CMD": "sudo /usr/local/vesta/bin/v-backup-users",
    "JOB": "5",
    "SUSPENDED": "no",
    "TIME": "09:46:17",
    "DATE": "2015-07-04"
  },
  6: {
    "MIN": "20",
    "HOUR": "00",
    "DAY": "*",
    "MONTH": "*",
    "WDAY": "*",
    "CMD": "sudo /usr/local/vesta/bin/v-update-user-stats",
    "JOB": "6",
    "SUSPENDED": "no",
    "TIME": "09:46:17",
    "DATE": "2015-07-04"
  },
  7: {
    "MIN": "*/5",
    "HOUR": "*",
    "DAY": "*",
    "MONTH": "*",
    "WDAY": "*",
    "CMD": "sudo /usr/local/vesta/bin/v-update-sys-rrd",
    "JOB": "7",
    "SUSPENDED": "no",
    "TIME": "09:46:17",
    "DATE": "2015-07-04"
  }
};