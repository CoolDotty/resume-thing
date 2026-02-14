export interface ResumeEntryAtom {
  key: string
  type: "entryCore" | "highlightSingle"
  includeHeading: boolean
  highlights: string[]
}

export const buildEntryAtoms = ({
  entryIndex,
  highlights
}: {
  entryIndex: number
  highlights: string[]
}): ResumeEntryAtom[] => {
  const coreHighlightCount = highlights.length === 3 ? 3 : 2
  const atoms: ResumeEntryAtom[] = [
    {
      key: `entry-${entryIndex}`,
      type: "entryCore",
      includeHeading: entryIndex === 0,
      highlights: highlights.slice(0, coreHighlightCount)
    }
  ]

  highlights.slice(coreHighlightCount).forEach((highlight, highlightIndex) => {
    atoms.push({
      key: `entry-${entryIndex}-highlight-${highlightIndex}`,
      type: "highlightSingle",
      includeHeading: false,
      highlights: [highlight]
    })
  })

  return atoms
}
