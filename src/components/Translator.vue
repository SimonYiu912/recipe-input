<template>
  <div class="translator">
    <div class="form" @keyup.enter="searchData">
        <b-form-select id="selectLang" v-model="searchLanguage">
            <option disabled value="">Select Languages</option>
            <option>EN</option>
            <option>DE</option>
            <option>FR</option>
            <option>IT</option>
            <option>PL</option>
        </b-form-select>

        <b-form-input id="searchID" class="input" v-model="searchID" placeholder="Enter ID"></b-form-input>
        OR
        <b-form-input class="input" v-model="searchName" placeholder="Enter recipe name"></b-form-input>
        <b-form-select v-if="searchName" v-model="searchMC">
            <option disabled value="">Select Machine type</option>
            <option>mc1</option>
            <option>mc2</option>
        </b-form-select>

        <b-button id="searchButton" class="search" variant="danger" @click="searchData">Search</b-button>
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
        Cover Photo: <img :src="recipeOutput.image" style="width: 300px" /><a id="searchImage" :href="recipeOutput.image">{{ recipeOutput.image }}</a>
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
        <span class="answer" v-if="recipeOutput.durationTotal >= 60">{{ Math.floor(recipeOutput.durationTotal/60) }}hr {{ recipeOutput.durationTotal%60 }}min ~ ({{ recipeOutput.durationTotal }}min)</span>
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
            <hr>
            Step{{i+1}}: 
                <span class="answer" v-if="step.text != ''">{{ step.text }}</span>
                <span class="answer" v-else>{{ titleName }}</span>
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
                        <span class="answer" v-if="step.machineValues.time >= 60">{{ Math.floor(step.machineValues.time/60) }}min {{ step.machineValues.time%60 }}s ~ ({{ step.machineValues.time }}s)</span>
                        <span class="answer" v-else>{{ step.machineValues.time }}s</span>
                    </div>
                    </div>
                    </div>
                </span>
            <br>
        </div>
    </div>

    <div class="notFound" v-else>
        Result Not Found
    </div>

  </div>
</template>

<script>
import axios from "axios"

export default {
    components: {
        // completedTask,
    },
    name: 'recipe-translator',
    props: {
    },
    data(){
        return{
            stringTranslation: {
                            "EN": {
                                "kneading": "Knead",
                                "steaming": "Steam",
                                "roasting": "Brown",
                                "scale": "Scales",
                                "cooking": "Adapted cooking",
                                "sousVide": "Sous-vide",
                                "slowCooking": "Slow-cook",
                                "cookingEggs": "Cook eggs",
                                "precleaning": "Prerinse",
                                "fermentation": "Ferment",
                                "riceCooking": "Cooking rice",
                                "turbo": "Turbo",
                                "ramp": "Ramp",
                                "puree": "Puree",
                                "smoothie": "Smoothie"
                            },
                            "FR": {
                                "kneading":"Pétrir",
                                "steaming":"Cuire à la vapeur",
                                "roasting":"Saisir",
                                "scale":"Balance",
                                "cooking":"Cuisine manuelle",
                                "sousVide":"Sous vide",
                                "slowCooking":"Slow cook",
                                "cookingEggs":"Cuire des œufs",
                                "precleaning":"Pré rinçage",
                                "fermentation":"Fermenter",
                                "riceCooking":"Cuire du riz",
                                "turbo":"Turbo",
                                "ramp":"Rampe",
                                "puree":"Mixer",
                                "smoothie":"Smoothie"
                            },
                            "PL": {
                                "kneading":"Ugniatanie",
                                "steaming":"Gotowanie na parze",
                                "roasting":"Podsmażanie",
                                "scale":"Waga",
                                "cooking":"Własne ustawienia",
                                "sousVide":"Sous-vide",
                                "slowCooking":"Slow cook",
                                "cookingEggs":"Gotowanie jajek",
                                "precleaning":"Opłukanie",
                                "fermentation":"Fermentacja",
                                "riceCooking":"Gotowanie ryżu",
                                "turbo":"Turbo",
                                "ramp":"Zwiększanie prędkości",
                                "puree":"Rozdrabnianie na piure",
                                "smoothie":"Smoothie"
                            },
                            "IT": {
                                "kneading":"Impastare",
                                "steaming":"Cottura al vapore",
                                "roasting":"Rosolare",
                                "scale":"Bilancia",
                                "cooking":"Cottura personalizzata",
                                "sousVide":"Sous-vide",
                                "slowCooking":"Slow Cook",
                                "cookingEggs":"Bollire uova",
                                "precleaning":"Prelavaggio",
                                "fermentation":"Fermentazione",
                                "riceCooking":"Cuocere il riso",
                                "turbo":"Turbo",
                                "ramp":"Rampa",
                                "puree":"Passare",
                                "smoothie":"Smoothie"
                            },
                            "DE": {
                                "kneading":"Kneten",
                                "steaming":"Dampfgaren",
                                "roasting":"Anbraten",
                                "scale":"Waage",
                                "cooking":"Manuelles Kochen",
                                "sousVide":"Sous-vide",
                                "slowCooking":"Slow-cook",
                                "cookingEggs":"Eier kochen",
                                "precleaning":"Vorspülen",
                                "fermentation":"Fermentieren",
                                "riceCooking":"Reis kochen",
                                "turbo":"Turbo",
                                "ramp":"Rampe",
                                "puree":"Pürieren",
                                "smoothie":"Smoothie"
                            }
                    },
            completedTasksList: [],
            result: null,
            isFound: false,
            searchLanguage: "",
            searchMC: null,
            searchName: "",
            searchID: "",
            recipeInput: "",
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
                    image: result.imageBase+imageName,
                    language: this.searchLanguage
                    }
            } else {
                this.isFound = false;
            } 
            this.addToList()
        },
        clearInput(){
            this.searchMC = "";
            this.searchName = "";
            this.searchID = "";
            this.isFound = false;
        },
        addToList(){      
            return this.$store.commit("sendList", this.recipeOutput)
        },
    },
    computed: {
        titleName(){
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
        },
    },
    mounted(){
        axios
        .get('https://raw.githubusercontent.com/SimonYiu912/recipeData/main/db.json')
        .then(response => (this.recipeInput = response.data))
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
hr {
    color: black;
}
</style>