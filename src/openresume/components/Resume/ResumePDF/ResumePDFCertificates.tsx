import { View } from "@react-pdf/renderer";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { formatMonthYear } from "lib/redux/resumeFormatting";
import type { JsonResumeCertificate } from "lib/redux/types";

export const ResumePDFCertificates = ({
  heading,
  certificates,
  themeColor,
  isPDF
}: {
  heading: string;
  certificates: JsonResumeCertificate[];
  themeColor: string;
  isPDF: boolean;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {certificates.map((certificate, idx) => (
        <View key={idx} style={idx !== 0 ? { marginTop: spacing["1.5"] } : {}}>
          <View style={styles.flexRowBetween}>
            {certificate.url ? (
              <ResumePDFLink
                src={certificate.url.startsWith("http") ? certificate.url : `https://${certificate.url}`}
                isPDF={isPDF}
              >
                <ResumePDFText bold={true}>{certificate.name}</ResumePDFText>
              </ResumePDFLink>
            ) : (
              <ResumePDFText bold={true}>{certificate.name}</ResumePDFText>
            )}
            <ResumePDFText>{formatMonthYear(certificate.date)}</ResumePDFText>
          </View>
          {certificate.issuer && (
            <View style={{ marginTop: spacing["1"] }}>
              <ResumePDFText>{certificate.issuer}</ResumePDFText>
            </View>
          )}
        </View>
      ))}
    </ResumePDFSection>
  );
};
