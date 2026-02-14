import type { Settings } from "lib/redux/settingsSlice";
import type {
  JsonResumeAward,
  JsonResumeBasics,
  JsonResumeCertificate,
  JsonResumeCoverLetter,
  JsonResumeEducation,
  JsonResumeInterest,
  JsonResumeLanguage,
  JsonResumeLocation,
  JsonResumeMeta,
  JsonResumeProfile,
  JsonResumeProject,
  JsonResumePublication,
  JsonResumeReference,
  JsonResumeSkill,
  JsonResumeVolunteer,
  JsonResumeWork,
  Resume
} from "lib/redux/types";

export const initialLocation: JsonResumeLocation = {
  address: "",
  postalCode: "",
  city: "",
  countryCode: "",
  region: ""
};

export const initialProfile: JsonResumeProfile = {
  network: "",
  username: "",
  url: ""
};

export const initialBasics: JsonResumeBasics = {
  name: "",
  label: "",
  image: "",
  email: "",
  phone: "",
  url: "",
  summary: "",
  location: initialLocation,
  profiles: []
};

export const initialWork: JsonResumeWork = {
  name: "",
  location: "",
  description: "",
  position: "",
  url: "",
  startDate: "",
  endDate: "",
  summary: "",
  highlights: []
};

export const initialVolunteer: JsonResumeVolunteer = {
  organization: "",
  position: "",
  url: "",
  startDate: "",
  endDate: "",
  summary: "",
  highlights: []
};

export const initialEducation: JsonResumeEducation = {
  institution: "",
  url: "",
  area: "",
  studyType: "",
  startDate: "",
  endDate: "",
  score: "",
  courses: []
};

export const initialAward: JsonResumeAward = {
  title: "",
  date: "",
  awarder: "",
  summary: ""
};

export const initialCertificate: JsonResumeCertificate = {
  name: "",
  date: "",
  issuer: "",
  url: ""
};

export const initialPublication: JsonResumePublication = {
  name: "",
  publisher: "",
  releaseDate: "",
  url: "",
  summary: ""
};

export const initialSkill: JsonResumeSkill = {
  name: "",
  level: "",
  keywords: []
};

export const initialLanguage: JsonResumeLanguage = {
  language: "",
  fluency: ""
};

export const initialInterest: JsonResumeInterest = {
  name: "",
  keywords: []
};

export const initialReference: JsonResumeReference = {
  name: "",
  reference: ""
};

export const initialProject: JsonResumeProject = {
  name: "",
  description: "",
  highlights: [],
  keywords: [],
  startDate: "",
  endDate: "",
  url: "",
  roles: [],
  entity: "",
  type: ""
};

export const initialMeta: JsonResumeMeta = {
  canonical: "",
  version: "v1.0.0",
  lastModified: ""
};

export const initialCoverLetter: JsonResumeCoverLetter = {
  companyName: "Acme Inc",
  companyAddress: ["123 Main St", "Suite 400", "San Francisco, CA 94105"],
  body: [
    "I am excited to apply for this role and contribute to your team.",
    [
      "Led TypeScript migrations across multiple frontend applications",
      "Improved reliability of document generation workflows",
      "Partnered with design and product to ship high-impact features quickly"
    ],
    "Thank you for your time and consideration."
  ],
  signoff: "Sincerely,",
  signatureName: "Jane Candidate",
  signatureImage: "https://via.placeholder.com/360x120.png?text=Signature"
};

export const initialResumeState: Resume = {
  basics: initialBasics,
  work: [],
  volunteer: [],
  education: [],
  awards: [],
  certificates: [],
  publications: [],
  skills: [],
  languages: [],
  interests: [],
  references: [],
  projects: [],
  meta: initialMeta,
  "x-coverLetter": initialCoverLetter
};

export const initialAppState = {
  resume: initialResumeState,
  settings: {
    themeColor: "#38bdf8",
    fontFamily: "Roboto",
    fontSize: "11",
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
  } satisfies Settings
};
