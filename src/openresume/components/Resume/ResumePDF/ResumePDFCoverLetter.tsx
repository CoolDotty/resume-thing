import { Image, View } from "@react-pdf/renderer"
import {
  ResumePDFBulletList,
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText
} from "components/Resume/ResumePDF/common"
import { styles, spacing } from "components/Resume/ResumePDF/styles"
import { formatDisplayUrl } from "lib/redux/resumeFormatting"
import type {
  JsonResumeCoverLetter,
  JsonResumeCoverLetterAddress
} from "lib/redux/types"

const isCoverLetterAddressLink = (
  value: JsonResumeCoverLetterAddress
): value is { url: string; label: string } => !Array.isArray(value)

export const ResumePDFCoverLetter = ({
  coverLetter,
  isPDF
}: {
  coverLetter: JsonResumeCoverLetter
  isPDF: boolean
}) => {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })

  return (
    <ResumePDFSection
      style={{
        ...styles.flexCol,
        gap: spacing[4],
        marginTop: spacing[0]
      }}
      showHeading={false}
    >
      <View style={{ ...styles.flexCol, gap: spacing[1.5], marginBottom: spacing[5] }}>
        <ResumePDFText style={{ marginVertical: spacing[5] }}>{today}</ResumePDFText>
        {coverLetter.companyName && <ResumePDFText bold={true}>{coverLetter.companyName}</ResumePDFText>}
        {isCoverLetterAddressLink(coverLetter.companyAddress) ? (
          coverLetter.companyAddress.url ? (
            <ResumePDFLink src={coverLetter.companyAddress.url} isPDF={isPDF}>
              <ResumePDFText>
                {coverLetter.companyAddress.label ||
                  formatDisplayUrl(coverLetter.companyAddress.url)}
              </ResumePDFText>
            </ResumePDFLink>
          ) : null
        ) : (
          coverLetter.companyAddress.map((line, idx) =>
            line.trim() ? <ResumePDFText key={idx}>{line}</ResumePDFText> : null
          )
        )}
      </View>
      <View style={{ ...styles.flexCol, gap: spacing[3] }}>
        {coverLetter.body.map((block, idx) =>
          typeof block === "string" ? (
            <ResumePDFText key={idx} style={{ lineHeight: "1.4" }}>
              {block}
            </ResumePDFText>
          ) : (
            <ResumePDFBulletList key={idx} items={block} showBulletPoints={true} />
          )
        )}
      </View>
      <View style={{ ...styles.flexCol, gap: spacing[1.5], marginTop: spacing[2] }}>
        {coverLetter.signoff && <ResumePDFText>{coverLetter.signoff}</ResumePDFText>}
        {coverLetter.signatureImage && (
          <Image
            src={coverLetter.signatureImage}
            style={{
              width: "120pt",
              height: "45pt"
            }}
          />
        )}
        {coverLetter.signatureName && <ResumePDFText>{coverLetter.signatureName}</ResumePDFText>}
      </View>
    </ResumePDFSection>
  )
}
