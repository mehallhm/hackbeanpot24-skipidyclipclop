export interface gCalResponse {
  kind: "calendar#freeBusy";
  timeMin: string;
  timeMax: string;
  groups: {
    errors: {
      domain: string;
      reason: string;
    }[];
    calendars: string[];
  };
  calendars: {
    [key: string]: {
      errors: [
        {
          domain: string;
          reason: string;
        },
      ];
      busy: {
        start: string;
        end: string;
      }[];
    };
  };
}

export interface ScheduleEvent {
  createdAt: Date;
  emails: string[];
  invalidEmails: string[];
  pending: boolean;
  eventLength: number;
  startDateRange: Date;
  endDateRange: Date;
  title: string;
  timeRange: "Morning" | "Noon" | "Afternoon" | "Evening" | "Night";
}
