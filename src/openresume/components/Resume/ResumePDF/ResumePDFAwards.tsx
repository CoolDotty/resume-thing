import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFText
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { formatMonthYear } from "lib/redux/resumeFormatting";
import type { JsonResumeAward } from "lib/redux/types";

export const ResumePDFAwards = ({
  heading,
  awards,
  themeColor
}: {
  heading: string;
  awards: JsonResumeAward[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {awards.map((award, idx) => (
        <View key={idx} style={idx !== 0 ? { marginTop: spacing["1.5"] } : {}}>
          <View style={styles.flexRowBetween}>
            <ResumePDFText bold={true}>{award.title}</ResumePDFText>
            <ResumePDFText>{formatMonthYear(award.date)}</ResumePDFText>
          </View>
          {award.awarder && (
            <View style={{ marginTop: spacing["1"] }}>
              <ResumePDFText>{award.awarder}</ResumePDFText>
            </View>
          )}
          {award.summary && (
            <View style={{ marginTop: spacing["1"] }}>
              <ResumePDFText>{award.summary}</ResumePDFText>
            </View>
          )}
        </View>
      ))}
    </ResumePDFSection>
  );
};
