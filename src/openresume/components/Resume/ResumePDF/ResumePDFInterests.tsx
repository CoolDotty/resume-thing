import { View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFText
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { JsonResumeInterest } from "lib/redux/types";

export const ResumePDFInterests = ({
  heading,
  interests,
  themeColor,
  showBulletPoints
}: {
  heading: string;
  interests: JsonResumeInterest[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {interests.map((interest, idx) => (
        <View key={idx} style={idx !== 0 ? { marginTop: spacing["1.5"] } : {}}>
          <ResumePDFText bold={true}>{interest.name}</ResumePDFText>
          {interest.keywords.length > 0 && (
            <View style={{ ...styles.flexCol, marginTop: spacing["0.5"] }}>
              <ResumePDFBulletList
                items={interest.keywords}
                showBulletPoints={showBulletPoints}
              />
            </View>
          )}
        </View>
      ))}
    </ResumePDFSection>
  );
};
