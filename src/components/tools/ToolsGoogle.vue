<template>
  <div class="column items-center q-pa-sm">
    <form :class="$style.form" @submit.prevent="query(google)">
      <h5 class="q-pa-lg text-center">{{ t('tools.google.title') }}</h5>
      <QInput v-model="google.serviceUser" class="q-mb-md" standout clearable label="Service account user" />
      <QInput
        v-model="google.servicePrivateKey"
        class="q-mb-md"
        standout
        clearable
        label="Service account private key"
        type="textarea"
        autogrow
      />
      <QInput v-model="google.sheetId" class="q-mb-md" standout clearable label="Sheet ID" />
      <QInput v-model="google.folderId" class="q-mb-md" standout clearable label="Folder ID" />
      <div class="row justify-center">
        <QBtn type="submit" :loading="loading" :disable="!valid || loading" color="primary">
          {{ t('tools.google.form.buttons.save') }}
        </QBtn>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useQuery } from '@/hooks';
import { ToolsService } from '@/api/services';
import { useI18n } from 'vue-i18n';
import { useAlertStore } from '@/stores';

const { t } = useI18n();
const alertStore = useAlertStore();
const google = reactive({
  serviceUser: '',
  servicePrivateKey: '',
  sheetId: '',
  folderId: '',
});
const valid = computed(() => !!Object.values(google).reduce((sum, item) => (sum += item.length), 0));
const { query, loading } = useQuery(ToolsService.setGoogleServiceAccountSettings, { onSuccess, onError });

function onSuccess() {
  Object.keys(google).forEach((key) => (google[key as keyof typeof google] = ''));
  alertStore.addAlert('success', t('tools.google.messages.success'));
}

function onError() {
  alertStore.addAlert('error', t('tools.google.messages.error'));
}
</script>

<style lang="scss" module>
.form {
  max-width: 500px;
  width: 100%;
}
</style>
