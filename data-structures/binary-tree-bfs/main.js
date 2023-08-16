class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
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

    if (node.left !== null) {
      queue.push(node.left); // Enqueue left child if it exists
    }

    if (node.right !== null) {
      queue.push(node.right); // Enqueue right child if it exists
    }
  }
}

// Example usage:
let root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);

breadthFirstSearch(root); // Output: 10 5 15 2 7