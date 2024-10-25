<template>
    <section class="other-categories">
      <div class="container">
        <h2>Other categories</h2>
        <div class="categories-slider-container">
          <button 
            class="slider-button slider-prev" 
            @click="slideLeft"
            :disabled="sliderPosition === 0"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
  
          <div class="categories-slider-wrapper">
            <div 
              class="categories-slider" 
              ref="categoriesSlider"
              :style="sliderStyle"
            >
              <CategorySlide
                v-for="category in categories"
                :key="category.id"
                :category="category"
              />
            </div>
          </div>
  
          <button 
            class="slider-button slider-next" 
            @click="slideRight"
            :disabled="sliderPosition >= maxSliderPosition"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'CategoriesSlider',
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        sliderPosition: 0
      }
    },
    computed: {
      maxSliderPosition() {
        return Math.max(0, Math.ceil(this.categories.length / 3) - 1)
      },
      sliderStyle() {
        return {
          transform: `translateX(-${this.sliderPosition * 100}%)`,
          '-ms-transform': `translateX(-${this.sliderPosition * 100}%)`,
          '-webkit-transform': `translateX(-${this.sliderPosition * 100}%)`
        }
      }
    },
    methods: {
      slideLeft() {
        if (this.sliderPosition > 0) {
          this.sliderPosition--
        }
      },
      slideRight() {
        if (this.sliderPosition < this.maxSliderPosition) {
          this.sliderPosition++
        }
      }
    }
  }
  </script>