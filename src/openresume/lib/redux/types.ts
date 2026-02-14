export interface JsonResumeLocation {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

export interface JsonResumeProfile {
  network: string;
  username: string;
  url: string;
}

export interface JsonResumeBasics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: JsonResumeLocation;
  profiles: JsonResumeProfile[];
}

export interface JsonResumeWork {
  name: string;
  location: string;
  description: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface JsonResumeVolunteer {
  organization: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface JsonResumeEducation {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
}

export interface JsonResumeAward {
  title: string;
  date: string;
  awarder: string;
  summary: string;
}

export interface JsonResumeCertificate {
  name: string;
  date: string;
  issuer: string;
  url: string;
}

export interface JsonResumePublication {
  name: string;
  publisher: string;
  releaseDate: string;
  url: string;
  summary: string;
}

export interface JsonResumeSkill {
  name: string;
  level: string;
  keywords: string[];
}

export interface JsonResumeLanguage {
  language: string;
  fluency: string;
}

export interface JsonResumeInterest {
  name: string;
  keywords: string[];
}

export interface JsonResumeReference {
  name: string;
  reference: string;
}

export interface JsonResumeProject {
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
  startDate: string;
  endDate: string;
  url: string;
  roles: string[];
  entity: string;
  type: string;
}

export interface JsonResumeMeta {
  canonical: string;
  version: string;
  lastModified: string;
}

export interface Resume {
  basics: JsonResumeBasics;
  work: JsonResumeWork[];
  volunteer: JsonResumeVolunteer[];
  education: JsonResumeEducation[];
  awards: JsonResumeAward[];
  certificates: JsonResumeCertificate[];
  publications: JsonResumePublication[];
  skills: JsonResumeSkill[];
  languages: JsonResumeLanguage[];
  interests: JsonResumeInterest[];
  references: JsonResumeReference[];
  projects: JsonResumeProject[];
  meta: JsonResumeMeta;
}
