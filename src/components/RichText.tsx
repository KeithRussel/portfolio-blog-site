'use client'

import React from 'react'
import Image from 'next/image'
import { SerializedEditorState, SerializedLexicalNode } from 'lexical'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface RichTextProps {
  content: SerializedEditorState
  className?: string
}

// Simple language detection based on code patterns
function detectLanguage(code: string): string {
  const trimmed = code.trim()

  // TypeScript/JavaScript
  if (
    trimmed.includes('const ') ||
    trimmed.includes('let ') ||
    trimmed.includes('var ') ||
    trimmed.includes('function ') ||
    trimmed.includes('=>') ||
    trimmed.includes('import ') ||
    trimmed.includes('export ')
  ) {
    if (trimmed.includes(': ') || trimmed.includes('interface ') || trimmed.includes('type ')) {
      return 'typescript'
    }
    return 'javascript'
  }

  // CSS
  if (trimmed.includes('{') && (trimmed.includes(':') && trimmed.includes(';'))) {
    if (trimmed.match(/\.\w+\s*{/) || trimmed.match(/#\w+\s*{/)) {
      return 'css'
    }
  }

  // HTML
  if (trimmed.startsWith('<') && trimmed.includes('>')) {
    return 'html'
  }

  // Python
  if (trimmed.includes('def ') || trimmed.includes('import ') && trimmed.includes(':')) {
    return 'python'
  }

  // JSON
  if ((trimmed.startsWith('{') || trimmed.startsWith('[')) && trimmed.includes('"')) {
    return 'json'
  }

  // Default to javascript
  return 'javascript'
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content?.root?.children) {
    return null
  }

  return (
    <div className={className}>
      {content.root.children.map((node, index) => (
        <RenderNode key={index} node={node} />
      ))}
    </div>
  )
}

function RenderNode({ node }: { node: SerializedLexicalNode }) {
  const nodeType = (node as any).type

  // Handle different node types
  switch (nodeType) {
    case 'paragraph':
      return (
        <p className="mb-4">
          {(node as any).children?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </p>
      )

    case 'heading':
      const tag = (node as any).tag || 'h2'
      const HeadingTag = tag as keyof React.JSX.IntrinsicElements
      const headingClasses: Record<string, string> = {
        h1: 'text-4xl font-bold mb-6 mt-8',
        h2: 'text-3xl font-bold mb-4 mt-6',
        h3: 'text-2xl font-bold mb-3 mt-5',
        h4: 'text-xl font-bold mb-2 mt-4',
        h5: 'text-lg font-bold mb-2 mt-3',
        h6: 'text-base font-bold mb-2 mt-2',
      }
      return (
        <HeadingTag className={headingClasses[tag] || headingClasses.h2}>
          {(node as any).children?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </HeadingTag>
      )

    case 'list':
      const listTag = (node as any).listType === 'number' ? 'ol' : 'ul'
      const ListTag = listTag as keyof React.JSX.IntrinsicElements
      const listClass = listTag === 'ol' ? 'list-decimal ml-6 mb-4' : 'list-disc ml-6 mb-4'
      return (
        <ListTag className={listClass}>
          {(node as any).children?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </ListTag>
      )

    case 'listitem':
      return (
        <li className="mb-2">
          {(node as any).children?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </li>
      )

    case 'link':
      return (
        <a
          href={(node as any).url}
          target={(node as any).target || '_self'}
          rel={(node as any).rel || 'noopener noreferrer'}
          className="text-primary hover:underline"
        >
          {(node as any).children?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </a>
      )

    case 'text':
      let textContent = (node as any).text || ''
      const format = (node as any).format || 0

      // Check if text contains iframe
      if (textContent.includes('<iframe') && textContent.includes('</iframe>')) {
        return (
          <div
            className="my-6"
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        )
      }

      // Apply text formatting
      let text: any = textContent
      if (format & 1) {
        // Bold
        text = <strong className="font-bold">{text}</strong>
      }
      if (format & 2) {
        // Italic
        text = <em className="italic">{text}</em>
      }
      if (format & 4) {
        // Strikethrough
        text = <s className="line-through">{text}</s>
      }
      if (format & 8) {
        // Underline
        text = <u className="underline">{text}</u>
      }
      if (format & 16) {
        // Code
        text = <code className="bg-muted px-1 py-0.5 rounded text-sm">{text}</code>
      }

      return <>{text}</>

    case 'linebreak':
      return <br />

    case 'quote':
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic my-4">
          {(node as any).children?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </blockquote>
      )

    case 'code':
      // Extract code content from children
      const codeChildren = (node as any).children || []
      const codeText = codeChildren
        .map((child: any) => child.text || '')
        .join('')

      // Try to detect language from the code
      const language = detectLanguage(codeText)

      return (
        <div className="my-6 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
            }}
            showLineNumbers={false}
            wrapLines={true}
          >
            {codeText}
          </SyntaxHighlighter>
        </div>
      )

    case 'upload':
      const uploadValue = (node as any).value
      if (uploadValue && typeof uploadValue === 'object' && uploadValue.url) {
        // Get image dimensions from the upload data
        const imageWidth = uploadValue.width || 800
        const imageHeight = uploadValue.height || 600

        // Check for alignment/size hints from Payload (if available)
        const alignment = (node as any).fields?.alignment || 'center'

        // Define alignment classes
        const alignmentClasses: Record<string, string> = {
          left: 'mr-auto',
          center: 'mx-auto',
          right: 'ml-auto',
        }

        return (
          <div className={`my-6 ${alignmentClasses[alignment] || alignmentClasses.center}`}>
            <Image
              src={uploadValue.url}
              alt={uploadValue.alt || 'Blog image'}
              width={imageWidth}
              height={imageHeight}
              className="rounded-lg w-full md:w-auto md:max-w-full h-auto"
              unoptimized
              style={{ maxWidth: imageWidth }}
            />
            {uploadValue.caption && (
              <p className="text-sm text-gray-600 text-center mt-2 italic">
                {uploadValue.caption}
              </p>
            )}
          </div>
        )
      }
      return null

    case 'iframe':
      const iframeUrl = (node as any).url || (node as any).fields?.url
      const iframeTitle = (node as any).title || (node as any).fields?.title || 'Embedded content'
      const iframeHeight = (node as any).height || (node as any).fields?.height || '400'

      if (iframeUrl) {
        return (
          <div className="my-8 w-full">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={iframeUrl}
                title={iframeTitle}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )
      }
      return null

    case 'horizontalrule':
      return <hr className="my-8 border-t border-gray-300" />

    case 'html':
      const htmlContent = (node as any).value || (node as any).html
      if (htmlContent) {
        return (
          <div
            className="my-6"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )
      }
      return null

    case 'block':
      const blockType = (node as any).fields?.blockType

      if (blockType === 'htmlBlock') {
        const htmlCode = (node as any).fields?.html
        if (htmlCode) {
          return (
            <div
              className="my-6"
              dangerouslySetInnerHTML={{ __html: htmlCode }}
            />
          )
        }
      }

      if (blockType === 'codeBlock') {
        const codeContent = (node as any).fields?.code
        const codeLang = (node as any).fields?.language || 'javascript'

        if (codeContent) {
          return (
            <div className="my-6 rounded-lg overflow-hidden">
              <SyntaxHighlighter
                language={codeLang}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                }}
                showLineNumbers={false}
                wrapLines={true}
              >
                {codeContent}
              </SyntaxHighlighter>
            </div>
          )
        }
      }

      return null

    default:
      // For unknown node types, try to render children if they exist
      if ((node as any).children) {
        return (
          <>
            {(node as any).children.map((child: any, index: number) => (
              <RenderNode key={index} node={child} />
            ))}
          </>
        )
      }
      return null
  }
}
