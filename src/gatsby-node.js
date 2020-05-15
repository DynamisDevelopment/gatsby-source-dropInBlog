const fetch = require("node-fetch")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { id }
) => {
  const { createNode } = actions
  const query = await fetch(`https://api.dropinblog.com/v1/json/?b=${id}`)
  const data = await query.json()

  data.data.posts.forEach((post) => {
    console.log(post)
    const nodeMetadata = {
      id: createNodeId(`post-${post.slug}`),
      parent: null,
      children: [],
      internal: {
        type: "DIB_POSTS",
        content: JSON.stringify(post),
        contentDigest: createContentDigest(post),
      },
    }

    const node = Object.assign({}, post, nodeMetadata)
    createNode(node)
  })

  return
}
