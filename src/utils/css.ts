import fs from 'fs';
import path from 'path';

import { FontGeneratorOptions } from '../types/generator';
import { getHash } from './hash';
import { FontAssetType } from '../types/misc';

interface RenderSrcOptions {
  formatValue: string;
  getSuffix?: (name: string) => string;
}

const renderSrcOptions: { [key in FontAssetType]: RenderSrcOptions } = {
  [FontAssetType.EOT]: {
    formatValue: 'embedded-opentype',
    getSuffix: () => '#iefix'
  },
  [FontAssetType.WOFF2]: { formatValue: 'woff2' },
  [FontAssetType.WOFF]: { formatValue: 'woff' },
  [FontAssetType.TTF]: { formatValue: 'truetype' },
  [FontAssetType.SVG]: { formatValue: 'svg', getSuffix: name => `#${name}` }
};

export const renderSrcAttribute = (
  { name, fontTypes, fontsUrl, base64, outputDir }: FontGeneratorOptions,
  font: string | Buffer
) =>
  fontTypes
    .map(fontType => {
      const { formatValue, getSuffix } = renderSrcOptions[fontType];
      const hash = getHash(font.toString('utf8'));
      const suffix = getSuffix ? getSuffix(name) : '';
      if (base64) {
        const fontPath = path.resolve(
          outputDir,
          `${fontsUrl || '.'}/${name}.${fontType}`
        );
        const fontBuffer = fs.readFileSync(fontPath);
        const base64Font = fontBuffer.toString('base64');
        return `url("data:font/${fontType};base64,${base64Font}${suffix}") format("${formatValue}")`;
      } else {
        return `url("${
          fontsUrl || '.'
        }/${name}.${fontType}?${hash}${suffix}") format("${formatValue}")`;
      }
    })
    .join(',\n');
