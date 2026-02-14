import { View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { formatDateRange } from "lib/redux/resumeFormatting";
import type { JsonResumeVolunteer } from "lib/redux/types";

export const ResumePDFVolunteer = ({
  heading,
  volunteer,
  themeColor,
  showBulletPoints,
  isPDF
}: {
  heading: string;
  volunteer: JsonResumeVolunteer[];
  themeColor: string;
  showBulletPoints: boolean;
  isPDF: boolean;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {volunteer.map((entry, idx) => {
        const date = formatDateRange(entry.startDate, entry.endDate);

        return (
          <View key={idx} style={idx !== 0 ? { marginTop: spacing["2"] } : {}}>
            <View style={styles.flexRowBetween}>
              {entry.url ? (
                <ResumePDFLink
                  src={entry.url.startsWith("http") ? entry.url : `https://${entry.url}`}
                  isPDF={isPDF}
                >
                  <ResumePDFText bold={true}>{entry.organization}</ResumePDFText>
                </ResumePDFLink>
              ) : (
                <ResumePDFText bold={true}>{entry.organization}</ResumePDFText>
              )}
              <ResumePDFText>{date}</ResumePDFText>
            </View>
            <View style={{ marginTop: spacing["1"] }}>
              <ResumePDFText>{entry.position}</ResumePDFText>
            </View>
            {entry.summary && (
              <View style={{ marginTop: spacing["1"] }}>
                <ResumePDFText>{entry.summary}</ResumePDFText>
              </View>
            )}
            {entry.highlights.length > 0 && (
              <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
                <ResumePDFBulletList
                  items={entry.highlights}
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
