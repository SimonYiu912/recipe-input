<template>
  <div class="translator">
    <div class="form" @keyup.enter="searchData">
        <b-form-select v-model="searchLanguage">
            <option disabled value="">Select Languages</option>
            <option>EN</option>
            <option>DE</option>
            <option>FR</option>
            <option>IT</option>
            <option>DE</option>
        </b-form-select>

        <b-form-input class="input" v-model="searchID" placeholder="Enter ID"></b-form-input>
        OR
        <b-form-input class="input" v-model="searchName" placeholder="Enter recipe name"></b-form-input>
        <b-form-select v-if="searchName" v-model="searchMC">
            <option disabled value="">Select Machine type</option>
            <option>mc1</option>
            <option>mc2</option>
        </b-form-select>

        <b-button class="search" variant="danger" @click="searchData">Search</b-button>
        <b-button class="search" variant="warning" @click="clearInput">Clear</b-button>
    </div>
    
    <div class="result" v-if="isFound">
        <div>
            <h5>
                You may want to find: 
                <span class="answer" v-for="result in result" :key="result.id">
                    {{ result.name }} ({{ result.originID }}),
                </span>
            </h5>
        </div>
        <br>
        Recipe Title: <span class="answer">{{ recipeOutput.name }}</span>
        <br><br>
        Recipe ID: <span class="answer">{{ recipeOutput.id }}</span>
        <br><br>
        Language: <span class="answer">{{ recipeOutput.language }}</span>
        <br><br>
        Machine Type: <span class="answer">{{ recipeOutput.machineType }}</span>
        <br><br>
        Difficulty level: <span class="answer">{{ recipeOutput.complexity }}</span>
        <br><br>
        Nutrients (Per Serving):
        <br>
        <div class="answer" v-for="nutrients in recipeOutput.nutrients" :key="nutrients.id">
            <div v-if="nutrients.type !== 'joules'">{{ nutrients.type }}: {{ nutrients.amount }} {{ nutrients.unit }}</div>
        </div>
        <br>
        Category:
        <br>
        <div class="answer" v-for="tags in recipeOutput.tags" :key="tags.id">
            {{ tags.name }}
        </div>
        <br>
        Cover Photo: <a :href="recipeOutput.image">{{ recipeOutput.image }}</a>
        <br><br>
        <div>
            Serving sizes:
            <span class="answer">{{ recipeOutput.yield }} {{ recipeOutput.yieldUnit }}</span>
        </div>
        <br>
        Preparation Time: 
        <span class="answer" v-if="recipeOutput.duration >= 60">{{ Math.floor(recipeOutput.duration/60) }}hr {{ recipeOutput.duration%60 }}min</span>
        <span class="answer" v-else>{{ recipeOutput.duration }}min</span>

        Ready In Time: 
        <span class="answer" v-if="recipeOutput.durationTotal >= 60">{{ Math.floor(recipeOutput.durationTotal/60) }}hr {{ recipeOutput.durationTotal%60 }}min ~ {{ recipeOutput.durationTotal }}min</span>
        <span class="answer" v-else>{{ recipeOutput.durationTotal }}min</span>

        <br><br>
        General Ingredients:
        <br>
        <div class="answer" v-for="(ingredientsBases, i) in recipeOutput.ingredientsBases" :key="ingredientsBases.id">
            <span v-if="ingredientsBases.name"><p style="color: #2c3e50; display: inline">Ingredient group name:</p> {{ ingredientsBases.name }}</span> 
            <div>
              <div class="answer" v-for="ingredients in recipeOutput.ingredientsBases[i].ingredients" :key="ingredients.id">
                {{ ingredients.name }} <span v-if="ingredients.amount">: {{ ingredients.amount }} {{ ingredients.unit }}</span>
              </div>
            </div>
            <br>
        </div>
        Instruction: 
        <br>
        <div class="answer" v-for="instructions in recipeOutput.instructions" :key="instructions.id">
            {{ instructions }}
            <br><br>
        </div>
        Steps:
        <br>
        <div v-for="(step, i) in recipeOutput.steps" :key="step.id">
            Step{{i+1}}: 
                <span class="answer" v-if="step.text != ''">{{ step.text }}</span>
                <span class="answer" v-else>{{ modeName }}</span>
            <br>
                <span v-if="step.mode != 'instruction'">

                    <div>
                    Mode: 
                    <span class="answer">
                    {{ step.mode }}
                    </span>

                    <div>
                    <span v-if="step.mode == 'scale'">
                        Weight: <span class="answer">{{ step.machineValues.weight }}g</span>
                    </span>
                    <div v-else>
                        Rotation: <span class="answer">{{ step.machineValues.reverse }}</span>
                        Speed: <span class="answer">{{ step.machineValues.speed }}</span>
                        Temperature: <span class="answer">{{ step.machineValues.temp }}°C</span>
                        Time: 
                        <span class="answer" v-if="step.machineValues.time >= 60">{{ Math.floor(step.machineValues.time/60) }}min {{ step.machineValues.time%60 }}s ~ {{ step.machineValues.time }}s</span>
                        <span class="answer" v-else>{{ step.machineValues.time }}s</span>
                    </div>
                    </div>

                    </div>
                </span>
            <br>
        </div>
        <!-- <b-button variant="danger" @click="addToList">Done</b-button> -->
    </div>

    <div class="notFound" v-else>
        Result Not Found
    </div>

    <!-- <completedTask :completedTasksList="completedTasksList" /> -->
  </div>
</template>

<script>
// import completedTask from './completedTask.vue'

export default {
    components: {
        // completedTask,
    },
    name: 'recipe-translator',
    props: {
    },
    data(){
        return{
            completedTasksList: [],
            result: null,
            isFound: false,
            searchLanguage: "",
            searchMC: null,
            searchName: "",
            searchID: null,
            recipeOutput: {
                name: "",
                id: "",
                language: "",
                machineType: "",
                complexity: "",
                instructions: "",
                language: "",
                ingredientsBases: "",
                duration: "",
                durationTotal: "",
                unit: "",
                guidedCooking: "",
                nutrients: "",
                tags: "",
                steps: "",
                yield: "",
                yieldUnit: "",
                image: ""
            },
        }
    },
    methods: {
        searchData(){
            let searchOriginID = this.searchID + this.searchLanguage;

            let result = this.recipeInput.filter(recipe => recipe.originID == searchOriginID
                                                            || (recipe.name.replace(/-/g," ").replace(/#/g,"").slice(0, this.searchName.length).toLowerCase() == this.searchName.toLowerCase()
                                                            && recipe.machineType == this.searchMC));
            this.result = result
            if(result.length !== 0){
                this.isFound = true;
                result = result[0]
                let steps = result.guidedCooking.steps
                let imageName = result.imageName.replace(result.imageName.substring(
                                    result.imageName.lastIndexOf("_"), 
                                    result.imageName.lastIndexOf(".")), "")
                this.recipeOutput = {
                    name: result.name,
                    id: result.id,
                    language: result.language,
                    machineType: result.machineType,
                    complexity: result.complexity,
                    instructions: result.instructions,
                    language: result.language,
                    ingredientsBases: result.ingredientsBases,
                    duration: result.duration,
                    durationTotal: result.durationTotal,
                    unit: result.unit,
                    steps: result.guidedCooking.steps,
                    nutrients: result.nutrients,
                    tags: result.tags,
                    steps: steps,
                    yield: result.yield,
                    yieldUnit: result.yieldUnit,
                    image: result.imageBase+imageName
                    }
            } else {
                this.isFound = false;
            } 
        },
        clearInput(){
            this.searchMC = "";
            this.searchName = "";
            this.searchID = "";
            this.isFound = false;
        },
        addToList(){
            let addItem = {name: this.recipeOutput.name,
                             id: this.recipeOutput.id,
                             machineType: this.recipeOutput.machineType,
                             language: this.recipeOutput.language}           
            return this.$store.commit("updataList", addItem)
        },
    },
    computed: {
        recipeInput(){
            return this.$store.state.recipes
        },
        modeName(){
            switch (this.recipeOutput.language) {
                case "fr":
                    return "Préparation";
                case "de":
                    return "Verrühren";
                case "it":
                    return "Preparazione";
                case "pl":
                    return "Przygotowanie";
                default:
                    return "Preparation";
                }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.translator{
    display: flex;
    flex-direction: column;
}
.result{
    text-align: left;
    padding: 30px;
}
.form{
    display: flex;
    margin: 0 auto;
    gap: 10px;
}
.input{
    width: 200px;
}
.notFound{
    margin-top: 30px;
}
.answer{
    color: #b61e39;
}
.modeParameter{
    margin-left: 50px;
}
a {
    color: #b61e39;
}
</style>