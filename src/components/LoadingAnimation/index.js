import React from "react"
import ContentLoader, { Facebook } from "react-content-loader"
/* eslint-disable */
const LoadingAnimation = (props) => {
  if (props.bmka) {
    return (
      <ContentLoader
        speed={2}
        width={340}
        height={124.44}
        viewBox="0 0 340 124.44"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <path d="M 161.33 96.985 l 8.06 -41.92 q 7.55 -0.64 12.42 -0.64 q 4.86 0 8 0.42 q 3.13 0.41 5.25 1.5 q 4.22 2.05 4.22 7.68 q 0 3.26 -2.82 6.02 q -2.62 2.49 -5.5 3.07 q 3.07 0.51 5.25 2.81 q 2.3 2.44 2.3 6.21 q 0 7.3 -5.44 11.55 q -5.44 4.26 -16.13 4.26 q -7.36 0 -15.61 -0.96 z m 17.41 -20.29 l -3.2 16.58 q 0.57 0.06 0.7 0.06 h 0.58 q 5.24 0 7.48 -3.45 q 1.67 -2.69 1.67 -7.62 q 0 -2.62 -1.7 -4.03 q -1.69 -1.41 -5.53 -1.54 z m 9.72 -12.61 q 0 -5.31 -5.12 -5.31 h -0.57 q -0.26 0 -0.64 0.07 l -2.56 13.5 h 0.64 q 8.25 -0.19 8.25 -8.26 z m 19.72 33.22 h -7.36 l 11.58 -42.24 h 13.38 l 2.94 24.13 l 11.9 -24.13 h 11.2 l 1.16 31.62 q 0.25 6.27 3.32 8.19 q -0.7 1.28 -2.75 2.49 q -2.05 1.22 -4.77 1.22 q -2.72 0 -4.32 -0.77 t -2.49 -2.05 q -1.6 -2.3 -1.6 -6.72 v -19.77 l -12.61 28.03 h -7.94 l -4.48 -28.74 l -7.16 28.74 z m 63.93 0 h -13.63 l 7.3 -38.91 l 0.7 -3.33 h 13.7 l -8.07 42.24 z m 25.99 -3.78 q -1.73 5.06 -8.39 5.06 q -4.93 0 -8.32 -5.89 q -3.45 -5.89 -4.09 -15.49 q 7.04 -12.86 11.9 -18.17 q 4.67 -5.06 9.54 -5.06 q 2.62 0 4.51 1.41 q 1.89 1.41 2.33 3.65 q -2.17 0.89 -3.2 1.6 q -2.56 1.92 -6.01 6.21 l -5.83 6.97 q -1.4 1.67 -1.98 2.43 q 0.96 5.38 3.84 10.69 q 2.75 5.06 5.7 6.59 z m 33.53 5.06 q -8.19 0 -8.96 -11.65 h -11.01 q -1.28 2.95 -2.17 5.51 l -1.67 4.86 h -8.96 l 20.16 -42.24 h 13.76 l 2.69 31.1 q 0.64 6.72 3.2 8.71 q -1.85 3.71 -7.04 3.71 z m -14.46 -24.45 l -3.52 8.13 h 8.83 l -0.77 -16.45 v -1.73 l -4.54 10.05 z" />
      </ContentLoader>
    )
  }
  if (props.table) {
    return (
      <ContentLoader viewBox="0 0 400 75">
        <rect x="0" y="0" rx="0" ry="0" width="400" height="1" />
        <rect x="0" y="19" rx="0" ry="0" width="400" height="1" />
        <rect x="0" y="24" rx="0" ry="0" width="400" height="3" />
        <rect x="0" y="31" rx="0" ry="0" width="23" height="3" />
        <rect x="0" y="43" rx="0" ry="0" width="199" height="1" />
        <rect x="200" y="43" rx="0" ry="0" width="200" height="1" />
        <rect x="0" y="54" rx="0" ry="0" width="199" height="1" />
        <rect x="200" y="54" rx="0" ry="0" width="200" height="1" />
        <rect x="0" y="67" rx="0" ry="0" width="199" height="1" />
        <rect x="200" y="67" rx="0" ry="0" width="200" height="1" />
        <rect x="0" y="80" rx="0" ry="0" width="199" height="1" />
        <rect x="200" y="80" rx="0" ry="0" width="200" height="1" />
        <rect x="32" y="5" rx="0" ry="0" width="10" height="10" />
        <rect x="86" y="5" rx="0" ry="0" width="10" height="10" />
        <rect x="170" y="5" rx="0" ry="0" width="10" height="10" />
        <rect x="239" y="5" rx="0" ry="0" width="10" height="10" />
        <rect x="341" y="5" rx="0" ry="0" width="41" height="10" />
      </ContentLoader>
    )
  }
  if (props.facebook) {
    return <Facebook />
  }
  return (
    <ContentLoader
      speed={1}
      viewBox="0 0 340 84"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="9" y="4" rx="0" ry="0" width="320" height="22" />
      <rect x="18" y="14" rx="0" ry="0" width="303" height="6" />
      <rect x="11" y="33" rx="0" ry="0" width="108" height="13" />
      <rect x="129" y="33" rx="0" ry="0" width="60" height="13" />
      <rect x="196" y="33" rx="0" ry="0" width="60" height="13" />
    </ContentLoader>
  )
}

export default LoadingAnimation
