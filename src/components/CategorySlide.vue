<template>
    <div class="category-slide">
      <i :class="[category.icon || 'fas fa-comments']"></i>
      <h3>{{ category.title }}</h3>
      <p class="article-count">{{ category.articleCount || '9' }} articles</p>
      <p class="update-date">Last update {{ formatDate(category.updatedOn) }}</p>
    </div>
  </template>
  
  <script>
  import { formatDate } from '../utils/dateFormatter'
  
  export default {
    name: 'CategorySlide',
    props: {
      category: {
        type: Object,
        required: true
      }
    },
    methods: {
      formatDate
    }
  }
  </script>
  
  // utils/dateFormatter.js
  export const formatDate = (date) => {
    if (!date) return ''
    const now = new Date()
    const articleDate = new Date(date)
    const diffDays = Math.floor((now - articleDate) / (1000 * 60 * 60 * 24))
    
    if (diffDays < 1) return 'today'
    if (diffDays < 7) return `${diffDays} days ago`
    
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }