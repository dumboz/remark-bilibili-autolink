import { default as visit } from 'unist-util-visit';
import { default as is } from 'unist-util-is';
import { VFile } from 'vfile';
import { Node } from 'unist';
export interface IOptions {
  marker?: string;
}

export default (options: IOptions) => (tree: Node, file: VFile) => {
  const visitor = (node: any, index: number, parent: any) => {
    if (is('paragraph', parent) || is('heading', parent)) {

      const value = node.value;
      const re = /([ac]v)\d+/g;

      let result;

      const children = [];

      let preIdx = 0;
      while ((result = re.exec(value))) {
        const curIdx = result.index;
        const [url, type] = result;

        if (curIdx > preIdx) {
          children.push({ type: 'text', value: value.slice(preIdx, curIdx) });
        }

        children.push({
          type: 'link',
          title: null,
          url: `https://www.bilibili.com/${type === 'av' ? 'video' : 'read'}/${url}`,
          children: [{ type: 'text', value: url }],
        });

        preIdx = curIdx + url.length;
      }

      if (value.length > preIdx) {
        children.push({ type: 'text', value: value.slice(preIdx, value.length) });
      }

      parent.children.splice(index, 1, ...children);
    }
  };

  visit(tree, 'text', visitor);
};
