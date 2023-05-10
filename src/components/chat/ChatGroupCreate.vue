<template>
  <QCard :class="$style.content">
    <QResizeObserver @resize="onResize" />
    <QCardSection class="text-h5 text-center">Создать группу</QCardSection>
    <QCardSection class="q-pa-none">
      <QStepper v-model="step" color="primary" animated flat :vertical="vertical">
        <QStep class="overflow-hidden" :name="1" title="Название и описание" icon="settings" :done="step > 1">
          <QInput v-model="group.title" filled label="Название" counter maxlength="30" />
          <QInput
            v-model="group.about"
            class="q-mt-sm"
            filled
            label="Описание"
            type="textarea"
            autogrow
            counter
            maxlength="100"
          />
          <QStepperNavigation>
            <QBtn color="primary" label="Продолжить" :disable="!group.title" @click="setStep(2)" />
          </QStepperNavigation>
        </QStep>
        <QStep
          class="overflow-hidden"
          :name="2"
          title="Аватар"
          caption="Не обязательно"
          icon="photo_camera"
          :done="step > 2"
        >
          <div class="row justify-center q-pt-lg">
            <ChangeAvatar v-model="group.avatar" class="q-mr-lg" size="120px" />
          </div>
          <QStepperNavigation>
            <QBtn color="primary" label="Создать" @click="createGroup" />
            <QBtn flat color="primary" label="Назад" class="q-ml-sm" @click="setStep(1)" />
          </QStepperNavigation>
        </QStep>
      </QStepper>
    </QCardSection>
  </QCard>
</template>

<script setup lang="ts">
import type { ChatResponse } from '@/types';
import ChangeAvatar from '~/ChangeAvatar.vue';
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useStore, useChatStore } from '@/stores';

const props = defineProps<{
  onCloseModal: () => void;
}>();
const store = useStore();
const chatStore = useChatStore();
const step = ref(1);
const vertical = ref(false);
const group = reactive({ title: '', about: '', avatar: null as null | File });


onMounted(() => chatStore.socket.on('chat:create-group', onChatCreateGroup));
onUnmounted(() => chatStore.socket.removeListener('chat:create-group', onChatCreateGroup));

function setStep(value: number) {
  step.value = value;
}

async function createGroup() {
  chatStore.socket.emit('chat:create-group', {
    users: [store.user._id],
    about: group.about,
    title: group.title,
    avatar: group.avatar,
  });
}

function onChatCreateGroup(chat: ChatResponse) {
  chatStore.chats.set(chat._id, chat);
  props.onCloseModal();
}

function onResize({ height, width }: { height: number; width: number }) {
  width < 410 ? vertical.value = true : vertical.value = false;
}
</script>

<style lang="scss" module>
.content {
  min-width: 300px;
  width: 100%;
  max-width: 700px;
  padding: 5px;
}
</style>