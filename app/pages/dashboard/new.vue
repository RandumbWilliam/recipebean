<script setup lang="ts">
import { GripVertical, Plus, X } from '@lucide/vue'
import { useRegleSchema } from '@regle/schemas'
import { createRecipeSchema } from '~~/shared/schemas/recipes'

const { r$ } = useRegleSchema({
  name: '',
  imageUrl: '',
  description: '',
  prepTime: 0,
  cookTime: 0,
  servings: 0,
  ingredients: [],
  instructions: [],
  notes: '',
  categoryIds: [],
}, createRecipeSchema, {
  autoDirty: false,
})

const loading = ref(false)
const currentIngredient = ref('')
const currentInstruction = ref('')

function addIngredient() {
  const currIngredient = currentIngredient.value.trim()

  if (currIngredient.length === 0)
    return

  r$.$value.ingredients.push({ raw: currIngredient })
  currentIngredient.value = ''
}

function deleteIngredient(index: number) {
  r$.$value.ingredients.splice(index, 1)
}

function addInstruction() {
  const currInstruction = currentInstruction.value.trim()

  if (currInstruction.length === 0)
    return

  r$.$value.instructions.push({ raw: currInstruction })
  currentInstruction.value = ''
}

function deleteInstruction(index: number) {
  r$.$value.instructions.splice(index, 1)
}

async function onSubmit() {
  const { valid, data } = await r$.$validate()

  if (!valid || loading.value) {
    return
  }

  loading.value = true

  try {
    const recipeId = await $fetch('/api/recipes', {
      method: 'POST',
      body: data,
    })
    await navigateTo(`/dashboard/${recipeId}`)
  }
  catch (err: any) {
    console.error(err)
  }
}
</script>

<template>
  <div>
    <header class="flex items-center bg-white border-b h-20">
      <div class="container flex items-center justify-between">
        <h1 class="text-2xl font-serif font-medium">
          New Recipe
        </h1>
        <div class="flex gap-3">
          <Button variant="outline" as-child>
            <NuxtLink to="/dashboard">
              Cancel
            </NuxtLink>
          </Button>
          <Button type="submit" form="create-recipe-form" :disabled="loading">
            {{ loading ? "Saving…" : "Save recipe" }}
          </Button>
        </div>
      </div>
    </header>
    <section class="container">
      <form id="create-recipe-form" class="grid grid-cols-[400px_1fr] gap-10 py-10" @submit.prevent="onSubmit">
        <FieldSet>
          <FieldGroup>
            <div class="flex items-center justify-center w-full h-65 rounded-xl bg-muted">
              Upload image
            </div>
            <Field :data-invalid="r$.name.$error" class="gap-1">
              <FieldLabel for="create-recipe-form-name">
                Recipe Name
              </FieldLabel>
              <Input
                id="create-recipe-form-name"
                v-model="r$.$value.name"
                type="text"
                class="bg-white"
                :aria-invalid="r$.name.$error"
              />
            </Field>
            <Field :data-invalid="r$.description.$error" class="gap-1">
              <FieldLabel for="create-recipe-form-description">
                Description
              </FieldLabel>
              <Textarea
                id="create-recipe-form-description"
                v-model="r$.$value.description"
                type="text"
                class="h-20 bg-white resize-none"
                :aria-invalid="r$.description.$error"
              />
            </Field>
            <div class="grid grid-cols-3 gap-3">
              <Field :data-invalid="r$.prepTime.$error" class="gap-1">
                <FieldLabel for="create-recipe-form-prep-time">
                  Prep time
                </FieldLabel>
                <NumberField
                  id="create-recipe-form-prep-time"
                  v-model="r$.$value.prepTime"
                  :min="0"
                >
                  <NumberFieldContent>
                    <NumberFieldInput class="bg-white" :aria-invalid="r$.prepTime.$error" />
                  </NumberFieldContent>
                </NumberField>
              </Field>
              <Field :data-invalid="r$.cookTime.$error" class="gap-1">
                <FieldLabel for="create-recipe-form-cook-time">
                  Cook time
                </FieldLabel>
                <NumberField
                  id="create-recipe-form-cook-time"
                  v-model="r$.$value.cookTime"
                  :min="0"
                >
                  <NumberFieldContent>
                    <NumberFieldInput class="bg-white" :aria-invalid="r$.cookTime.$error" />
                  </NumberFieldContent>
                </NumberField>
              </Field>
              <Field :data-invalid="r$.servings.$error" class="gap-1">
                <FieldLabel for="create-recipe-form-servings">
                  Servings
                </FieldLabel>
                <NumberField
                  id="create-recipe-form-servings"
                  v-model="r$.$value.servings"
                  :min="0"
                >
                  <NumberFieldContent>
                    <NumberFieldInput class="bg-white" :aria-invalid="r$.servings.$error" />
                  </NumberFieldContent>
                </NumberField>
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>

        <div class="flex flex-col gap-6">
          <FieldSet class="gap-1">
            <div class="flex justify-between items-center">
              <FieldLegend class="font-serif text-2xl">
                Ingredients
              </FieldLegend>
              <span class="text-sm text-muted-foreground font-semibold">
                {{ r$.$value.ingredients.length }} items
              </span>
            </div>
            <FieldGroup class="gap-5">
              <Field orientation="horizontal" class="gap-1">
                <Input
                  v-model="currentIngredient"
                  type="text"
                  placeholder="e.g. 400g bronze-cut rigatoni"
                  class="bg-white"
                  @keydown.enter.prevent="addIngredient"
                />
                <Button
                  type="button"
                  size="icon"
                  @click="addIngredient"
                >
                  <Plus :size="18" />
                </Button>
              </Field>
              <div class="flex flex-col">
                <div v-for="(ingredient, index) of r$.ingredients.$each" :key="`ingredient-${index}`" class="flex items-start gap-3 border-b py-3 px-2">
                  <GripVertical :size="16" class="mt-1 shrink-0 text-muted-foreground" />
                  <p class="min-w-0 flex-1 leading-6">
                    {{ ingredient.$value.raw }}
                  </p>
                  <button type="button" class="mt-1 shrink-0" @click="deleteIngredient(index)">
                    <X :size="18" class="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSet class="gap-1">
            <div class="flex justify-between items-center">
              <FieldLegend class="font-serif text-2xl">
                Instructions
              </FieldLegend>
              <span class="text-sm text-muted-foreground font-semibold">
                {{ r$.$value.instructions.length }} items
              </span>
            </div>
            <FieldGroup class="gap-5">
              <Field orientation="horizontal" class="gap-1">
                <Input
                  v-model="currentIngredient"
                  type="text"
                  placeholder="e.g. Make sauce"
                  class="bg-white"
                  @keydown.enter.prevent="addInstruction"
                />
                <Button
                  type="button"
                  size="icon"
                  @click="addInstruction"
                >
                  <Plus :size="18" />
                </Button>
              </Field>
              <div class="flex flex-col">
                <div v-for="(instruction, index) of r$.instructions.$each" :key="`instruction-${index}`" class="flex items-start gap-3 py-3 px-2">
                  <GripVertical :size="16" class="mt-1 shrink-0 text-muted-foreground" />
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-serif font-semibold text-primary">
                    {{ index + 1 }}
                  </div>
                  <p class="min-w-0 flex-1 leading-6">
                    {{ instruction.$value.raw }}
                  </p>
                  <button type="button" class="mt-1 shrink-0" @click="deleteInstruction(index)">
                    <X :size="18" class="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup class="gap-1">
              <div class="flex justify-between items-center">
                <FieldLegend class="font-serif text-2xl">
                  Notes
                </FieldLegend>
                <span class="text-sm text-muted-foreground font-semibold">
                  Optional
                </span>
              </div>
              <Field :data-invalid="r$.notes.$error" class="gap-1">
                <Textarea
                  v-model="r$.$value.notes"
                  type="text"
                  placeholder="Swaps, tips, the story behind it, what to serve alongside…"
                  class="h-26 bg-white"
                  :aria-invalid="r$.notes.$error"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>
      </form>
    </section>
  </div>
</template>
