interface Visitor {
  (node: any, index: number, parent: any): any;
}

declare module "unist-util-visit" {
  function visit(tree: any, test: Function | string, visitor: Visitor): any;
  export default visit;
}

declare module "unist-util-is" {
  function is(test: any, node: any): boolean;
  export default is;
}
