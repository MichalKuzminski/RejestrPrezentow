<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated class="headerStyle">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          color="yellow"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <img src="../assets/title.png" style="margin-top: 5px; height: 50px"
        /></q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="drawerStyle"
      style="background-color: rgba(5, 93, 27, 0.6); position: fixed"
    >
      {{ img }}
      <q-img
        alt="Portfolio Image"
        width="100"
        height="100%"
        class="absolute-bottom-left"
        :src="img"
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import Background from "../assets/drawerback.jpg";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const img = ref(Background);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      img,
    };
  },
});
</script>
<style scoped>
.headerStyle {
  background-color: rgb(5, 93, 27);
  border-bottom: 2px yellow solid;
}
.drawerStyle {
  background-color: rgb(5, 93, 27);
}
</style>
