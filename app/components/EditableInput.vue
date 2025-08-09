<script setup lang="ts">
import { X } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  modelValue?: string
}>(), {
  modelValue: '',
})

const emit = defineEmits<{
  (e: 'update', value: string): void
}>()

const editInputRef = useTemplateRef('edit-input')

const isEdit = ref(false)
const edit = ref(props.modelValue)

function onSave() {
  emit('update', edit.value)
  isEdit.value = false
}

function onCancel() {
  isEdit.value = false
  edit.value = props.modelValue
  emit('update', edit.value)
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
    <Input
      ref="edit-input"
      v-model="edit"
      class="pr-8 font-normal"
      @keydown.enter.prevent="onSave"
      @keydown.esc.prevent="onCancel"
      @blur="onSave"
    />
    <button type="button" class="absolute right-2 h-full" @click.prevent="onCancel">
      <X :size="16" class="text-muted-foreground" />
    </button>
  </div>
  <span v-else @click.prevent="onEdit">
    {{ modelValue }}
  </span>
</template>
