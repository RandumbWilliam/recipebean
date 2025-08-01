<script setup lang="ts">
import type { CreateRecipeDto } from '#shared/dtos/recipes.dto'
import type { SerializeObject } from 'nitropack'
import type { Recipe } from '~~/shared/types/recipes.type'
import { createRecipeDto } from '#shared/dtos/recipes.dto'
import { toTypedSchema } from '@vee-validate/zod'
import { Plus } from 'lucide-vue-next'
import { NumberFieldInput, NumberFieldRoot } from 'reka-ui'
import { useForm } from 'vee-validate'
import { inputStyle } from '~/components/ui/input'
import { format, parse } from '~/lib/recipe-ingredient'
import { cn } from '~/lib/utils'

const props = defineProps<{
  id: string
  initialValues?: SerializeObject<Recipe>
}>()
const emit = defineEmits<{
  (e: 'submit', values: CreateRecipeDto): void
}>()

const { values, setFieldValue, handleSubmit } = useForm({
  validationSchema: toTypedSchema(createRecipeDto),
  initialValues: {
    title: props.initialValues?.title ?? '',
    servings: props.initialValues?.servings ?? 1,
    cookTime: props.initialValues?.cookTime ?? 0,
    prepTime: props.initialValues?.prepTime ?? 0,
    ingredients: props.initialValues?.ingredients ?? [],
    instructions: props.initialValues?.instructions ?? [],
  },
})

const editIngredient = ref('')
const editInstruction = ref('')

const onSubmit = handleSubmit(async (values) => {
  emit('submit', values)
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

function updateIngredient(index: number, value: string) {
  const ingredient = parse(value)
  const newIngredients = [...values.ingredients!]
  newIngredients[index] = { type: 'ingredient' as const, ...ingredient }
  setFieldValue('ingredients', newIngredients)
}
</script>

<template>
  <form :id="props.id" class="w-full space-y-6" @submit="onSubmit">
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
        <ul class="flex list-disc flex-col gap-1 pl-4 text-sm">
          <li v-for="(ingredient, index) in value" :key="`ingredient-${index}`">
            <EditableInput :model-value="format(ingredient)" @update:model-value="(value) => updateIngredient(index, value)" />
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
        <ol class="flex list-decimal flex-col gap-1 pl-4 text-sm">
          <li v-for="(instruction, index) in value" :key="`instruction-${index}`">
            <EditableInput v-model="instruction.value" />
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
  </form>
</template>
