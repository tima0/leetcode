// Given preorder and inorder traversal of a tree, construct the binary tree.
//
// Note:
// You may assume that duplicates do not exist in the tree.
//
// For example, given
//
// preorder = [3,9,20,15,7]
// inorder = [9,3,15,20,7]
//
// Return the following binary tree:
//
//     3
//    / \
//   9  20
//     /  \
//    15   7

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *   this.val = val;
 *   this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

// preorder = (3) 9 20 15 7
// inorder = 9 (3) 15 20 7
function buildTree(preorder, inorder) {
  function build(l, r) {
    if (l > r) return null;

    const val = preorder.shift();
    const i = inorder.indexOf(val);
    const root = new TreeNode(val);

    root.l = build(l, i - 1);
    root.r = build(i + 1, r);

    return root;
  }

  return build(0, inorder.length - 1);
}
