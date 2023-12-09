<template>
  <q-page class="mainPage row items-start justify-evenly">
    <presents-table />
  </q-page>
</template>

<script>
import PresentsTable from "src/components/PresentsTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: { PresentsTable },
  setup() {
    return {};
  },
});
</script>
<style scoped>
.mainPage {
  background-image: url("../assets/background.png");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
