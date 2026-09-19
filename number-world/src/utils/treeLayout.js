const NODE_WIDTH = 80;
const NODE_HEIGHT = 70;
const H_GAP = 20;
const V_GAP = 70;

export function computeLayout(tree) {
  if (!tree) return { nodes: [], edges: [], width: 0, height: 0 };
  const positions = [];
  const edges = [];
  let nextX = 0;

  function measure(node) {
    if (node.children.length === 0) return 1;
    let w = 0;
    for (const child of node.children) {
      w += measure(child);
    }
    return Math.max(w, 1);
  }

  function layout(node, depth, leftOffset) {
    if (node.children.length === 0) {
      const x = leftOffset * (NODE_WIDTH + H_GAP);
      const y = depth * (NODE_HEIGHT + V_GAP);
      positions.push({ id: node.id, value: node.value, isPrime: node.isPrime, x, y, depth, state: node.state });
      return { x, width: 1 };
    }

    const childResults = [];
    let totalWidth = 0;
    for (const child of node.children) {
      const childWidth = measure(child);
      const result = layout(child, depth + 1, leftOffset + totalWidth);
      childResults.push(result);
      totalWidth += childWidth;
    }

    const firstChildX = childResults[0].x;
    const lastChildX = childResults[childResults.length - 1].x;
    const x = (firstChildX + lastChildX) / 2;
    const y = depth * (NODE_HEIGHT + V_GAP);

    positions.push({ id: node.id, value: node.value, isPrime: node.isPrime, x, y, depth, state: node.state });

    for (const child of node.children) {
      const childPos = positions.find(p => p.id === child.id);
      if (childPos) {
        edges.push({ from: { x, y: y + NODE_HEIGHT / 2 }, to: { x: childPos.x, y: childPos.y - NODE_HEIGHT / 2 }, fromId: node.id, toId: child.id });
      }
    }

    return { x, width: totalWidth };
  }

  layout(tree, 0, 0);

  const maxX = positions.reduce((mx, p) => Math.max(mx, p.x), 0);
  const maxY = positions.reduce((my, p) => Math.max(my, p.y), 0);

  return {
    nodes: positions,
    edges,
    width: maxX + NODE_WIDTH + H_GAP,
    height: maxY + NODE_HEIGHT + V_GAP,
  };
}
