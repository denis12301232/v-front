<template>
  <QForm ref="formRef" no-error-focus>
    <QInput
      v-model="title"
      class="q-mt-sm"
      standout
      :label="t('tasks.create.first.placeholders.title')"
      counter
      lazy-rules
      :rules="rules.title"
      :maxlength="30"
    >
    </QInput>
    <QInput
      v-model="tag"
      class="q-mt-sm"
      standout
      :label="t('tasks.create.first.placeholders.tags')"
      lazy-rules
      :rules="rules.tags"
      :readonly="tags.length >= 3"
      @keyup.enter="onAddTag"
      @blur="onAddTag"
    >
      <template #prepend v-if="tags.length">
        <QChip
          v-for="(tag, index) in tags"
          :key="index"
          :class="$style.tag"
          :label="tag"
          clickable
          removable
          icon-remove="eva-close-circle"
          color="indigo"
          text-color="white"
          size="md"
          @remove="onRemoveTag(index)"
        >
          <QTooltip class="bg-indigo" :delay="1000">{{ tag }}</QTooltip>
        </QChip>
      </template>
      <template #counter>
        <div>{{ tags.length + ' / ' + 3 }}</div>
      </template>
    </QInput>
  </QForm>
</template>

<script setup lang="ts">
import type { I18n, Langs } from '@/types';
import type { QForm } from 'quasar';
import { ref, watch, computed } from 'vue';
import { Validate } from '@/util';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  title: string;
  tags: string[];
}>();
const emit = defineEmits<{
  'update:title': [title: string];
  'update:tags': [tags: string[]];
  valid: [value: boolean];
}>();

const { t } = useI18n<I18n, Langs>({ useScope: 'global' });
const formRef = ref<QForm | null>(null);
const tag = ref('');
// eslint-disable-next-line vue/no-dupe-keys
const title = computed({
  get() {
    return props.title;
  },
  set(value) {
    emit('update:title', value);
  },
});
// eslint-disable-next-line vue/no-dupe-keys
const tags = computed({
  get() {
    return props.tags;
  },
  set(value) {
    emit('update:tags', value);
  },
});

const rules = {
  title: [(v: string) => Validate.required(v) || t('tasks.create.first.errors.title.required')],
  tags: [() => Validate.lengthInterval(1, 3)(tags.value) || t('tasks.create.first.errors.tags.lengthInterval')],
};

watch([title, () => tags.value.length], () => {
  formRef.value?.validate().then((v) => emit('valid', v));
});

function onAddTag() {
  if (tag.value) {
    tags.value.push(tag.value);
    tag.value = '';
  }
}

function onRemoveTag(index: number) {
  tags.value.splice(index, 1);
}
</script>

<style lang="scss" module>
.tag {
  max-width: 90px;
}
</style>