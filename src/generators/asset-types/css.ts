import { FontGenerator } from '../../types/generator';
import { FontAssetType } from '../../types/misc';
import { renderTemplate } from '../../utils/template';
import { renderSrcAttribute } from '../../utils/css';

const generator: FontGenerator<Buffer> = {
  dependsOn: FontAssetType.SVG,

  generate: (options, svg: Buffer, generated) =>
    renderTemplate(options.templates.css, {
      ...options,
      fontSrc: renderSrcAttribute(options, svg, generated)
    })
};

export default generator;
