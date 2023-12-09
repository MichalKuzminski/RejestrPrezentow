<template>
  <q-dialog v-model="isOpenComputed" persistent>
    <q-card
      class="q-pa-xs justify-center items-start content-center"
      style="width: 350px; height: auto"
    >
      <h5>Edycja prezentu</h5>
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
          label="edytuj"
          @click="updatePresent"
        ></q-btn>
        <q-btn
          color="red"
          text-color="yellow"
          style="border-radius: 15px"
          label="usuń"
          @click="deletePresent"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { usePresentsStore } from "src/stores/presents-store";

export default defineComponent({
  name: "AddPresentFrom",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    presentId: {
      type: String,
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

    onMounted(async () => {
      await presentsStore.getPresentById(props.presentId);
      const currentPresent = await presentsStore.getPresent;
      name.value = currentPresent.name;
      receiver.value = currentPresent.receiver;
      price.value = currentPresent.price;
      link.value = currentPresent.link;
      description.value = currentPresent.description;

      presentsStore.resetCurrentPresent();
    });

    const updatePresent = async () => {
      const presentData = {
        name: name.value,
        receiver: receiver.value,
        price: price.value,
        link: link.value,
        description: description.value || null,
      };
      try {
        await presentsStore.updatePresent(props.presentId, presentData);
        $q.notify({
          type: "positive",
          color: "positive",
          message: "Pomyślnie edytowano prezent",
        });
      } catch (err) {
        console.error("err: ", err);
        $q.notify({
          type: "negative",
          color: "red-5",
          icon: "warning",
          message: "Wystąpił błąd podczas edycji prezentu",
        });
      } finally {
        closeDialog();
      }
    };

    const deletePresent = async () => {
      try {
        await presentsStore.deletePresent(props.presentId);
        $q.notify({
          type: "positive",
          color: "positive",
          message: "Pomyślnie usunięto prezent",
        });
      } catch (err) {
        console.error("err: ", err);
        $q.notify({
          type: "negative",
          color: "red-5",
          icon: "warning",
          message: "Wystąpił błąd podczas usuwania prezentu",
        });
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
      updatePresent,
      deletePresent,
    };
  },
});
</script>
