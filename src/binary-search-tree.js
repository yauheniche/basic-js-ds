const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
// use materials from lection https://www.youtube.com/watch?v=fnqUD4FTE5Q&list=PLP-a1IHLCS7PqDf08LFIYCiTYY1CtoAkt&index=13
// and code for lection https://github.com/ToshaBely/rs-series/blob/master/s01e12_Tree/tree.js

  constructor() {
    this.rootElem = null; 
  }

  root() {
    return this.rootElem
  }

  add(data) {
    let newNode = new Node(data);
    
    if (this.rootElem === null) {
      this.rootElem = newNode;
    } else {
      this.insertNode(this.rootElem, newNode); // helper method below
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
        if (node.left === null) {
            node.left = newNode;
        } else {
            this.insertNode(node.left, newNode);
        }
    } else {
        if (node.right === null) {
            node.right = newNode;
        } else {
            this.insertNode(node.right, newNode);
        }
    }
}

  has( data , check ) {
    return searchWithin(this.rootElem, data);

    function searchWithin(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data ? 
        searchWithin(node.left, data) : 
        searchWithin(node.right, data);
    }
  }

  find( data ) {
    if(this.has(data)) {
      return new Node(data);
    } else {
      return null
    }
  }

  remove( data ) {
    this.rootElem = removeNode(this.rootElem, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootElem) {
      return;
    }

    let node = this.rootElem;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.rootElem) {
      return;
    }

    let node = this.rootElem;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }

}