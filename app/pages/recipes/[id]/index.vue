<script setup lang="ts">
import { Minus, Pencil, Plus } from 'lucide-vue-next'
import { DialogClose } from 'reka-ui'
import { format } from '~/lib/recipe-ingredient'

const route = useRoute()
const recipeId = route.params.id as string

const { data, status, error } = await useFetch(`/api/recipes/${recipeId}`, { deep: true })

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    message: error.value.data.message,
  })
}

const loading = ref(false)
const isOpenDelete = ref(false)

async function deleteRecipe() {
  try {
    if (!loading.value) {
      loading.value = true

      await $fetch('/api/recipes', {
        method: 'DELETE',
        body: {
          ids: [recipeId],
        },
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
}
</script>

<template>
  <section class="pt-3">
    <div v-if="status === 'pending'">
      Loading...
    </div>
    <div v-else-if="status === 'success' && data" class="flex flex-col gap-3">
      <h1
        class="
          text-2xl font-bold
          sm:text-3xl
        "
      >
        {{ data.title }}
      </h1>
      <p>{{ data.description }}</p>
      <div class="flex gap-6">
        <div>
          <p>{{ data.prepTime }} Mins</p>
          <p class="text-sm text-muted-foreground">
            Prep time
          </p>
        </div>
        <div>
          <p>{{ data.cookTime }} Mins</p>
          <p class="text-sm text-muted-foreground">
            Cook time
          </p>
        </div>
      </div>
      <div
        class="
          flex items-center justify-between rounded-md border border-primary
          bg-primary/5 p-1.5
        "
      >
        <p>Servings</p>
        <div class="flex items-center">
          <Button size="icon" :disabled="data.servings === 1" class="size-8" @click.prevent="data.servings--">
            <Minus />
          </Button>
          <p class="w-12 text-center">
            {{ data.servings }}
          </p>
          <Button size="icon" :disabled="data.servings === 99" class="size-8" @click.prevent="data.servings++">
            <Plus />
          </Button>
        </div>
      </div>

      <div
        class="
          flex w-full flex-col gap-3
          md:flex-row
        "
      >
        <div class="w-full">
          <p class="mb-2 font-semibold">
            Ingredients
          </p>
          <div
            v-if="data.ingredients.length === 0" class="
              flex h-20 w-full items-center justify-center rounded-md bg-muted
              text-muted-foreground
            "
          >
            No ingredients
          </div>
          <ul v-else class="list-disc">
            <template v-for="(ingredient, index) in data.ingredients" :key="`ingredient-${index}`">
              <p v-if="ingredient.type === 'header'" class="font-medium">
                {{ ingredient.value }}
              </p>
              <li v-else class="ml-4 text-sm">
                {{ format(ingredient) }}
              </li>
            </template>
          </ul>
        </div>
        <div class="w-full">
          <p class="mb-2 font-semibold">
            Instructions
          </p>
          <div
            v-if="data.instructions.length === 0" class="
              flex h-20 w-full items-center justify-center rounded-md bg-muted
              text-muted-foreground
            "
          >
            No instructions
          </div>
          <ul v-else class="list-decimal">
            <template v-for="(instruction, index) in data.instructions" :key="`ingredient-${index}`">
              <p v-if="instruction.type === 'header'" class="font-medium">
                {{ instruction.value }}
              </p>
              <ol v-else class="pl-4 text-sm">
                {{ instruction }}
              </ol>
            </template>
          </ul>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="icon" class="absolute right-3 bottom-3 rounded-full" as-child>
            <Pencil />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-40" align="end">
          <DropdownMenuGroup>
            <NuxtLink :to="`/recipes/${recipeId}/edit`">
              <DropdownMenuItem>
                <span>Edit</span>
              </DropdownMenuItem>
            </NuxtLink>
            <DropdownMenuItem @click.prevent="isOpenDelete = true">
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog v-model:open="isOpenDelete">
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete this recipe?</DialogTitle>
            <DialogDescription>
              You are about to delete <b>{{ data.title }}</b>. This action can not be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" :loading="loading" @click.prevent="deleteRecipe">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </section>
</template>
