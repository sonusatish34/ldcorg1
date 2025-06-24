// components/TextEditor.tsx
'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
// import Emoji from '@tiptap/extension-emoji'

export default function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList,
    ],
    content: '<p>Hello World!</p>',
  })

  if (!editor) return null

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-sm space-y-2">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          • Bullet
        </button>
        <button
          onClick={() => editor.chain().focus().insertContent('😊')}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          😊 Emoji
        </button>
      </div>
      <EditorContent editor={editor} className="prose max-w-none min-h-[150px] p-3 border rounded" />
    </div>
  )
}
