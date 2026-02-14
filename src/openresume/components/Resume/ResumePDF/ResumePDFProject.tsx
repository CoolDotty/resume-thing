import { View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { formatDateRange, joinNonEmpty } from "lib/redux/resumeFormatting";
import type { JsonResumeProject } from "lib/redux/types";

export const ResumePDFProject = ({
  heading,
  projects,
  themeColor,
  showBulletPoints,
  isPDF
}: {
  heading: string;
  projects: JsonResumeProject[];
  themeColor: string;
  showBulletPoints: boolean;
  isPDF: boolean;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {projects.map((entry, idx) => {
        const date = formatDateRange(entry.startDate, entry.endDate);
        const meta = joinNonEmpty([entry.entity, entry.type], " - ");

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
            {meta && (
              <View style={{ marginTop: spacing["1"] }}>
                <ResumePDFText>{meta}</ResumePDFText>
              </View>
            )}
            {entry.description && (
              <View style={{ marginTop: spacing["1"] }}>
                <ResumePDFText>{entry.description}</ResumePDFText>
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
