import { View } from "@react-pdf/renderer"
import {
  ResumePDFAtomBlock,
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFSectionHeading,
  ResumePDFText
} from "components/Resume/ResumePDF/common"
import { styles, spacing } from "components/Resume/ResumePDF/styles"
import { formatMonthYear } from "lib/redux/resumeFormatting"
import type { JsonResumePublication } from "lib/redux/types"

export const ResumePDFPublications = ({
  heading,
  publications,
  themeColor,
  isPDF
}: {
  heading: string
  publications: JsonResumePublication[]
  themeColor: string
  isPDF: boolean
}) => {
  return (
    <ResumePDFSection
      themeColor={themeColor}
      heading={heading}
      showHeading={false}
      style={{ gap: spacing[0] }}
    >
      {publications.map((publication, idx) => (
        <ResumePDFAtomBlock key={idx} style={idx !== 0 ? { marginTop: spacing["1.5"] } : {}}>
          <View style={{ ...styles.flexCol, gap: spacing["2"] }}>
            {idx === 0 && <ResumePDFSectionHeading themeColor={themeColor} heading={heading} />}
            <View>
              <View style={styles.flexRowBetween}>
                {publication.url ? (
                  <ResumePDFLink
                    src={
                      publication.url.startsWith("http")
                        ? publication.url
                        : `https://${publication.url}`
                    }
                    isPDF={isPDF}
                  >
                    <ResumePDFText bold={true}>{publication.name}</ResumePDFText>
                  </ResumePDFLink>
                ) : (
                  <ResumePDFText bold={true}>{publication.name}</ResumePDFText>
                )}
                <ResumePDFText>{formatMonthYear(publication.releaseDate)}</ResumePDFText>
              </View>
              <View style={{ ...styles.flexRowBetween, marginTop: spacing["1"] }}>
                <ResumePDFText>{publication.publisher}</ResumePDFText>
              </View>
              {publication.summary && (
                <View style={{ marginTop: spacing["1"] }}>
                  <ResumePDFText>{publication.summary}</ResumePDFText>
                </View>
              )}
            </View>
          </View>
        </ResumePDFAtomBlock>
      ))}
    </ResumePDFSection>
  )
}
