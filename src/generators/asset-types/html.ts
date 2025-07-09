import { FontGenerator } from '../../types/generator';
import { renderTemplate } from '../../utils/template';

const generator: FontGenerator = {
  generate: async options => {
    return renderTemplate(options.templates.html, {
      ...options,
      tag: options.tag === '' ? 'i' : options.tag
    });
  }
};

export default generator;
