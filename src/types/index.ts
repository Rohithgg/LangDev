export interface Language {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  installCommand: {
    windows: string;
    mac: string;
    linux: string;
  };
  verifyCommand: string;
  additionalSteps?: string[];
  officialDocs: string;
  prerequisites?: string[];
}

export type OSType = 'windows' | 'mac' | 'linux';