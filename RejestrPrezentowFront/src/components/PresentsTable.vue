<template>
  <div class="q-pa-md">
    <div>
      {{ presentPreviewVisibile }}
      <q-btn
        icon="add"
        label="Dodaj prezent"
        style="background: rgb(5, 93, 27)"
        text-color="yellow"
        @click="addNewPresentVisible = true"
      ></q-btn>
      <q-table
        class="my-sticky-header-table q-ma-md"
        flat
        bordered
        title="Prezenty"
        :rows="rows"
        :columns="columns"
        no-data-label="No data :("
        row-key="name"
        style="background: rgba(255, 255, 255, 0.7); color: black"
      >
        <template v-slot:body-cell-more="props">
          <q-td :props="props" @click="showMore(props.row.id)">
            <q-icon style="cursor: pointer" name="open_in_new" size="sm" />
          </q-td>
        </template>
      </q-table>
    </div>
    <add-present-form
      v-if="addNewPresentVisible"
      :isOpen="addNewPresentVisible"
      @close="closeDialog"
    />
    <present-preview
      v-if="presentPreviewVisible"
      :isOpen="presentPreviewVisible"
      :presentId="currentPresent"
      @close="closeDialog"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import AddPresentForm from "./AddPresentForm.vue";
import PresentPreview from "./PresentPreview.vue";
import { usePresentsStore } from "src/stores/presents-store";

export default defineComponent({
  name: "PresentsTable",
  props: {},
  components: { AddPresentForm, PresentPreview },
  setup() {
    const columns = ref([
      {
        name: "name",
        required: true,
        label: "Nazwa",
        field: "name",
        align: "left",
        sortable: true,
      },
      {
        name: "receiver",
        align: "center",
        label: "Dla kogo",
        field: "receiver",
        sortable: true,
      },
      { name: "price", label: "Cena", field: "price", sortable: true },
      {
        name: "description",
        label: "Opis",
        field: "description",
        sortable: true,
      },
      { name: "link", label: "Link", field: "link", sortable: true },
      { name: "more", field: "more" },
    ]);

    const addNewPresentVisible = ref(false);
    const presentPreviewVisible = ref(false);
    const loading = ref(false);
    const presentsStore = usePresentsStore();
    const rows = ref([]);
    const currentPresent = ref({});

    onMounted(async () => {
      loading.value = true;
      await getApiData();
      loading.value = false;
    });

    const parseRows = async (rows) => {
      let presentsArray = [];
      if (rows.length) {
        rows.forEach((row) => {
          presentsArray.push({
            id: row._id,
            name: row.name,
            receiver: row.receiver,
            price: row.price + " zł",
            link:
              row.link.length >= 20
                ? row.link.substring(0, 20) + "..."
                : row.link,
            description: row.description ? row.description : "Brak",
          });
        });
      }
      return presentsArray;
    };

    const getApiData = async () => {
      await presentsStore.getAllPresents();
      const presents = presentsStore.getPresents;
      rows.value = await parseRows(presents);
    };
    const closeDialog = async () => {
      await getApiData();
      currentPresent.value = {};
      presentsStore.resetCurrentPresent();
      window.location.reload();
    };

    const showMore = (data) => {
      currentPresent.value = data;
      presentPreviewVisible.value = true;
    };

    return {
      columns,
      addNewPresentVisible,
      presentPreviewVisible,
      rows,
      currentPresent,
      getApiData,
      showMore,
      closeDialog,
    };
  },
});
</script>
