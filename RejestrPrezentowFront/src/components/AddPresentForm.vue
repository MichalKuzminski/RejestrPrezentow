<template>
  <q-dialog v-model="isOpenComputed" persistent>
    <q-card
      class="q-pa-xs justify-center items-start content-center"
      style="width: 350px; height: auto"
    >
      <q-card-section class="q-gutter-y-xs">
        <q-input
          outlined
          style="background-color: white"
          v-model="name"
          label="Nazwa prezentu*"
        />
        <q-input outlined v-model="receiver" label="Dla kogo*" />
        <q-input outlined v-model="price" label="Cena*" />
        <q-input outlined v-model="link" label="Link do prezentu*" />
        <q-input
          type="textarea"
          outlined
          v-model="description"
          label="Dodatkowy opis"
        />
      </q-card-section>

      <q-card-section
        class="q-pt-none justify-center text-center q-gutter-x-lg"
      >
        <q-btn
          color="green"
          text-color="yellow"
          style="border-radius: 15px"
          label="Anuluj"
          @click="closeDialog"
        ></q-btn>
        <q-btn
          color="green"
          text-color="yellow"
          style="border-radius: 15px"
          label="dodaj"
          @click="addPresent"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { usePresentsStore } from "src/stores/presents-store";

export default defineComponent({
  name: "AddPresentFrom",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const isOpenComputed = ref(props.isOpen);
    const $q = useQuasar();
    const presentsStore = usePresentsStore();

    const name = ref("");
    const receiver = ref("");
    const price = ref();
    const link = ref("");
    const description = ref("");

    const addPresent = async () => {
      if (!name.value || !receiver.value || !price.value || !link.value) {
        $q.notify({
          type: "negative",
          color: "red-5",
          icon: "warning",
          message: "Nie uzupełniono wszystkich danych",
        });
        return;
      }
      const presentData = {
        name: name.value,
        receiver: receiver.value,
        price: price.value,
        link: link.value,
        description: description.value || null,
      };
      try {
        await presentsStore.addPresent(presentData);
        $q.notify({
          type: "positive",
          color: "positive",
          message: "Pomyślnie zarejestrowano nowy prezent",
        });
      } catch (err) {
        console.error("err: ", err);
        $q.notify({
          type: "negative",
          color: "red-5",
          icon: "warning",
          message: "Wystąpił błąd podczas dodawania prezentu",
        });
        return;
      } finally {
        closeDialog();
      }
    };

    const closeDialog = () => {
      isOpenComputed.value = false;
      emit("close");
    };
    return {
      isOpenComputed,
      closeDialog,
      name,
      receiver,
      price,
      link,
      description,
      addPresent,
    };
  },
});
</script>
