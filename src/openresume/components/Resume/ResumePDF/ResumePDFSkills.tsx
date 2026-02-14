import { View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFText
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { joinNonEmpty } from "lib/redux/resumeFormatting";
import type { JsonResumeSkill } from "lib/redux/types";

export const ResumePDFSkills = ({
  heading,
  skills,
  themeColor,
  showBulletPoints
}: {
  heading: string;
  skills: JsonResumeSkill[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {skills.map((skill, idx) => {
        const label = joinNonEmpty([skill.name, skill.level], " - ");

        return (
          <View key={idx} style={idx !== 0 ? { marginTop: spacing["1.5"] } : {}}>
            <ResumePDFText bold={true}>{label || skill.name}</ResumePDFText>
            {skill.keywords.length > 0 && (
              <View style={{ ...styles.flexCol, marginTop: spacing["0.5"] }}>
                <ResumePDFBulletList
                  items={skill.keywords}
                  showBulletPoints={showBulletPoints}
                />
              </View>
            )}
          </View>
        );
      })}
    </ResumePDFSection>
  );
};
