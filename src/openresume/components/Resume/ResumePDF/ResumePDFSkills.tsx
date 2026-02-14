import { View } from "@react-pdf/renderer"
import {
  ResumePDFAtomBlock,
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFSectionHeading,
  ResumePDFText
} from "components/Resume/ResumePDF/common"
import { styles, spacing } from "components/Resume/ResumePDF/styles"
import { joinNonEmpty } from "lib/redux/resumeFormatting"
import type { JsonResumeSkill } from "lib/redux/types"

export const ResumePDFSkills = ({
  heading,
  skills,
  themeColor,
  showBulletPoints
}: {
  heading: string
  skills: JsonResumeSkill[]
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
      {skills.map((skill, idx) => {
        const label = joinNonEmpty([skill.name, skill.level], " - ")

        return (
          <ResumePDFAtomBlock key={idx} style={idx !== 0 ? { marginTop: spacing["1.5"] } : {}}>
            <View style={{ ...styles.flexCol, gap: spacing["2"] }}>
              {idx === 0 && <ResumePDFSectionHeading themeColor={themeColor} heading={heading} />}
              <View>
                <ResumePDFText bold={true}>{label || skill.name}</ResumePDFText>
                {skill.keywords.length > 0 && (
                  <View style={{ ...styles.flexCol, marginTop: spacing["0.5"] }}>
                    <ResumePDFBulletList
                      items={skill.keywords}
                      showBulletPoints={showBulletPoints}
                    />
                  </View>
                )}
              </View>
            </View>
          </ResumePDFAtomBlock>
        )
      })}
    </ResumePDFSection>
  )
}
