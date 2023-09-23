// Create a class called TreeNode that represents a node in a binary tree.
class TreeNode {
    constructor(value) {
        this.value = value; // Value of the node
        this.left = null; // Left child node
        this.right = null; // Right child node
    }
}

// Serialize a binary tree into a comma-separated string representation.
function serialize(root) {
    if (root === null) {
        return "None"; // If the root is null, return "None".
    }

    let serializedString = `${root.value},`; // Start with the value of the root node.

    serializedString += serialize(root.left) + ","; // Add the serialized left subtree.
    serializedString += serialize(root.right); // Add the serialized right subtree.

    return serializedString;
}

// Deserialize a comma-separated string into a binary tree.
function deserialize(serializedString) {
    const values = serializedString.split(','); // Split the string by comma to get an array of values.

    // Recursive helper function to build the binary tree.
    function buildTree() {
        let value = values.shift(); // Take the first value from the array.
        if (value === "None") {
            return null; // If the value is "None", return null.
        }

        const node = new TreeNode(parseInt(value)); // Create a new node with the parsed integer value.
        node.left = buildTree(); // Build the left subtree recursively.
        node.right = buildTree(); // Build the right subtree recursively.
        return node; // Return the constructed node.
    }

    if (!serializedString || values.length === 0) {
        return null; // If the input string is empty or there are no values, return null.
    }

    return buildTree(); // Build and return the binary tree.
}

// Perform preorder traversal on a binary tree and return an array of node values.
function preorderTraversal(node) {
    if (node === null) {
        return []; // If the node is null, return an empty array.
    }

    const result = [node.value]; // Start with the value of the current node.
    result.push(...preorderTraversal(node.left)); // Add the values from the left subtree.
    result.push(...preorderTraversal(node.right)); // Add the values from the right subtree.
    return result;
}

// Perform inorder traversal on a binary tree and return an array of node values.
function inorderTraversal(node) {
    if (node === null) {
        return []; // If the node is null, return an empty array.
    }

    const result = [...inorderTraversal(node.left)]; // Add the values from the left subtree.
    result.push(node.value); // Add the value of the current node.
    result.push(...inorderTraversal(node.right)); // Add the values from the right subtree.
    return result;
}

// Perform postorder traversal on a binary tree and return an array of node values.
function postorderTraversal(node) {
    if (node === null) {
        return []; // If the node is null, return an empty array.
    }

    const result = [...postorderTraversal(node.left)]; // Add the values from the left subtree.
    result.push(...postorderTraversal(node.right)); // Add the values from the right subtree.
    result.push(node.value); // Add the value of the current node.
    return result;
}

// Search for a value in a binary tree
function searchValue(node, value) {
    if (node === null) {
        return false; // If the node is null, the value cannot be found.
    }

    if (node.value === value) {
        return true; // If the value matches the value of the current node, return true.
    }

    return searchValue(node.left, value) || searchValue(node.right, value); // Recursively search in the left and right subtrees.
}

// Check if a binary tree is balanced
function isBalanced(node) {
    if (node === null) {
        return true; // An empty tree is always balanced.
    }

    const leftHeight = getHeight(node.left); // Get the height of the left subtree.
    const rightHeight = getHeight(node.right); // Get the height of the right subtree.

    const heightDiff = Math.abs(leftHeight - rightHeight); // Calculate the absolute difference in heights.

    return heightDiff <= 1 && isBalanced(node.left) && isBalanced(node.right); // Check if the height difference is less than or equal to 1 and both subtrees are balanced.
}

// Get the height of a binary tree
function getHeight(node) {
    if (node === null) {
        return 0; // The height of an empty tree is 0.
    }

    return 1 + Math.max(getHeight(node.left), getHeight(node.right)); // The height of a non-empty tree is 1 plus the maximum height of its subtrees.
}

// Count the number of nodes in a binary tree
function countNodes(node) {
    if (node === null) {
        return 0; // The number of nodes in an empty tree is 0.
    }

    return 1 + countNodes(node.left) + countNodes(node.right); // The number of nodes in a non-empty tree is 1 plus the number of nodes in its left and right subtrees.
}

// Test the code

// Create a binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(5);

// Serialize the binary tree
const serializedTree = serialize(root);
console.log("Serialized Tree:", serializedTree);

// Deserialize the serialized string into a binary tree
const deserializedTree = deserialize(serializedTree);
console.log("Deserialized Tree:", deserializedTree);

// Perform preorder traversal on the binary tree
const preorder = preorderTraversal(deserializedTree);
console.log("Pre-order Traversal:", preorder);

// Perform inorder traversal on the binary tree
const inorder = inorderTraversal(deserializedTree);
console.log("In-order Traversal:", inorder);

// Perform postorder traversal on the binary tree
const postorder = postorderTraversal(deserializedTree);
console.log("Post-order Traversal:", postorder);

// Example usages of other functions

// Count the number of nodes in the binary tree
const nodeCount = countNodes(deserializedTree);
console.log("Node Count:", nodeCount);

// Check if the binary tree is balanced
const isTreeBalanced = isBalanced(deserializedTree);
console.log("Is Tree Balanced:", isTreeBalanced); // Output: true or false

// Search for a value in the binary tree
const searchResult = searchValue(deserializedTree, 3);
console.log("Search Result:", searchResult); // Output: true
