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

const ingredientEditableInputRefs = useTemplateRef('ingredient-editable-input')
const instructionEditableInputRefs = useTemplateRef('instruction-editable-input')

const editIngredient = ref('')
const editInstruction = ref('')

const onSubmit = handleSubmit(async (values) => {
  emit('submit', values)
})

function addIngredient() {
  if (editIngredient.value) {
    const ingredient = parse(editIngredient.value)
    const newIngredients = [...values.ingredients!, { type: 'ingredient' as const, ...ingredient }]
    setFieldValue('ingredients', newIngredients)
    editIngredient.value = ''
  }
}

function addInstruction() {
  if (editInstruction.value) {
    const newInstructions = [...values.instructions!, { type: 'instruction' as const, value: editInstruction.value }]
    setFieldValue('instructions', newInstructions)
    editInstruction.value = ''
  }
}

function updateIngredient(index: number, type: 'header' | 'ingredient', value: string) {
  const newIngredients = [...values.ingredients!]

  if (value.trim() === '') {
    newIngredients.splice(index, 1)
  }
  else {
    if (type === 'ingredient') {
      const ingredient = parse(value)
      newIngredients[index] = { type: 'ingredient' as const, ...ingredient }
    }
    else {
      newIngredients[index] = { type: 'header' as const, value }
    }
  }

  setFieldValue('ingredients', newIngredients)
}

function updateInstruction(index: number, type: 'header' | 'instruction', value: string) {
  const newInstructions = [...values.instructions!]

  if (value.trim() === '') {
    newInstructions.splice(index, 1)
  }
  else {
    if (type === 'instruction') {
      newInstructions[index] = { type: 'instruction' as const, value }
    }
    else {
      newInstructions[index] = { type: 'header' as const, value }
    }
  }

  setFieldValue('instructions', newInstructions)
}

function pasteInstructions(event: ClipboardEvent) {
  const clipboardData = event.clipboardData?.getData('text')
  if (clipboardData) {
    const data = clipboardData.replace(/\r/g, '').split('\n')
    const newInstructions = [...values.instructions!, ...data.map(value => ({ type: 'instruction' as const, value }))]
    setFieldValue('instructions', newInstructions)
  }
}

function addIngredientHeader() {
  const newIngredients = [...values.ingredients!, { type: 'header' as const, value: '' }]
  setFieldValue('ingredients', newIngredients)
  nextTick(() => {
    const inputs = ingredientEditableInputRefs.value
    const editableInput = inputs?.[inputs.length - 1]
    editableInput?.$el.click()
  })
}

function addInstructionHeader() {
  const newInstructions = [...values.instructions!, { type: 'header' as const, value: '' }]
  setFieldValue('instructions', newInstructions)
  nextTick(() => {
    const inputs = instructionEditableInputRefs.value
    const editableInput = inputs?.[inputs.length - 1]
    editableInput?.$el.click()
  })
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

    <FormField v-slot="{ errorMessage }" name="ingredients">
      <FormItem>
        <FormLabel>Ingredients {{ errorMessage && `(${errorMessage})` }}</FormLabel>
        {{ values.ingredients }}
        <ul
          class="
            list-disc text-sm
            [&>*]:mt-2
          "
        >
          <template v-for="(ingredient, index) in values.ingredients" :key="`ingredient-${index}`">
            <li v-if="ingredient.type === 'ingredient'" class="ml-6">
              <EditableInput ref="ingredient-editable-input" :model-value="format(ingredient)" @update="(value) => updateIngredient(index, ingredient.type, value)" />
            </li>
            <p v-else class="text-lg font-medium">
              <EditableInput ref="ingredient-editable-input" :model-value="ingredient.value" @update="(value) => updateIngredient(index, ingredient.type, value)" />
            </p>
          </template>
        </ul>
        <div class="flex gap-1.5">
          <Input
            v-model="editIngredient"
            placeholder="5 cloves of garlic, finely chopped"
            @keydown.enter.prevent="addIngredient"
          />
          <Button type="button" size="icon" @click.prevent="addIngredient">
            <Plus />
          </Button>
        </div>
        <div class="flex justify-start">
          <button
            type="button"
            class="cursor-pointer text-sm font-medium text-primary"
            @click.prevent="addIngredientHeader"
          >
            Add Header
          </button>
        </div>
      </FormItem>
    </FormField>

    <FormField v-slot="{ errorMessage }" name="instructions">
      <FormItem>
        <FormLabel>Instructions{{ errorMessage && `(${errorMessage})` }}</FormLabel>
        {{ values.instructions }}
        <ol
          class="
            list-decimal text-sm
            [&>*]:mt-2
          "
        >
          <template v-for="(instruction, index) in values.instructions" :key="`ingredient-${index}`">
            <li v-if="instruction.type === 'instruction'" class="ml-6">
              <EditableInput ref="instruction-editable-input" :model-value="instruction.value" @update="(value) => updateInstruction(index, instruction.type, value)" />
            </li>
            <p v-else class="text-lg font-medium">
              <EditableInput ref="instruction-editable-input" :model-value="instruction.value" @update="(value) => updateInstruction(index, instruction.type, value)" />
            </p>
          </template>
        </ol>
        <div class="flex gap-1.5">
          <Input
            v-model="editInstruction"
            placeholder="Chop the garlic"
            @keydown.enter.prevent="addInstruction"
            @paste.prevent="pasteInstructions"
          />
          <Button type="button" size="icon" @click.prevent="addInstruction">
            <Plus />
          </Button>
        </div>
        <div class="flex justify-start">
          <button
            type="button"
            class="cursor-pointer text-sm font-medium text-primary"
            @click.prevent="addInstructionHeader"
          >
            Add Header
          </button>
        </div>
      </FormItem>
    </FormField>
  </form>
</template>
