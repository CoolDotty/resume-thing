import { View } from "@react-pdf/renderer"
import {
  ResumePDFAtomBlock,
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFSectionHeading,
  ResumePDFText
} from "components/Resume/ResumePDF/common"
import { styles, spacing } from "components/Resume/ResumePDF/styles"
import type { JsonResumeInterest } from "lib/redux/types"

export const ResumePDFInterests = ({
  heading,
  interests,
  themeColor,
  showBulletPoints
}: {
  heading: string
  interests: JsonResumeInterest[]
  themeColor: string
  showBulletPoints: boolean
}) => {
  return (
    <ResumePDFSection
      themeColor={themeColor}
      heading={heading}
      showHeading={false}
      style={{ gap: spacing[0] }}
    >
      {interests.map((interest, idx) => (
        <ResumePDFAtomBlock key={idx} style={idx !== 0 ? { marginTop: spacing["1.5"] } : {}}>
          <View style={{ ...styles.flexCol, gap: spacing["2"] }}>
            {idx === 0 && <ResumePDFSectionHeading themeColor={themeColor} heading={heading} />}
            <View>
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
          </View>
        </ResumePDFAtomBlock>
      ))}
    </ResumePDFSection>
  )
}
