<template>
  <div class="vue">
    <div>document.querySelector('#app').__vue__.$store._modules.root.state.createRecipe</div>
    <b-form-select id="selectMC" v-model="mcType">
            <option disabled value="">Select MC</option>
            <option>mc-smart</option>
            <option>mc-connect</option>
            <option>mc-plus</option>
    </b-form-select>
    <div class="recipe-content">
    {
      "applicableDevice": "{{ mcType }}",
      "recipeInfo": {
        "translationId": 0,
        "isBookmarked": false,
        "title": {
          "value": "{{ recipeOutput.name }}",
          "isValid": false,
          "invalidMessageKey": "recipeTitleIsRequired"
        },
        "description": "",
        "level": "<span v-if="recipeOutput.complexity == 'Easy'">beginner<span v-if="recipeOutput.language !== 'EN'">-{{ recipeOutput.language.toLowerCase() }}</span></span>
        <span v-else-if="recipeOutput.complexity == 'Medium'">intermediate<span v-if="recipeOutput.language !== 'EN'">-{{ recipeOutput.language.toLowerCase() }}</span></span>
        <span v-else>expert<span v-if="recipeOutput.language !== 'EN'">-{{ recipeOutput.language.toLowerCase() }}</span></span>",
        "nutrients": {
          "calories": "{{ recipeOutput.nutrients[1].amount }}",
          "protein": "{{ recipeOutput.nutrients[2].amount }}",
          "carbohydrate": "{{ recipeOutput.nutrients[3].amount }}",
          "fat": "{{ recipeOutput.nutrients[4].amount }}"
        },
        "categories": [
        ],
        "coverPhoto": {
          "name": "",
          "original": "",
          "originalBase64": "",
          "cloned": "",
          "editedBase64": "",
          "uploaded": "",
          "beSync": false
        }
      },
      "servingSizes": [
        {
          "id": 1,
          "amount": {{ recipeOutput.yield }},
          "unit": "{{ recipeOutput.yieldUnit.charAt(0).toUpperCase() + recipeOutput.yieldUnit.slice(1) }}",
          "instruction": [
          <span class="answer" v-for="(instructions, i) in recipeOutput.instructions" :key="instructions.id">
            "{{ instructions }}"<span v-if="i != recipeOutput.instructions.length - 1">, </span>
          </span>],
          "preparationDuration": {{ recipeOutput.duration*60 }},
          "duration": {{ recipeOutput.durationTotal*60 }},
          "steps": [
          <div v-for="step, index in recipeOutput.steps " :key="step.id">
            {
              "name": 
                <span v-if="mcType == 'mc-smart'">
                <span v-if="step.text != '' && step.text.length >= 80">"{{ step.text.slice(0, 76) }}..."</span>
                <span v-else-if="step.text != ''">"{{ step.text }}"</span>
                <span v-else>"Preparation"</span>
                </span><span v-else>""</span>
              ,
              "video": {
                "landscape": {
                  "id": "",
                  "serverUrl": "",
                  "processedMP4": "",
                  "processedHLS": "",
                  "processedDASH": "",
                  "localUrl": ""
                }
              },
              "description": "{{ step.text }}",
              "deviceSetting": {
                "cleaningMode": false,
                "reverse": false,
                "size": false,
                "texture": "",
                "turbo": false,
                "mode": "<span v-if="step.mode != 'instruction' && step.mode != 'cooking'">{{ step.mode }}</span>
                <span v-else-if="step.mode == 'cooking'">customized</span>",
                "settings": [
                  <div v-if="step.mode != 'instruction'">
                  {
                    "speed": "{{ step.machineValues.speed }}",
                    "temperature": "{{ step.machineValues.temp }}",
                    "time": "{{ step.machineValues.time }}",
                    "weight": "{{ step.machineValues.weight }}"
                  }
                  </div>
                ]
              },
              "id": "",
              "uniqueId": ""
            }<span v-if="index != recipeOutput.steps.length - 1">, </span>
          </div>  
          ],
          "ingredientGroups": [
            {
              "title": "General Ingredients",
              "isEditingTitle": false,
              "isCollapsed": false,
              "ingredients": []
            },
          <div v-for="(ingredientGroup, i) in recipeOutput.ingredientsBases" :key="ingredientGroup.id">
            {
              "title": "{{ ingredientGroup.name }}",
              "isEditingTitle": false,
              "isCollapsed": false,
              "ingredients": [
                <div v-for="ingredient, index in recipeOutput.ingredientsBases[i].ingredients" :key="ingredient.id">
                  {
                    "title": "{{ ingredient.name }}",
                    "systemIngredientId": -1,
                    "amount": "{{ ingredient.amount }}",
                    "unit": "{{ ingredient.unit }}",
                    "isLoading": false
                  }<span v-if="index != recipeOutput.ingredientsBases[i].ingredients.length - 1">, </span>
                </div>
              ]
            }<span v-if="i != recipeOutput.ingredientsBases.length - 1">, </span>
          </div>
          ],
        "ingredients": [
            <div v-for="(ingredientGroup, i) in recipeOutput.ingredientsBases" :key="ingredientGroup.id">
              <div v-for="(ingredient, j) in recipeOutput.ingredientsBases[i].ingredients" :key="ingredient.id">
                {
                  "amount": "{{ ingredient.amount }}",
                  "unit": "{{ ingredient.unit }}",
                  "name": "{{ ingredient.name }}",
                  "system_ingredient": -1,
                  "ingredient_group_id": "{{ i }}"
                }<span v-if="(i == recipeOutput.ingredientsBases.length-1) && (j == recipeOutput.ingredientsBases[recipeOutput.ingredientsBases.length-1].ingredients.length-1)"></span><span v-else>,</span>
              </div>
            </div>
          ]
        }
      ],
      "defaultServingSizeId": 1,
      "url": "",
      "status": "",
      "author": "",
      "creationDate": "",
      "allowSocialSharing": false
}
  </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'VueView',
  components: {
  },
  data(){
    return {
      mcType: "",
    }
  },
  computed: {
    recipeOutput(){
      return this.$store.state.recipeOutput
    },
  }
}
</script>

<style scoped>
.vue{
  text-align: justify;
}
</style>