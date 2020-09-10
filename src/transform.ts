import { default as visit } from 'unist-util-visit';
import { default as is } from 'unist-util-is';
import { Node } from 'unist';
import { Paragraph, Heading, Text, Link } from 'mdast';
export interface IOptions {
  video: boolean;
  article: boolean;
}

export default ({ video, article }: IOptions) => (tree: Node) => {
  if (!(video || article)) {
    return;
  }

  visit<Text>(tree, 'text', (node, index, parent) => {
    if (is<Paragraph>(parent, 'paragraph') || is<Heading>(parent, 'heading')) {
      const value = node.value;

      const re = new RegExp(
        String.raw`[${video ? 'Aa' : ''}${article ? 'Cc' : ''}][Vv]\d+${video ? '|[Bb][Vv][0-9A-Za-z]{10}' : ''}`,
        'g',
      );

      let result;

      const children: (Text | Link)[] = [];

      let preIdx = 0;
      while (result = re.exec(value)) {
        const curIdx = result.index;
        const [url] = result;

        if (curIdx > preIdx) {
          children.push({
            type: 'text',
            value: value.slice(preIdx, curIdx),
          } as Text);
        }

        children.push({
          type: 'link',
          // title: null,
          url: `https://www.bilibili.com/${
            ['av', 'bv'].includes(url.slice(0, 2).toLowerCase()) ? 'video' : 'read'
          }/${url}`,
          children: [{ type: 'text', value: url } as Text],
        } as Link);

        preIdx = curIdx + url.length;
      }

      if (value.length > preIdx) {
        children.push({
          type: 'text',
          value: value.slice(preIdx, value.length),
        });
      }

      parent.children.splice(index, 1, ...children);
    }
  });
};
