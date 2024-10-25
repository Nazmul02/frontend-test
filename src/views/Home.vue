<template>
  <div>
    <div class="hero">
      <search-bar @search="handleSearch" />
    </div>
    <div class="main">
      <div class="categories-grid" v-if="!loading">
      <category-card 
        v-for="category in sortedCategories" 
        v-if="category.enabled"
        :key="category.id" 
        :category="category"
      />
    </div>
    <div v-else class="loading">Loading...</div>
    </div>
   
  </div>
</template>

<script>
import axios from 'axios'
import SearchBar from '../components/SearchBar.vue'
import CategoryCard from '../components/CategoryCard.vue'

export default {
  name: 'Home',
  components: {
    SearchBar,
    CategoryCard
  },
  data() {
    return {
      categories: [],
      loading: true,
      searchQuery: ''
    }
  },
  computed: {
    sortedCategories() {
      return this.categories
        .filter(category => category.enabled)
        .sort((a, b) => a.order - b.order)
        .filter(category => 
          category.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          category.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:9000/api/categories')
        this.categories = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        this.loading = false
      }
    },
    handleSearch(query) {
      this.searchQuery = query
    }
  },
  created() {
    this.fetchCategories()
  }
}
</script>

<style lang="scss" scoped>

  @import '../scss/variables.scss';

.hero {
  text-align: center;
  margin-bottom: 60px;
}

.hero h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 16px;
}

.hero p {
  color: #666;
  margin-bottom: 32px;
}
.main{
  width: 100%;
  height: 100%;
  background: #9c9aa617;
  padding-bottom: 40px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
 
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>