<script setup lang="ts">
import { createRecipeDto } from '#shared/dtos/recipes.dto'
import { toTypedSchema } from '@vee-validate/zod'
import { ArrowLeft, Plus } from 'lucide-vue-next'
import { NumberFieldInput, NumberFieldRoot } from 'reka-ui'
import { useForm } from 'vee-validate'
import { inputStyle } from '~/components/ui/input'
import { format } from '~/lib/recipe-ingredient/formatter'
import { parse } from '~/lib/recipe-ingredient/parser'
import { cn } from '~/lib/utils'

const { values, setFieldValue, handleSubmit } = useForm({
  validationSchema: toTypedSchema(createRecipeDto),
  initialValues: {
    title: '',
    servings: 1,
    cookTime: 0,
    prepTime: 0,
    ingredients: [],
    instructions: [],
  },
})

const loading = ref(false)
const editIngredient = ref('')
const editInstruction = ref('')

const onSubmit = handleSubmit(async (values) => {
  try {
    if (!loading.value) {
      loading.value = true

      await $fetch('/api/recipes', {
        method: 'POST',
        body: values,
      })

      return navigateTo('/recipes')
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
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
      <pre class="absolute right-0 bottom-0">{{ values }}</pre>
      <div class="w-xl">
        <div class="mb-6 flex items-center gap-3">
          <Button as-child size="icon">
            <NuxtLink to="/recipes">
              <ArrowLeft />
            </NuxtLink>
          </Button>
          <h2 class="text-2xl font-bold">
            Create Recipe
          </h2>
        </div>
        <form class="w-full space-y-6" @submit="onSubmit">
          <FormField v-slot="{ errorMessage, componentField }" name="title">
            <FormItem>
              <FormLabel>Title {{ errorMessage && `(${errorMessage})` }}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Boiled egg" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ errorMessage, componentField }" name="description">
            <FormItem>
              <FormLabel>Description {{ errorMessage && `(${errorMessage})` }}</FormLabel>
              <FormControl>
                <Textarea
                  type="text" v-bind="componentField" class="h-30 resize-none"
                />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, errorMessage, handleChange }" name="servings">
            <FormItem>
              <FormLabel>Servings {{ errorMessage && `(${errorMessage})` }}</FormLabel>
              <FormControl>
                <NumberFieldRoot
                  :model-value="value"
                  @update:model-value="(value) => {
                    if (value === undefined || value < 0) {
                      value = 0
                    };
                    handleChange(value);
                  }"
                >
                  <NumberFieldInput :class="cn(inputStyle())" />
                </NumberFieldRoot>
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, errorMessage, handleChange }" name="cookTime">
            <FormItem>
              <FormLabel>Cook time (minutes) {{ errorMessage && `(${errorMessage})` }}</FormLabel>
              <FormControl>
                <NumberFieldRoot
                  :model-value="value"
                  @update:model-value="(value) => {
                    if (value === undefined || value < 0) {
                      value = 0
                    };
                    handleChange(value);
                  }"
                >
                  <NumberFieldInput :class="cn(inputStyle())" />
                </NumberFieldRoot>
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, errorMessage, handleChange }" name="prepTime">
            <FormItem>
              <FormLabel>Prep time (minutes) {{ errorMessage && `(${errorMessage})` }}</FormLabel>
              <FormControl>
                <NumberFieldRoot
                  :model-value="value"
                  @update:model-value="(value) => {
                    if (!value || value < 1) {
                      value = 1
                    };
                    handleChange(value);
                  }"
                >
                  <NumberFieldInput :class="cn(inputStyle())" />
                </NumberFieldRoot>
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ errorMessage, value }" name="ingredients">
            <FormItem>
              <FormLabel>Ingredients {{ errorMessage && `(${errorMessage})` }}</FormLabel>
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

          <div class="flex justify-end gap-1.5">
            <Button type="button" variant="outline">
              <NuxtLink href="/recipes">
                Cancel
              </NuxtLink>
            </Button>
            <Button type="submit" :loading="loading">
              Create
            </Button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>
