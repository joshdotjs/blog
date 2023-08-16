// Tree Data Structure: 
//  - https://en.wikipedia.org/wiki/Tree_(data_structure)

// Common operations
//  - Enumerating all the items
//  - Enumerating a section of a tree
//  - Searching for an item
//  - Adding a new item at a certain position on the tree
//  - Deleting an item
//  - Pruning: Removing a whole section of a tree
//  - Grafting: Adding a whole section to a tree
//  - Finding the root for any node
//  - Finding the lowest common ancestor of two nodes

// ==============================================
// ==============================================
// ==============================================
// ==============================================

// Most straightforward way to create a tree
const node_C1 = { data: 'C1', children: [] };
const node_C2 = { data: 'C2', children: [] };
const node_C3 = { data: 'C3', children: [] };
const node_C4 = { data: 'C4', children: [] };
const node_C5 = { data: 'C5', children: [] };
const node_C6 = { data: 'C6', children: [] };

const node_B1 = { data: 'B1', children: [node_C1] };
const node_B2 = { data: 'B2', children: [node_C2, node_C3] };
const node_B3 = { data: 'B3', children: [node_C4, node_C5, node_C6] };

const node_A = { data: 'A', children: [node_B1, node_B2, node_B3] };

// ==============================================
// ==============================================
// ==============================================
// ==============================================

// Repeat with Add Operation via property dot notation:
const node__B1 = { data: '', children: [] };
node__B1['data'] = 'B1';
node__B1['children'].push(node_C1);

const node__B2 = { data: '', children: [] };
node__B2['data'] = 'B2';
node__B2['children'].push(node_C2);
node__B2['children'].push(node_C3);

const node__B3 = { data: '', children: [] };
node__B3['data'] = 'B3';
node__B3['children'].push(node_C4);
node__B3['children'].push(node_C5);
node__B3['children'].push(node_C6);

const node__A = { data: '', children: [] };
node__A['data'] = 'A';
node__A['children'].push(node__B1);
node__A['children'].push(node__B2);
node__A['children'].push(node__B3);

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export { node_A, node__A };