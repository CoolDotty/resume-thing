import type { Settings } from "lib/redux/settingsSlice";
import type {
  FeaturedSkill,
  Resume,
  ResumeEducation,
  ResumeProfile,
  ResumeProject,
  ResumeSkills,
  ResumeWorkExperience
} from "lib/redux/types";

export const initialProfile: ResumeProfile = {
  name: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  url: ""
};

export const initialWorkExperience: ResumeWorkExperience = {
  company: "",
  jobTitle: "",
  date: "",
  descriptions: []
};

export const initialEducation: ResumeEducation = {
  school: "",
  degree: "",
  gpa: "",
  date: "",
  descriptions: []
};

export const initialProject: ResumeProject = {
  project: "",
  date: "",
  descriptions: []
};

export const initialFeaturedSkill: FeaturedSkill = { skill: "", rating: 4 };
export const initialFeaturedSkills: FeaturedSkill[] = Array(6)
  .fill(null)
  .map(() => ({ ...initialFeaturedSkill }));

export const initialSkills: ResumeSkills = {
  featuredSkills: initialFeaturedSkills,
  descriptions: []
};

export const initialCustom = {
  descriptions: []
};

export const initialResumeState: Resume = {
  profile: initialProfile,
  workExperiences: [initialWorkExperience],
  educations: [initialEducation],
  projects: [initialProject],
  skills: initialSkills,
  custom: initialCustom
};

export const initialAppState = {
  resume: initialResumeState,
  settings: {
    themeColor: "#38bdf8",
    fontFamily: "Roboto",
    fontSize: "11",
    documentSize: "Letter",
    formToShow: {
      workExperiences: true,
      educations: true,
      projects: true,
      skills: true,
      custom: false
    },
    formToHeading: {
      workExperiences: "WORK EXPERIENCE",
      educations: "EDUCATION",
      projects: "PROJECT",
      skills: "SKILLS",
      custom: "CUSTOM SECTION"
    },
    formsOrder: ["workExperiences", "educations", "projects", "skills", "custom"],
    showBulletPoints: {
      educations: true,
      projects: true,
      skills: true,
      custom: true
    }
  } satisfies Settings
};