#!/usr/bin/env node
/*
 * Figma SVG 색상 정규화 스크립트
 * - fill/stroke 속성이 'none' 또는 'currentColor'가 아닌 경우 'currentColor'로 치환
 * - 대소문자/공백/따옴표 변형 대응(간단 정규식)
 */
const fs = require('fs');
const path = require('path');

const RAW_DIR = path.resolve(process.cwd(), 'src/icons/raw');

if (!fs.existsSync(RAW_DIR)) process.exit(0);

const files = fs.readdirSync(RAW_DIR).filter((f) => f.endsWith('.svg'));

for (const file of files) {
  const p = path.join(RAW_DIR, file);
  const src = fs.readFileSync(p, 'utf8');

  let out = src
    // fill="..." → fill="currentColor" (none/currentColor 제외)
    .replace(/fill\s*=\s*['\"](?!none|currentColor)([^'\"]+)['\"]/gi, 'fill="currentColor"')
    // stroke="..." → stroke="currentColor" (none/currentColor 제외)
    .replace(/stroke\s*=\s*['\"](?!none|currentColor)([^'\"]+)['\"]/gi, 'stroke="currentColor"');

  if (out !== src) {
    fs.writeFileSync(p, out, 'utf8');
    console.log(`[icons] normalized: ${file}`);
  }
}

