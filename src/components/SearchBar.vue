<template>
    <div class="search-container">
      <input 
        type="text" 
        class="search-input"
        placeholder="Search for answers"
        v-model="query"
        @input="handleInput"
      >
      <button class="search-button" @click="handleSearch">
        <i class="fa fa-search"> </i>
        <!-- <span class="search-icon">🔍</span> -->
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchBar',
    data() {
      return {
        query: ''
      }
    },
    methods: {
      handleInput() {
        this.$emit('search', this.query)
      },
      handleSearch() {
        this.$emit('search', this.query)
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  @import '../scss/variables.scss';
  .search-container {
    max-width: 600px;
    margin: 0 auto;
  
    /* Safari 8+ specific styles */
    @supports (display: -webkit-box) {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
    }
  }
  
  .search-input {
    width: 100%;
    padding: 12px 48px 12px 16px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    font-size: 16px;
    
    &:focus-visible {
  outline: none;
  box-shadow: none;
}
    
    /* IE 10+ specific styles */
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      min-height: 45px;
    }
  }
  
  .search-button {
    background: $green;
    border: none;
    border-radius:  0 5px 5px 0;
    padding: 12px 16px; 
   
    cursor: pointer;
    color: white;
    i{
        font-size: 20px;
    }
    
    /* IE 10+ specific styles */
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      height: 35px;
    }
  }
  
  .search-icon {
    color: white;
  }
  </style>