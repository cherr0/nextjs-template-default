#!/usr/bin/env node
/*
 * 아이콘 레지스트리 자동 생성 스크립트
 * - src/icons/generated/*.tsx 파일을 스캔해 이름-컴포넌트 매핑과 타입 유니온을 생성
 * - 출력: src/components/Icon/registry.ts (자동 생성 파일)
 */

const fs = require('fs');
const path = require('path');

const GENERATED_DIR = path.resolve(process.cwd(), 'src/icons/generated');
const OUT_DIR = path.resolve(process.cwd(), 'src/components/Icon');
const OUT_FILE = path.join(OUT_DIR, 'registry.ts');

function toKebabCase(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}

function main() {
  if (!fs.existsSync(GENERATED_DIR)) {
    console.error(`[icons] generated 디렉토리가 없습니다: ${GENERATED_DIR}`);
    process.exit(0);
  }
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs
    .readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith('.tsx'))
    .sort();

  const entries = files.map((file) => {
    const base = path.basename(file, '.tsx');
    const importName = base.replace(/[^a-zA-Z0-9]/g, '');
    const kebab = toKebabCase(base);
    return { file, base, importName, kebab };
  });

  const importLines = entries.map(
    (e) => `import ${e.importName} from '@/icons/generated/${e.base}';`
  );

  const names = entries.map((e) => `'${e.kebab}'`).join(' | ') || "never";
  const mapLines = entries.map((e) => `  '${e.kebab}': ${e.importName},`);

  const content = `// 이 파일은 자동 생성됩니다. 직접 수정하지 마세요.
import type { SVGProps } from 'react';
${importLines.join('\n')}

export type LocalIconName = ${names};

export type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export const localIcons: Record<LocalIconName, IconComponent> = {
${mapLines.join('\n')}
};
`;

  fs.writeFileSync(OUT_FILE, content, 'utf8');
  console.log(`[icons] registry 생성 완료: ${OUT_FILE}`);
}

main();

