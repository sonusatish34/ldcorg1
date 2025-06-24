// components/SunEditorText.tsx
'use client'

import dynamic from 'next/dynamic'
const SunEditor = dynamic(() => import('suneditor-react'), { ssr: false })
import 'suneditor/dist/css/suneditor.min.css'

export default function SunEditorText() {
  const handleEditorChange = (content) => {
    console.log('Editor HTML content:', content)
  }

  return (
    <div className="max-w-xl mx-auto p-4 border rounded">
      <SunEditor
        height="200px"
        setOptions={{
          buttonList: [
            ['bold', 'italic', 'underline'],
            ['fontColor'],
            ['list'],
          ],
        }}
        onChange={handleEditorChange}
      />
    </div>
  )
}
