Using [Jsdelivr](https://www.jsdelivr.com/features). [Article](https://zellwk.com/blog/jsdelivr/)

### Add following to test store

- Jsdelivr: https://cdn.jsdelivr.net/gh/yosgo-open-source/shopify-script-tag@0.0.1/jioukou-dev.js
- Store website example: https://yosgo-store.myshopify.com/pages/group-buy?groupId=8HHrxzPCB

### Add following to production store

- Jsdelivr: https://cdn.jsdelivr.net/gh/yosgo-open-source/shopify-script-tag@0.0.1/jioukou.js

### Add, Update gql

```
query {
  scriptTags(first: 10) {
    edges {
      node {
        id
        src
        displayScope
      }
    }
  }
}

mutation {
  scriptTagCreate(input: {
    src: "https://cdn.jsdelivr.net/gh/yosgo-open-source/shopify-script-tag@0.0.2/jioukou-dev.js"
    displayScope: ONLINE_STORE
  }) {
    scriptTag {
      id
      src
      updatedAt
    }
  }
}

mutation {
  scriptTagUpdate(
    id: "gid://shopify/ScriptTag/53353939021"
    input: {
    	src: "https://cdn.jsdelivr.net/gh/yosgo-open-source/shopify-script-tag@0.0.3/jioukou-dev.js"
  }
  ) {
    scriptTag {
      id
      src
      updatedAt
    }
  }
}
```
