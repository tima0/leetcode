// Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.
//
// Example 1:
//
// Input:
//   [
//     [1,1,1],
//     [1,0,1],
//     [1,1,1]
//   ]
// Output:
//   [
//     [1,0,1],
//     [0,0,0],
//     [1,0,1]
//   ]
//
// Example 2:
//
// Input:
//   [
//     [0,1,2,0],
//     [3,4,5,2],
//     [1,3,1,5]
//   ]
// Output:
//   [
//     [0,0,0,0],
//     [0,4,5,0],
//     [0,3,1,0]
//   ]
//
// Follow up:
//
//   A straight forward solution using O(mn) space is probably a bad idea.
//   A simple improvement uses O(m + n) space, but still not the best solution.
//   Could you devise a constant space solution?

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

/** 1) Hacking solution, set to -0 */
// https://leetcode.com/problems/set-matrix-zeroes/discuss/26047/Quiet-simple-answer-'hacking'-with-javascript
//
// Background
// 0 === -0          true
// Object.is(-0, 0)  false
//
// 0 && 0     0
// 0 && -0    0
// -0 && 0   -0
// -0 && -0  -0
function setZeroes1(matrix) {
  const height = matrix.length;
  const width = matrix[0].length;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (!Object.is(matrix[i][j], 0)) continue;

      for (let x = 0; x < height; x++) matrix[x][j] = matrix[x][j] && -0;
      for (let y = 0; y < width; y++) matrix[i][y] = matrix[i][y] && -0;
    }
  }
}

/** 2) Use first row and col to store states */
// https://leetcode.com/problems/set-matrix-zeroes/discuss/26014/Any-shorter-O(1)-space-solution
//
// Idea
// Store states of each row in the first of that row, and store states of each col in the first of that col
// Since the state of row[0] and the state of col[0] would occupy the same cell, let it be the state of row0, and use another variable col0 for col[0]
//
// In the first phase, use matrix elements to set states in a top-down way
// In the second phase, use states to set matrix elements in a bottom-up way
function setZeroes(matrix) {
  const height = matrix.length;
  const width = matrix[0].length;

  let col0 = 1;

  for (let i = 0; i < height; i++) {
    if (matrix[i][0] === 0) col0 = 0;

    for (let j = 1; j < width; j++) {
      if (matrix[i][j] === 0) matrix[i][0] = matrix[0][j] = 0;
    }
  }

  for (let i = height - 1; i >= 0; i--) {
    for (let j = width - 1; j >= 1; j--) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;
    }

    if (col0 === 0) matrix[i][0] = 0;
  }
}
