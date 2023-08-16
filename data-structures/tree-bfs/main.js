class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = []; // Array to hold child nodes
  }

  addChild(childNode) {
    this.children.push(childNode);
  }
}

function breadthFirstSearch(root) {
  if (root === null) {
    return;
  }

  let queue = [];
  queue.push(root);

  while (queue.length > 0) {
    let node = queue.shift();
    console.log(node.value); // Process the current node

    // Enqueue all child nodes
    for (let child of node.children) {
      if (child !== null) {
        queue.push(child);
      }
    }
  }
}

// Example usage:
let root = new TreeNode(10);
root.addChild(new TreeNode(5));
root.addChild(new TreeNode(15));
root.addChild(new TreeNode(20));
root.children[0].addChild(new TreeNode(2));
root.children[0].addChild(new TreeNode(7));

breadthFirstSearch(root); // Output: 10 5 15 20 2 7