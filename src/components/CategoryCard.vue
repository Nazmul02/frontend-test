  <template>
    <router-link :to="{ name: 'CategoryView', params: { id: category.id } }" class="category-card">
      <div>

        <div class="icon-wrapper">
          <i :class="['fa', `fa-${category.icon}`]"></i>
        </div>
        <h3>{{ category.title }}</h3>
        <p class="green">{{ category.totalArticle }} articles</p>
        <p class="update-text ">Last update {{ formatDate(category.updatedOn) }}</p>
      </div>
    </router-link>
  </template>

<script>

export default {
  name: 'CategoryCard',

  props: {
    category: {
      type: Object,
    }
  },
  methods: {
    formatDate(date) {
      const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
      return `${days} days ago`;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.category-card {
  text-decoration: none;
  background: white;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  font-family: $font-family;
  border: 1px solid #9c9aa636;


  /* IE 10+ specific styles */
  @media all and (-ms-high-contrast: none),
  (-ms-high-contrast: active) {
    display: inline-block;
    width: calc(33.33% - 24px);
    margin: 12px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 16px 0 14px;
    color: #333;
  }

  p {
    padding: 0;
    margin: 0;
  }

  .green {
    color: $green;

  }

}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;

  margin-bottom: 16px;

  i {
    color: #00c853;
    font-size: 45px;

  }
}


.update-text {
  font-size: 0.875em;
  color: $text-gray;
}
</style>