import { defineStore } from "pinia";
import {
  getPresentsList,
  getPresentById,
  addPresent,
  updatePresent,
  deletePresent,
} from "src/api/presents";

export const usePresentsStore = defineStore("presents", {
  state: () => ({
    present: {},
    presents: [],
  }),
  getters: {
    getPresents: (state) => state.presents,
    getPresent: (state) => state.present,
  },
  actions: {
    async getAllPresents() {
      const presents = await getPresentsList();
      this.presents = presents;
    },

    async getPresentById(id) {
      const present = await getPresentById(id);
      if (present) this.present = present;
    },

    async resetCurrentPresent() {
      this.present = {};
    },

    async addPresent(presentData) {
      const addedPresent = await addPresent(presentData);
      if (addedPresent) {
        this.presents.push(addedPresent);
      }
    },

    async updatePresent(id, presentData) {
      const updatedPresent = await updatePresent(id, presentData);
      if (updatedPresent) {
        const currentRecord = this.presents.find((el) => {
          el.id == id;
        });
        if (currentRecord) {
          currentRecord = presentData;
        }
      }
    },

    async deletePresent(id) {
      const deletedPresent = await deletePresent(id);
      if (deletedPresent == "OK") {
        return this.presents.filter((el) => el.id !== id);
      }
    },
  },
});
