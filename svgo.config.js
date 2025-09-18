// SVGO 설정: Figma SVG를 최적화하고 currentColor 기반으로 통일
// - viewBox 유지, width/height 제거, fill 제거
// - 컬러를 currentColor로 교체는 SVGR 단계에서 처리
module.exports = {
  multipass: true,
  plugins: [
    { name: 'preset-default' },
    { name: 'removeViewBox', active: false },
    { name: 'removeDimensions', active: true },
    { name: 'cleanupIds', active: true },
    { name: 'removeScripts', active: true },
    { name: 'removeStyleElement', active: true },
    { name: 'removeXMLNS', active: true }
    // 색상은 사전 normalize 단계에서 currentColor로 통일하므로 여기서 제거하지 않습니다.
  ]
}
