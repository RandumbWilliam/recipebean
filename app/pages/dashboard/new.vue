<script setup lang="ts">
import type { Ingredient } from '~~/shared/lib/ingredient-parser'
import { Check, GripVertical, ImagePlus, LoaderCircle, Plus, X } from '@lucide/vue'
import { useRegleSchema } from '@regle/schemas'
import { formatIngredient, parseIngredient } from '~~/shared/lib/ingredient-parser'
import { createRecipeSchema } from '~~/shared/schemas/recipes'
import { cn } from '~/lib/utils'
import { ImageUploadError, uploadRecipeImage } from '~/utils/image-upload'
import { withInstructionSteps } from '~/utils/recipes'

const { r$ } = useRegleSchema({
  name: '',
  imageId: null,
  description: '',
  prepTime: 0,
  cookTime: 0,
  servings: 1,
  ingredients: [],
  instructions: [],
  notes: '',
  categoryIds: [],
}, createRecipeSchema, {
  autoDirty: false,
})

const loading = ref(false)
const uploadingImage = ref(false)
const imagePreviewUrl = ref<string | null>(null)
const imageError = ref<string | null>(null)
const fileInput = useTemplateRef<HTMLInputElement>('fileInput')
const currentIngredient = ref('')
const currentInstruction = ref('')

// Ingredients header editor
const addingIngredientHeader = ref(false)
const ingredientHeaderTitle = ref('')
const ingredientHeaderInput = useTemplateRef<HTMLInputElement>('ingredientHeaderInput')

// Instructions header editor
const addingInstructionHeader = ref(false)
const instructionHeaderTitle = ref('')
const instructionHeaderInput = useTemplateRef<HTMLInputElement>('instructionHeaderInput')

function addIngredient() {
  const currIngredient = currentIngredient.value.trim()

  if (currIngredient.length === 0)
    return

  const parsedIngredient = parseIngredient(currIngredient)

  r$.$value.ingredients.push({ type: 'ingredient', ...parsedIngredient })
  currentIngredient.value = ''
}

function deleteIngredient(index: number) {
  r$.$value.ingredients.splice(index, 1)
}

function addInstruction() {
  const currInstruction = currentInstruction.value.trim()

  if (currInstruction.length === 0)
    return

  r$.$value.instructions.push({ type: 'instruction', raw: currInstruction })
  currentInstruction.value = ''
}

function deleteInstruction(index: number) {
  r$.$value.instructions.splice(index, 1)
}

async function startIngredientHeader() {
  addingIngredientHeader.value = true
  ingredientHeaderTitle.value = ''
  await nextTick()
  ingredientHeaderInput.value?.focus()
}

function commitIngredientHeader() {
  if (!addingIngredientHeader.value)
    return
  const title = ingredientHeaderTitle.value.trim()
  addingIngredientHeader.value = false
  ingredientHeaderTitle.value = ''
  if (title.length === 0)
    return
  r$.$value.ingredients.push({ type: 'header', title })
}

function cancelIngredientHeader() {
  addingIngredientHeader.value = false
  ingredientHeaderTitle.value = ''
}

async function startInstructionHeader() {
  addingInstructionHeader.value = true
  instructionHeaderTitle.value = ''
  await nextTick()
  instructionHeaderInput.value?.focus()
}

function commitInstructionHeader() {
  if (!addingInstructionHeader.value)
    return
  const title = instructionHeaderTitle.value.trim()
  addingInstructionHeader.value = false
  instructionHeaderTitle.value = ''
  if (title.length === 0)
    return
  r$.$value.instructions.push({ type: 'header', title })
}

function cancelInstructionHeader() {
  addingInstructionHeader.value = false
  instructionHeaderTitle.value = ''
}

const numberedInstructions = computed(() => withInstructionSteps(r$.$value.instructions))

async function onImageSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || uploadingImage.value || loading.value)
    return

  imageError.value = null
  uploadingImage.value = true

  const previousImageId = r$.$value.imageId
  const previousPreview = imagePreviewUrl.value
  const localPreview = URL.createObjectURL(file)
  imagePreviewUrl.value = localPreview

  try {
    const uploaded = await uploadRecipeImage(file)
    r$.$value.imageId = uploaded.id
    // Keep the local blob preview so the form works before the public media domain is reachable.
    if (previousPreview?.startsWith('blob:')) {
      URL.revokeObjectURL(previousPreview)
    }

    if (previousImageId) {
      await $fetch(`/api/images/${previousImageId}`, { method: 'DELETE' }).catch(() => undefined)
    }
  }
  catch (err) {
    URL.revokeObjectURL(localPreview)
    imagePreviewUrl.value = previousPreview
    imageError.value = err instanceof ImageUploadError
      ? err.message
      : 'Failed to upload image'
  }
  finally {
    uploadingImage.value = false
  }
}

async function clearImage() {
  const imageId = r$.$value.imageId
  if (imagePreviewUrl.value?.startsWith('blob:')) {
    URL.revokeObjectURL(imagePreviewUrl.value)
  }
  imagePreviewUrl.value = null
  imageError.value = null
  r$.$value.imageId = null

  if (imageId) {
    await $fetch(`/api/images/${imageId}`, { method: 'DELETE' }).catch(() => undefined)
  }
}

onBeforeUnmount(() => {
  if (imagePreviewUrl.value?.startsWith('blob:')) {
    URL.revokeObjectURL(imagePreviewUrl.value)
  }
})

async function onSubmit() {
  const { valid, data } = await r$.$validate()

  if (!valid || loading.value || uploadingImage.value) {
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
  finally {
    loading.value = false
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
          <Button type="submit" form="create-recipe-form" :disabled="loading || uploadingImage">
            {{ loading ? "Saving…" : "Save recipe" }}
          </Button>
        </div>
      </div>
    </header>
    <section class="container">
      <form id="create-recipe-form" class="flex flex-col md:grid md:grid-cols-[400px_1fr] gap-10 py-10" @submit.prevent="onSubmit">
        <FieldSet>
          <FieldGroup>
            <div class="flex flex-col gap-2">
              <div class="relative w-full h-65 rounded-xl bg-muted overflow-hidden">
                <img
                  v-if="imagePreviewUrl"
                  :src="imagePreviewUrl"
                  alt="Recipe banner preview"
                  class="absolute inset-0 h-full w-full object-cover"
                >
                <button
                  v-else
                  type="button"
                  class="flex flex-col items-center justify-center gap-2 w-full h-full text-muted-foreground hover:bg-muted/80 transition-colors"
                  :disabled="uploadingImage"
                  @click="fileInput?.click()"
                >
                  <ImagePlus :size="28" />
                  <span class="text-sm font-medium">Upload image</span>
                  <span class="text-xs">JPEG, PNG, or WebP · max 5 MB</span>
                </button>
                <div
                  v-if="uploadingImage"
                  class="absolute inset-0 flex items-center justify-center bg-background/60"
                >
                  <LoaderCircle :size="28" class="animate-spin text-primary" />
                </div>
                <div
                  v-if="imagePreviewUrl && !uploadingImage"
                  class="absolute top-2 right-2 flex gap-2"
                >
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    class="rounded-full"
                    aria-label="Replace image"
                    @click="fileInput?.click()"
                  >
                    <ImagePlus :size="16" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    class="rounded-full"
                    aria-label="Remove image"
                    @click="clearImage"
                  >
                    <X :size="16" />
                  </Button>
                </div>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  class="sr-only"
                  @change="onImageSelected"
                >
              </div>
              <p v-if="imageError" class="text-sm text-destructive">
                {{ imageError }}
              </p>
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
                  :min="1"
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
              <div class="flex flex-col gap-1.5">
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
                <template v-if="addingIngredientHeader">
                  <Field orientation="horizontal" class="gap-1">
                    <input
                      ref="ingredientHeaderInput"
                      v-model="ingredientHeaderTitle"
                      type="text"
                      placeholder="Section header (e.g. For the sauce)"
                      class="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      @keydown.enter.prevent="commitIngredientHeader"
                      @keydown.esc.prevent="cancelIngredientHeader"
                      @blur="commitIngredientHeader"
                    >
                    <Button
                      type="button"
                      size="icon"
                      @mousedown.prevent
                      @click="commitIngredientHeader"
                    >
                      <Check :size="18" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      @mousedown.prevent
                      @click="cancelIngredientHeader"
                    >
                      <X :size="18" />
                    </Button>
                  </Field>
                </template>
                <button v-else type="button" class="flex items-center gap-1 text-xs font-bold w-fit rounded-full bg-accent py-2 px-3 border border-primary text-primary" @click="startIngredientHeader">
                  <Plus :size="16" /> Add section header
                </button>
              </div>
              <div class="flex flex-col">
                <div
                  v-for="(ingredient, index) of r$.ingredients.$each" :key="`ingredient-${index}`" :class="cn('flex items-start gap-3 py-3 px-2', {
                    'border-b': ingredient.$value.type === 'ingredient',
                  })"
                >
                  <GripVertical :size="16" class="mt-1 shrink-0 text-muted-foreground" />
                  <div v-if="ingredient.$value.type === 'header'" class="min-w-0 flex-1 text-primary font-semibold">
                    {{ ingredient.$value.title }}
                  </div>
                  <p v-else class="min-w-0 flex-1 leading-6">
                    {{ formatIngredient(ingredient.$value as Ingredient) }}
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
              <div class="flex flex-col gap-1.5">
                <Field orientation="horizontal" class="gap-1">
                  <Input
                    v-model="currentInstruction"
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
                <template v-if="addingInstructionHeader">
                  <Field orientation="horizontal" class="gap-1">
                    <input
                      ref="instructionHeaderInput"
                      v-model="instructionHeaderTitle"
                      type="text"
                      placeholder="Section header (e.g. For the sauce)"
                      class="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      @keydown.enter.prevent="commitInstructionHeader"
                      @keydown.esc.prevent="cancelInstructionHeader"
                      @blur="commitInstructionHeader"
                    >
                    <Button
                      type="button"
                      size="icon"
                      @mousedown.prevent
                      @click="commitInstructionHeader"
                    >
                      <Check :size="18" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      @mousedown.prevent
                      @click="cancelInstructionHeader"
                    >
                      <X :size="18" />
                    </Button>
                  </Field>
                </template>
                <button v-else type="button" class="flex items-center gap-1 text-xs font-bold w-fit rounded-full bg-accent py-2 px-3 border border-primary text-primary" @click="startInstructionHeader">
                  <Plus :size="16" /> Add section header
                </button>
              </div>
              <div class="flex flex-col">
                <div v-for="{ instruction, step, index } of numberedInstructions" :key="`instruction-${index}`" class="flex items-start gap-3 py-3 px-2">
                  <GripVertical :size="16" class="mt-1 shrink-0 text-muted-foreground" />
                  <div v-if="instruction.type === 'header'" class="text-primary font-semibold">
                    {{ instruction.title }}
                  </div>
                  <template v-else>
                    <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-serif font-semibold text-primary">
                      {{ step }}
                    </div>
                    <p class="min-w-0 flex-1 leading-6">
                      {{ instruction.raw }}
                    </p>
                  </template>
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
