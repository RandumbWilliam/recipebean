<script setup lang="ts">
import { createRecipeDto } from '#shared/dtos/recipes.dto'
import { toTypedSchema } from '@vee-validate/zod'
import { ArrowLeft, Plus } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { format } from '~/lib/recipe-ingredient/formatter'
import { parse } from '~/lib/recipe-ingredient/parser'

const { values, setFieldValue, handleSubmit } = useForm({
  validationSchema: toTypedSchema(createRecipeDto),
  initialValues: {
    ingredients: [],
    instructions: [],
  },
})

const editIngredient = ref('')
const editInstruction = ref('')

const onSubmit = handleSubmit((values) => {
  console.warn(values)
})

function addIngredient() {
  const ingredient = parse(editIngredient.value)
  const newIngredients = [...values.ingredients!, { type: 'ingredient' as const, ...ingredient }]
  setFieldValue('ingredients', newIngredients)
  editIngredient.value = ''
}

function addInstruction() {
  const newInstructions = [...values.instructions!, { type: 'instruction' as const, value: editInstruction.value }]
  setFieldValue('instructions', newInstructions)
  editInstruction.value = ''
}
</script>

<template>
  <main>
    <section class="flex flex-col items-center py-6">
      <div class="w-xl">
        <div class="mb-6 flex items-center gap-3">
          <Button as-child size="icon">
            <NuxtLink to="/app">
              <ArrowLeft />
            </NuxtLink>
          </Button>
          <h2 class="text-2xl font-bold">
            Create Recipe
          </h2>
        </div>
        <form class="w-full space-y-6" @submit="onSubmit">
          <FormField v-slot="{ errorMessage, componentField }" name="name">
            <FormItem>
              <FormLabel>Title{{ errorMessage && `(${errorMessage})` }}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Boiled egg" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ errorMessage, componentField }" name="description">
            <FormItem>
              <FormLabel>Description{{ errorMessage && `(${errorMessage})` }}</FormLabel>
              <FormControl>
                <Textarea
                  type="text" v-bind="componentField" class="h-30 resize-none"
                />
              </FormControl>
            </FormItem>
          </FormField>

          <div class="flex gap-1.5">
            <FormField v-slot="{ errorMessage, componentField }" name="servings">
              <FormItem>
                <FormLabel>Servings{{ errorMessage && `(${errorMessage})` }}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="0" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField v-slot="{ errorMessage, componentField }" name="cookTime">
              <FormItem>
                <FormLabel>Cook Time (minutes){{ errorMessage && `(${errorMessage})` }}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="0" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField v-slot="{ errorMessage, componentField }" name="prepTime">
              <FormItem>
                <FormLabel>Prep Time (minutes){{ errorMessage && `(${errorMessage})` }}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="0" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
          </div>

          <FormField v-slot="{ errorMessage, value }" name="ingredients">
            <FormItem>
              <FormLabel>Ingredients{{ errorMessage && `(${errorMessage})` }}</FormLabel>
              <ul class="list-disc pl-4 text-sm">
                <li v-for="(ingredient, index) in value" :key="index">
                  {{ format(ingredient) }}
                </li>
              </ul>
              <div class="flex gap-1.5">
                <Input v-model="editIngredient" placeholder="5 cloves of garlic, finely chopped" @keydown.enter.prevent="addIngredient" />
                <Button type="button" size="icon" @click.prevent="addIngredient">
                  <Plus />
                </Button>
              </div>
            </FormItem>
          </FormField>

          <FormField v-slot="{ errorMessage, value }" name="instructions">
            <FormItem>
              <FormLabel>Instructions{{ errorMessage && `(${errorMessage})` }}</FormLabel>
              <ol class="list-decimal pl-4 text-sm">
                <li v-for="(instruction, index) in value" :key="`instruction-${index}`">
                  {{ instruction.value }}
                </li>
              </ol>
              <div class="flex gap-1.5">
                <Input v-model="editInstruction" placeholder="Chop the garlic" @keydown.enter.prevent="addInstruction" />
                <Button type="button" size="icon" @click.prevent="addInstruction">
                  <Plus />
                </Button>
              </div>
            </FormItem>
          </FormField>

          <!-- <div class="space-y-2">
            <Label>Ingredients</Label>
            <ul>
              <li v-for="" />
            </ul>
            <div class="flex gap-1.5">
              <Input v-model="currentIngredient" placeholder="5 cloves of garlic, finely chopped" />
              <Button type="button" size="icon">
                <Plus />
              </Button>
            </div>
          </div> -->

          <div class="flex justify-end gap-1.5">
            <Button type="button" variant="outline">
              <NuxtLink href="/app">
                Cancel
              </NuxtLink>
            </Button>
            <Button type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>
