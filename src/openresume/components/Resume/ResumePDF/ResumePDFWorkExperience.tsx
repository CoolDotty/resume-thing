import { View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { formatDateRange } from "lib/redux/resumeFormatting";
import type { JsonResumeWork } from "lib/redux/types";

export const ResumePDFWorkExperience = ({
  heading,
  work,
  themeColor,
  showBulletPoints,
  isPDF
}: {
  heading: string;
  work: JsonResumeWork[];
  themeColor: string;
  showBulletPoints: boolean;
  isPDF: boolean;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {work.map((entry, idx) => {
        const date = formatDateRange(entry.startDate, entry.endDate);
        const hasHighlights = entry.highlights.length > 0;

        return (
          <View key={idx} style={idx !== 0 ? { marginTop: spacing["2"] } : {}}>
            <View style={styles.flexRowBetween}>
              {entry.url ? (
                <ResumePDFLink
                  src={entry.url.startsWith("http") ? entry.url : `https://${entry.url}`}
                  isPDF={isPDF}
                >
                  <ResumePDFText bold={true}>{entry.name}</ResumePDFText>
                </ResumePDFLink>
              ) : (
                <ResumePDFText bold={true}>{entry.name}</ResumePDFText>
              )}
              <ResumePDFText>{date}</ResumePDFText>
            </View>
            <View style={{ ...styles.flexRowBetween, marginTop: spacing["1"] }}>
              <ResumePDFText>{entry.position}</ResumePDFText>
              <ResumePDFText>{entry.location}</ResumePDFText>
            </View>
            {entry.summary && (
              <View style={{ marginTop: spacing["1"] }}>
                <ResumePDFText>{entry.summary}</ResumePDFText>
              </View>
            )}
            {hasHighlights && (
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
