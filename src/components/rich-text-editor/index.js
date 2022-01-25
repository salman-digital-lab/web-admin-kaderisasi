import "./style.scss"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import React from "react"
import htmlToDraft from "html-to-draftjs"
import embed from "embed-video"
import draftToHtml from "draftjs-to-html"
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw, ContentState } from "draft-js"
import { REGEX_HTTPS } from "../../utils"

export const getPlainText = (value) => {
  const text = convertToRaw(value.getCurrentContent())
    .blocks.map((block) => (!block.text.trim() && "\n") || block.text)
    .join("\n")
    .trim()

  return text
}

export const getEditorContent = (value) => {
  const contentBlock = htmlToDraft(value)
  const content = EditorState.createWithContent(
    ContentState.createFromBlockArray(contentBlock.contentBlocks)
  )

  return content
}

export const getContentString = (value) =>
  draftToHtml(convertToRaw(value.getCurrentContent()))

const RichEditor = ({ editorState, onEditorStateChange, invalidState }) => {
  return (
    <Editor
      editorState={editorState}
      wrapperClassName="demo-wrapper"
      editorClassName={`demo-editor form-control fw ${
        invalidState ? "is-invalid" : ""
      }`}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "fontFamily",
          "list",
          "link",
          "embedded",
          "image",
        ],
        inline: { options: ["bold", "italic", "underline", "strikethrough"] },
        list: { options: ["unordered", "ordered"] },
        link: {
          popupClassName: "h-min-content",
          linkCallback: (params) => ({ ...params }),
        },
        embedded: {
          popupClassName: "h-min-content",
          embedCallback: (linkEmbed) => {
            if (!REGEX_HTTPS.test(linkEmbed)) linkEmbed = `https://${linkEmbed}`

            const detectedSrc = /<iframe.*? src="(.*?)"/.exec(embed(linkEmbed))
            return (detectedSrc && detectedSrc[1]) || linkEmbed
          },
        },
        image: {
          previewImage: true,
        },
      }}
    />
  )
}

export default RichEditor
