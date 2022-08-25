import VButton from "@/components/UI/v-button.vue"
import VBurger from "@/components/UI/v-burger.vue"
import VLoadingWheel from "@/components/UI/v-loading-wheel.vue"
import VModal from "@/components/UI/v-modal.vue"
import VButtonDelete from "@/components/UI/v-button-delete.vue"
import VInputFind from "@/components/UI/v-input-find.vue"
import VButtonConfirm from "@/components/UI/v-button-confirm.vue"
import VButtonCancel from "@/components/UI/v-button-cancel.vue"
import VCheckbox from "@/components/UI/v-checkbox.vue"
import VRadio from "@/components/UI/v-radio.vue"
import VButtonUser from "@/components/UI/v-button-user.vue"
import VSelect from "@/components/UI/v-select.vue"
import VButtonEdit from "@/components/UI/v-button-edit.vue"
import VIntersection from "@/directives/v-intersection"

declare module '@vue/runtime-core' {
   export interface GlobalComponents {
      VButton: typeof VButton,
      VBurger: typeof VBurger,
      VLoadingWheel: typeof VLoadingWheel,
      VModal: typeof VModal,
      VButtonDelete: typeof VButtonDelete,
      VInputFind: typeof VInputFind,
      VButtonConfirm: typeof VButtonConfirm,
      VButtonCancel: typeof VButtonCancel,
      VCheckbox: typeof VCheckbox,
      VRadio: typeof VRadio,
      VButtonUser: typeof VButtonUser,
      VSelect: typeof VSelect,
      VButtonEdit: typeof VButtonEdit,
   }
}