// Syntax highlighting — só regista as linguagens usadas para manter o bundle pequeno
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('python', python)

export type CodeLanguage = 'typescript' | 'python'

export function highlight(code: string, language: CodeLanguage): string {
  return hljs.highlight(code, { language }).value
}
