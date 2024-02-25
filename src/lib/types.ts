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
