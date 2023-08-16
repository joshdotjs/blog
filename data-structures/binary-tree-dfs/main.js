class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function depthFirstSearch(root) {
  if (root === null) {
    return;
  }

  console.log(root.value); // Process the current node

  depthFirstSearch(root.left); // Recursively call DFS on the left child
  depthFirstSearch(root.right); // Recursively call DFS on the right child
}

// Example usage:
let root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);

depthFirstSearch(root); // Output: 10 5 2 7 15