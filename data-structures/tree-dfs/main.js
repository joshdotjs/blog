class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(childNode) {
    this.children.push(childNode);
  }
}

function depthFirstSearch(root) {
  if (root === null) {
    return;
  }

  console.log(root.value); // Process the current node

  // Recursively call DFS on all child nodes
  for (let child of root.children) {
    if (child !== null) {
      depthFirstSearch(child);
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

depthFirstSearch(root); // Output: 10 5 2 7 15 20