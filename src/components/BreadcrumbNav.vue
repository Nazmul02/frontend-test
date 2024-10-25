<template>
    <nav class="breadcrumb">
      <router-link to="/" class="breadcrumb-link">All categories</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-current">{{ current }}</span>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'BreadcrumbNav',
    props: {
      current: {
        type: String,
        required: true
      }
    }
  }
  </script>