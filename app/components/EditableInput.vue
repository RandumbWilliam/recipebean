<script setup lang="ts">
import { X } from 'lucide-vue-next'

const modelValue = defineModel<string>({ required: true })

const editInputRef = useTemplateRef('edit-input')

const isEdit = ref(false)
const edit = ref(modelValue.value)

function onSave() {
  modelValue.value = edit.value
  isEdit.value = false
}

function onCancel() {
  isEdit.value = false
  edit.value = modelValue.value
}

function onEdit() {
  isEdit.value = true

  nextTick(() => {
    editInputRef.value?.$el.focus()
  })
}
</script>

<template>
  <div v-if="isEdit" class="relative flex items-center">
    <Input ref="edit-input" v-model="edit" @keydown.enter.prevent="onSave" @keydown.esc.prevent="onCancel" />
    <button type="button" class="absolute right-2 h-full" @click.prevent="onCancel">
      <X :size="16" class="text-muted-foreground" />
    </button>
  </div>
  <p v-else class="my-1" @click.prevent="onEdit">
    {{ modelValue }}
  </p>
</template>
