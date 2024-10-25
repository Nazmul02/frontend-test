<template>
  <div>
    <div class="hero">
      <search-bar @search="handleSearch" />
    </div>


    <!-- Main Content -->
    <div class="main">
      <div class="articles">
        <div class="container">
          <nav class="breadcrumb">
            <router-link to="/" class="breadcrumb-link">All categories</router-link>
            <span class="breadcrumb-separator">›</span>
            <span class="breadcrumb-current">Getting started</span>
          </nav>

          <div class="content-grid">
            <!-- Category Card -->
            <div>
              <div class="category-card">
                <div class="body">
                  <div class="category-icon">
                    <i class="fa fa-play-circle" aria-hidden="true"></i>
                   <div class="category-count ">
                    <i class="fa fa-file-text-o" aria-hidden="true"></i>
                    <span>
                      {{ articles.length }}
                    </span>
                   </div>
                    
                  </div>
                  <h3>Getting started</h3>
                  <p class="update-text">Updated {{ formatDate(category.updatedOn) }}</p>
                </div>
                <div class='footer'>
                  <i class="fa fa-info-circle"></i>
                  <p class="description">{{ category.description }}</p>
                </div>
              </div>
            </div>

            <!-- Articles List -->
            <div class="articles-list">
              <div v-if="!loading" class="articles-wrapper">
                <router-link v-for="article in publishedArticles" :key="article.id" :to="`/article/${article.id}`"
                  class="article-item">
                  <i :class="['fa', `fa-${article.icon}`]"></i>
                  <div class="article-content">
                    <h4>{{ article.title }}</h4>
                    <p>Updated {{ formatDate(article.updatedOn) }}</p>
                  </div>
                  <i class="fas fa-chevron-right article-arrow"></i>
                </router-link>
              </div>
              <div v-else class="loading-state">
                Loading articles...
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="categories">
        <h2>Other categories</h2>

        <div class="container">
        <div class="categories-slider-container">
          <button class="slider-button slider-prev" @click="slideLeft" :disabled="sliderPosition === 0">
            <i class="fas fa-chevron-left"></i>
          </button>

          <div class="categories-slider-wrapper">
            <div class="categories-slider" ref="categoriesSlider"
              :style="{ transform: `translateX(-${sliderPosition * 100}%)` }">
              <!-- <div v-for="category in otherCategories" :key="category.id" class="category-slide">
                <i :class="[category.icon || 'fas fa-comments']"></i>
                <h3>{{ category.title }}</h3>
                <p class="article-count">{{ category.articleCount || '9' }} articles</p>
                <p class="update-date">Last update {{ formatDate(category.updatedOn) }}</p>
              </div> -->

              <category-card 
        v-for="category in otherCategories" 
        v-if="category.enabled"
        :key="category.id" 
        :category="category"
        class="w-300"
      />
            </div>
          </div>

          <button class="slider-button slider-next" @click="slideRight" :disabled="sliderPosition >= maxSliderPosition">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
import SearchBar from '../components/SearchBar.vue'
import CategoryCard from '../components/CategoryCard.vue'

export default {
  name: 'CategoryView',
  components: {
    SearchBar,
    CategoryCard
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      category: {},
      articles: [],
      loading: true,
      otherCategories: [],
      searchQuery: '',
      sliderPosition: 0
    }
  },
  computed: {
    publishedArticles() {
      let filtered = this.articles.filter(article => article.status === 'published')
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase().trim()
        filtered = filtered.filter(article => {
          const title = (article.title || '').toLowerCase()
          const description = (article.description || '').toLowerCase()
          return title.includes(query) || description.includes(query)
        })
      }
      return filtered
    },
    maxSliderPosition() {
      return Math.max(0, Math.ceil(this.otherCategories.length / 3) - 1)
    }
  },
  methods: {
    formatDate(date) {
      const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
      return `${days} days ago`;
    },
    async fetchCategoryData() {
      try {
        const [categoryResponse, articlesResponse] = await Promise.all([
          axios.get('http://localhost:9000/api/categories'),
          axios.get(`http://localhost:9000/api/category/${this.id}`)
        ])

        this.category = categoryResponse.data.find(cat => cat.id === this.id) || {}
        this.articles = articlesResponse.data
        this.otherCategories = categoryResponse.data
          .filter(cat => cat.id !== this.id && cat.enabled)
          .sort((a, b) => (a.order || 0) - (b.order || 0))
      } catch (error) {
        console.error('Error fetching category data:', error)
      } finally {
        this.loading = false
      }
    },
    slideLeft() {
      if (this.sliderPosition > 0) {
        this.sliderPosition--
      }
    },
    slideRight() {
      if (this.sliderPosition < this.maxSliderPosition) {
        this.sliderPosition++
      }
    },
    handleSearch(query) {
      this.searchQuery = query
    }
  },
  created() {
    this.fetchCategoryData()
  },
  watch: {
    id: {
      handler: 'fetchCategoryData',
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.articles {
  border-bottom: 1px solid #ededed;
}
.categories{
text-align: center;
color: $text-black;
}


.main {
  width: 100%;
  background: #9c9aa617;
  font-family: $font-family;
  margin-top: 30px;
  padding-bottom: 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.breadcrumb {
  padding: 20px 0;
  font-size: 14px;

  &-link {
    color: $green;
    text-decoration: none;

    &:hover {
      color: darken($green, 10%);
    }
  }

  &-separator {
    margin: 0 10px;
    color: $text-gray;
  }

  &-current {
    color: $text-gray;
  }
}

// Content Grid
.content-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  padding-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}


.category-card {

  background: white;
  text-align: center;

  .body,
  .footer {
    padding: 20px;
  }

  .body {
    border-bottom: 1px solid #ddd;
  }

  .category-icon {
    position: relative;
    margin-bottom: 1rem;

    i {
      font-size: 3rem;
      color: $green;
    }

    .category-count {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      color: $text-gray;
     
     & i {
        right: 20px;
        top: 3px;
        color: $green;
      }
    }
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 5px;
    padding: 0;
  }

  p.update-text {
    font-size: 13px;
    color: $text-gray;
    margin: 0;
    padding: 0;
  }

  i {
    color: $green;
    font-size: 22px;
  }

  .description {
    color: $text-gray;
    font-size: 13px;
    line-height: 1.5;
  }
}

// Articles List
.articles-list {
  .article-item {
    background: white;
    display: flex;
    align-items: center;
    padding: 30px 24px;
    text-decoration: none;
    margin-bottom: 0.75rem;

    i {
      color: $green;
      font-size: 22px;
      margin-right: 16px;
    }

    .article-content {
      flex: 1;

      h4 {
        color: $text-black;
        font-size: 16px;
        margin-bottom: 0.25rem;
        margin-top: 0;
      }

      p {
        color: $text-gray;
        font-size: 0.875rem;
        margin: 0;
      }
    }

    .article-arrow {
      color: $green;
      font-size: 0.875rem;
    }
  }
}

// Other Categories Section
.other-categories {
  padding: 4rem 0;

  h2 {
    font-size: 1.25rem;
    color: $text-gray;
    margin-bottom: 2rem;
  }
}
.w-300{
  min-width: 300px;
}

.categories-slider-container {
  position: relative;
  padding: 0 3rem;
}

.categories-slider-wrapper {
  overflow: hidden;
}

.categories-slider {
  display: flex;
  gap: 20px;
  flex-wrap: nowrap;
}


.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.slider-prev {
    left: 0;
  }

  &.slider-next {
    right: 0;
  }

  i {
    color: $text-gray;
  }
}

</style>