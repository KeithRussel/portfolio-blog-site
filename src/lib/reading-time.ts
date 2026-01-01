import { SerializedEditorState } from 'lexical'

/**
 * Calculate reading time for Lexical content
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(content: SerializedEditorState | null | undefined): number {
  if (!content?.root?.children) {
    return 1
  }

  const text = extractTextFromLexical(content)
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)

  return Math.max(1, minutes) // Minimum 1 minute
}

function extractTextFromLexical(content: SerializedEditorState): string {
  let text = ''

  function traverse(node: any) {
    if (node.type === 'text') {
      text += node.text + ' '
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(traverse)
    }
  }

  if (content.root?.children) {
    content.root.children.forEach(traverse)
  }

  return text
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`
}
