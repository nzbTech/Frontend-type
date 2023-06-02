<template>
    <div class="field">
        <label class="label">Catégorie</label>
        <div class="control">
            <div class="select">
                <select v-model="filters.category" @change="updateFilters">
                    <option value="">Toutes</option>
                    <option value="1">Téléphone</option>
                    <option value="2">Ordinateur</option>
                    <option value="3">Smart TV</option>
                    <!-- Ajoutez d'autres options de catégorie -->
                </select>
            </div>
        </div>
        <div class="flex">
            <div class="control">
                <label class="label">Prix Min</label>
                <input class="input" type="number" v-model="filters.minPrice" min="0">
            </div>
            <div class="control">
                <label class="label">Prix Max</label>
                <input class="input" type="number" v-model="filters.maxPrice" min="0">
            </div>
        </div>
    </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
    props: ["initialFilters"],
    data() {
        return {
            filters: this.initialFilters
        }
    },
    methods: {
        updateFilters() {
            this.$emit('filters-changed', this.filters)
        }
    },
    watch: {
    'filters.minPrice': debounce(function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('filters-changed', this.filters)
      }
    }, 500),
    'filters.maxPrice': debounce(function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('filters-changed', this.filters)
      }
    }, 500),
  },
}
</script>

<style scoped>

.field {
    padding-left: 1rem;
}
.label {
    margin-top: 1.5rem;
}
.flex {
    display: flex;
    justify-content: space-between;
}
.control {
    width: 45%;
}

</style>
