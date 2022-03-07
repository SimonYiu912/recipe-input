<template>
  <div class="vue">
    <b-form-select v-model="mcType">
            <option disabled value="">Select MC</option>
            <option>mc-smart</option>
            <option>mc-connect</option>
            <option>mc-plus</option>
        </b-form-select>

    <div>
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
        "level": "<span v-if="recipeOutput.complexity == 'Facile'">beginner-fr</span>
        <span v-else-if="recipeOutput.complexity == 'Moyen'">intermediate-fr</span>
        <span v-else>expert-fr</span>",
        "nutrients": {
          "calories": {{ recipeOutput.nutrients[1].amount }},
          "protein": {{ recipeOutput.nutrients[2].amount }},
          "carbohydrate": {{ recipeOutput.nutrients[3].amount }},
          "fat": {{ recipeOutput.nutrients[4].amount }}
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
    </div>
      "servingSizes": [
        {
          "id": 1,
          "amount": {{ recipeOutput.yield }},
          "unit": "{{ recipeOutput.yieldUnit }}",
          "instruction": [
          <div class="answer" v-for="instructions, index in recipeOutput.instructions" :key="instructions.id">
            "{{ instructions }}"<span v-if="index != recipeOutput.instructions.length - 1">, </span>
          </div>],
          "preparationDuration": {{ recipeOutput.duration*60 }},
          "duration": {{ recipeOutput.durationTotal*60 }},
          "steps": [
          <div v-for="step, index in recipeOutput.steps " :key="step.id">
            {
              "name": 
                <span v-if="mcType == 'mc-smart'">
                <span v-if="step.text != '' && step.text.length >= 80">"{{ step.text.slice(0, 76) }}..."</span>
                <span v-else-if="step.text != ''">"{{ step.text }}"</span>
                <span v-else>"Préparation"</span>
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
              "title": "Ingrédients courants",
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
              <div v-for="ingredient in recipeOutput.ingredientsBases[i].ingredients" :key="ingredient.id">
                {
                  "amount": "{{ ingredient.amount }}",
                  "unit": "{{ ingredient.unit }}",
                  "name": "{{ ingredient.name }}",
                  "system_ingredient": -1,
                  "ingredient_group_id": "{{ i }}"
                }<span v-if="i != recipeOutput.ingredientsBases[i].ingredients.length - 1">, </span>
              </div><span v-if="i == recipeOutput.ingredientsBases[i].ingredients.length - 1 && i != recipeOutput.ingredientsBases.length -1">, </span>
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
  },
}
</script>

<style scoped>
.vue{
  text-align: justify;
}
</style>