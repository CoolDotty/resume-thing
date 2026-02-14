export interface Settings {
  themeColor: string;
  fontFamily: string;
  fontSize: string;
  documentSize: string;
  formToShow: {
    work: boolean;
    volunteer: boolean;
    education: boolean;
    projects: boolean;
    awards: boolean;
    certificates: boolean;
    publications: boolean;
    skills: boolean;
    languages: boolean;
    interests: boolean;
    references: boolean;
  };
  formToHeading: {
    work: string;
    volunteer: string;
    education: string;
    projects: string;
    awards: string;
    certificates: string;
    publications: string;
    skills: string;
    languages: string;
    interests: string;
    references: string;
  };
  formsOrder: ShowForm[];
  showBulletPoints: {
    work: boolean;
    volunteer: boolean;
    education: boolean;
    projects: boolean;
    skills: boolean;
    interests: boolean;
  };
}

export type ShowForm = keyof Settings["formToShow"];

export const DEFAULT_THEME_COLOR = "#38bdf8";
export const DEFAULT_FONT_FAMILY = "Roboto";
export const DEFAULT_FONT_SIZE = "11";
export const DEFAULT_FONT_COLOR = "#171717";

export const initialSettings: Settings = {
  themeColor: DEFAULT_THEME_COLOR,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: DEFAULT_FONT_SIZE,
  documentSize: "Letter",
  formToShow: {
    work: true,
    volunteer: true,
    education: true,
    projects: true,
    awards: true,
    certificates: true,
    publications: true,
    skills: true,
    languages: true,
    interests: true,
    references: true
  },
  formToHeading: {
    work: "WORK EXPERIENCE",
    volunteer: "VOLUNTEER",
    education: "EDUCATION",
    projects: "PROJECTS",
    awards: "AWARDS",
    certificates: "CERTIFICATES",
    publications: "PUBLICATIONS",
    skills: "SKILLS",
    languages: "LANGUAGES",
    interests: "INTERESTS",
    references: "REFERENCES"
  },
  formsOrder: [
    "work",
    "volunteer",
    "education",
    "projects",
    "awards",
    "certificates",
    "publications",
    "skills",
    "languages",
    "interests",
    "references"
  ],
  showBulletPoints: {
    work: true,
    volunteer: true,
    education: true,
    projects: true,
    skills: true,
    interests: true
  }
};
