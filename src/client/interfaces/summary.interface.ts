export interface ISummary {
  id: number;
  device_id: string;
  device_type: string;
  timestamp: string;
  location: string;
}

export type ISummaryList = ISummary[];
