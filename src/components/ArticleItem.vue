<template>
    <router-link
      :to="`/article/${article.id}`"
      class="article-item"
    >
      <i class="far fa-file-alt article-icon"></i>
      <div class="article-content">
        <h4>{{ article.title }}</h4>
        <p>Updated {{ formatDate(article.updatedOn) }}</p>
      </div>
      <i class="fas fa-chevron-right article-arrow"></i>
    </router-link>
  </template>
  
  <script>
  import { formatDate } from '../utils/dateFormatter'
  
  export default {
    name: 'ArticleItem',
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    methods: {
      formatDate
    }
  }
  </script>