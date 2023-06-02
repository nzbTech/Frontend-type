<template>
    <div class="field">
        <label class="label">Catégorie</label>
        <div class="control">
            <div class="select">
                <select v-model="filters.category" @change="updateFilters">
                    <option value="">Toutes</option>
                    <option value="1">Catégorie 1</option>
                    <option value="2">Catégorie 2</option>
                    <!-- Ajoutez d'autres options de catégorie -->
                </select>
            </div>
        </div>
        <label class="label">Prix</label>
        <div class="control">
            <!-- <input type="range" v-model="filters.priceRange" @input="updateFilters" min="0" max="100" step="1"> -->
        </div>
    </div>
</template>

<script>
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
    }
}
</script>
