<template>
    <div class="articles-list">
      <div v-if="!loading" class="articles-wrapper">
        <ArticleItem
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>
      <div v-else class="loading-state">
        Loading articles...
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ArticlesList',
    props: {
      articles: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      }
    }
  }
  </script>