import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFText
} from "components/Resume/ResumePDF/common";
import { spacing } from "components/Resume/ResumePDF/styles";
import type { JsonResumeReference } from "lib/redux/types";

export const ResumePDFReferences = ({
  heading,
  references,
  themeColor
}: {
  heading: string;
  references: JsonResumeReference[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {references.map((reference, idx) => (
        <View key={idx} style={idx !== 0 ? { marginTop: spacing["1.5"] } : {}}>
          <ResumePDFText bold={true}>{reference.name}</ResumePDFText>
          {reference.reference && (
            <View style={{ marginTop: spacing["0.5"] }}>
              <ResumePDFText>{reference.reference}</ResumePDFText>
            </View>
          )}
        </View>
      ))}
    </ResumePDFSection>
  );
};
