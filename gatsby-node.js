const fetch = require("node-fetch");

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, { id }) => {
  const { createNode } = actions;
  const query = await fetch(`https://api.dropinblog.com/v1/json/?b=${id}`);
  const data = await query.json();

  data.items.forEach(item => {
    const nodeMetadata = {
      id: createNodeId(`your-source-${item.uuid}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(item),
        contentDigest: createContentDigest(item)
      }
    };

    const node = Object.assign({}, item, nodeMetadata);
    createNode(node);
  });

  return;
};

// const axios = require("axios")

// // * Because DropInBlog delivers everything in an array (data) inside a single object, like authors or categories, we're not able to use any of the goodies that Gatsby gives us, like filter.
// // * To get around this we have to remap the data array onto a custom type.

// const NODE_TYPE = `YourSourceItem`

// exports.sourceNodes = async function sourceNodes(
//   { actions, createContentDigest, createNodeId },
//   { id }
// ) {
//   const { createNode } = actions

//   const { data } = await axios.get(`https://api.dropinblog.com/v1/json/?b=${id}`)

// data.items.forEach(item => {
//   const nodeMetadata = {
//     id: createNodeId(`your-source-${item.uuid}`),
//     parent: null,
//     children: [],
//     internal: {
//       type: NODE_TYPE,
//       content: JSON.stringify(item),
//       contentDigest: createContentDigest(item),
//     },
//   }

//   const node = Object.assign({}, item, nodeMetadata)
//   createNode(node)
//   })
// }

// // exports.createSchemaCustomization = ({ actions, schema }) => {
// //     const { createTypes } = actions

// //     const returnItem = async (source, ctx, item, arr, nestedArr) => {
// //         const parent = await ctx.nodeModel.getNodeById({ id: source.parent })

// //         if (nestedArr) return parent.posts[source.place][item].map(edge => edge)
// //         else return parent[arr][source.place][item]
// //     }

// //     // * Authors
// //     createTypes([`
// //         interface Authors @nodeInterface {
// //             id: ID!
// //             name: String
// //             slug: String
// //             photo: String
// //         }
// //     `,
// //         schema.buildObjectType({
// //             name: 'dibAuthors',
// //             interfaces: ['Node', 'Authors'],
// //             fields: {
// //                 id: 'ID!',
// //                 name: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'name', 'data')
// //                 },
// //                 slug: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'slug', 'data')
// //                 },
// //                 photo: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'photo', 'data')
// //                 }
// //             }
// //         })
// //     ])

// //     // * Categories/Tabs
// //     createTypes([`
// //         interface Categories @nodeInterface {
// //             id: ID!
// //             title: String
// //             slug: String
// //         }
// //     `,
// //         schema.buildObjectType({
// //             name: 'dibCategories',
// //             interfaces: ['Node', 'Categories'],
// //             fields: {
// //                 id: 'ID!',
// //                 title: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'title', 'data')
// //                 },
// //                 slug: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'slug', 'data')
// //                 }
// //             }
// //         })
// //     ])

// //     // * Posts
// //     createTypes([`
// //         type categoryData {
// //             title: String
// //             slug: String
// //         }

// //         type authorData {
// //             name: String
// //             slug: String
// //             photo: String
// //         }

// //         interface Posts @nodeInterface {
// //             id: ID!
// //             title: String
// //             slug: String
// //             summary: String
// //             content: String
// //             featuredImage: String
// //             publishedAt: String
// //             updatedAt: String
// //             categories: [categoryData!]
// //             author: authorData
// //             readTime: String
// //         }
// //     `,
// //         schema.buildObjectType({
// //             name: 'dibPosts',
// //             interfaces: ['Node', 'Posts'],
// //             fields: {
// //                 id: 'ID!',
// //                 title: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'title', 'posts')
// //                 },
// //                 slug: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'slug', 'posts')
// //                 },
// //                 summary: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'summary', 'posts')
// //                 },
// //                 content: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'content', 'posts')
// //                 },
// //                 featuredImage: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'featuredImage', 'posts')
// //                 },
// //                 publishedAt: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'publishedAt', 'posts')
// //                 },
// //                 updatedAt: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'updatedAt', 'posts')
// //                 },
// //                 categories: {
// //                     type: '[categoryData!]',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'categories', 'posts', true)
// //                 },
// //                 author: {
// //                     type: 'authorData',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'author', 'posts')
// //                 },
// //                 readTime: {
// //                     type: 'String',
// //                     resolve: async (source, args, ctx, info) => returnItem(source, ctx, 'readtime', 'posts')
// //                 },
// //             }
// //         })
// //     ])
// // }

// // exports.onCreateNode = ({ node, actions, createNodeId }) => {
// //     const { createNode } = actions

// //     //  * For Every item in data we'll create a new node, give it an index, then use that index to return the correct item from data.
// //     const remapNode = (name, node, arr) => {
// //         for (let i = 0; i < arr.length; i++) {
// //             createNode({
// //                 id: createNodeId(`dib${name}-${node.id + i}`),
// //                 parent: node.id,
// //                 place: i,
// //                 internal: {
// //                     type: `dib${name}`,
// //                     contentDigest: node.internal.contentDigest
// //                 }
// //             })
// //         }
// //     }

// //     if (node.internal.type === 'authors') remapNode('Authors', node, node.data)
// //     if (node.internal.type === 'categories') remapNode('Categories', node, node.data)
// //     if (node.internal.type === 'data') remapNode('Posts', node, node.posts)
// // }