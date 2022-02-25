<template>
  <div>
    <b-button class="button" variant="primary" v-b-toggle.sidebar-right>Completed task</b-button>

    <b-sidebar id="sidebar-right" title="" right shadow>
        <b-table striped :items="completedTasksList"></b-table>

        <b-button class="clearButton" variant="warning" @click="clearList">Clear</b-button>
        <b-button class="sortButton" variant="info" @click="sortList">Sort</b-button>

    </b-sidebar>
  </div>
</template>

<script>
export default {
    name: "complete-task",
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
.button{
    position: fixed;
    right: 60px;
    bottom: 40px;
}
.clearButton{
    position: absolute;
    bottom: 10px;
    left: 10px
}
.sortButton{
    position: absolute;
    bottom: 10px;
    left: 80px
}
.completedTasksList{
    margin-left: 10px;
    text-align: left;
}
</style>