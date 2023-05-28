<template>
  <nav class="pagination is-small is-centered" role="navigation" aria-label="pagination">
    <a class="pagination-previous" :class="{ 'is-disabled': currentPage === 1 }" @click="prevPage">Précédent</a>
    <a class="pagination-next" :class="{ 'is-disabled': currentPage === totalPages }" @click="nextPage">Suivant</a>
    <ul class="pagination-list">
      <li v-for="page in displayedPages" :key="page">
        <template v-if="typeof page === 'number'">
          <a class="pagination-link" :class="{ 'is-current': page === currentPage }" @click="gotoPage(page)">
            {{ page }}
          </a>
        </template>
        <template v-else>
          <span class="pagination-ellipsis">&hellip;</span>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script>
import GenericMixin from '@/mixins/GenericMixin.js'
export default {
  mixins: [GenericMixin],
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true
    },
    serviceProps: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      test: ''
    }
  },
  created() {
  },
  computed: {
    displayedPages() {
      const pages = [];
      if (this.totalPages <= 5) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (this.currentPage <= 2) {
          pages.push(1, 2, 3, '...', this.totalPages);
        } else if (this.currentPage >= this.totalPages - 1) {
          pages.push(1, '...', this.totalPages - 2, this.totalPages - 1, this.totalPages);
        } else {
          pages.push(1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
        }
      }
      return pages;
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('update-page', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update-page', this.currentPage + 1);
      }
    },
    gotoPage(page) {
      if (typeof page === 'number') {
        this.$emit('update-page', page);
      }
    }
  }
};
</script>

<style>
/* Styles Bulma */
.is-disabled {
  pointer-events: none;
  opacity: 0.5;
}
.pagination-link.is-current {
    background-color: #00d1b2;
    border-color: #00d1b2;
    color: inherit;
}
/* .pagination-previous {
  order: 1;
}
.pagination-list {
  justify-content: inherit;
  flex-wrap: inherit;
}
.pagination {
  width: 50%;
} */
</style>
