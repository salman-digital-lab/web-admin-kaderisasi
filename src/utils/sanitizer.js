import DOMPurify from "dompurify"

export const sanitizeDOM = (dirty) => {
  return DOMPurify.sanitize(dirty, {
    ADD_TAGS: ["iframe"],
    ALLOWED_ATTR: [
      "href",
      "src",
      "style",
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
    ],
  })
}
