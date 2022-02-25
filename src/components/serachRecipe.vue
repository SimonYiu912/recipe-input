<template>
    <div class="form" @keyup.enter="searchData">
        <b-form-input class="input" v-model="searchID" placeholder="Enter ID"></b-form-input>
        OR
        <b-form-input class="input" v-model="searchName" placeholder="Enter recipe name"></b-form-input>
        <b-form-select v-model="searchMC">
            <option disabled value="">Select Machine type</option>
            <option>mc1</option>
            <option>mc2</option>
        </b-form-select>
        <b-button class="search" variant="danger" @click="searchData">Search</b-button>
        <b-button class="search" variant="warning" @click="clearInput">Clear</b-button>
    </div>
</template>

<script>
export default {
    name: "search-recipe",
    data() {
        return{
        }
    },
    methods: {
        clearList(){
            return this.$store.commit("clearList")
        },
        sortList(){
            return this.$store.commit("sortList")
        }
    },
    computed: {
        completedTasksList(){
            return this.$store.state.completedTasksList
        }
    }
}
</script>

<style>
</style>