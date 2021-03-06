Using [Jsdelivr](https://www.jsdelivr.com/features). [Article](https://zellwk.com/blog/jsdelivr/)

# Add following to test store

### Development

- Jsdelivr: https://cdn.jsdelivr.net/gh/yosgo-open-source/shopify-script-tag/jioukou-dev.js

### Production

- Jsdelivr: https://cdn.jsdelivr.net/gh/yosgo-open-source/shopify-script-tag/jioukou-prod.js

# Operate to Shopify store

Using Page API to create new page for Jioukou iframe. And add ScriptTag for store page can load script to render iframe.

### Page

### ScriptTag (GraphQL Admin API)

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

# Purge cache

https://github.com/jsdelivr/jsdelivr#purge-cache

```
curl -X POST \
  PURGE_URL/ \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
    "path": [
        "PATH_WITH_/_LEAD"
      ]
  }'
```
