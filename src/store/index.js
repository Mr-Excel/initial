import { createStore } from "vuex";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

initializeApp({
  apiKey: "AIzaSyDb6MqRVzYfcN1HXxebcapUru9-E7ezVsc",
  authDomain: "nawab-e19aa.firebaseapp.com",
  databaseURL: "https://nawab-e19aa-default-rtdb.firebaseio.com",
  projectId: "nawab-e19aa",
  storageBucket: "nawab-e19aa.appspot.com",
  messagingSenderId: "791509893180",
  appId: "1:791509893180:web:d3973cc0228c2eef560339",
  measurementId: "G-X5VEVQK5T5",
});

const db = getFirestore();

export default createStore({
  state: {
    loading: false,
    isNavBarShow: true,
  },
  mutations: {
    LOADING_STATE_CHANGE(state, value) {
      state.loading = value;
    },
    NAVBAR_STATE_CHANGE(state, value) {
      state.isNavBarShow = value;
    },
  },
  actions: {
    changeNav(context, booleanInput) {
      context.commit("NAVBAR_STATE_CHANGE", booleanInput);
    },
    async createDoc(context, input) {
      context.commit("LOADING_STATE_CHANGE", true);
      try {
        const response = await addDoc(
          collection(db, input.collection),
          input.data
        );
        context.commit("LOADING_STATE_CHANGE", false);
        if (response) {
          return {
            code: 200,
            msg: "data insertion completed!",
            data: response,
          };
        } else {
          return {
            code: 400,
            msg: "error while inserting data!",
            data: response,
          };
        }
      } catch (e) {
        context.commit("LOADING_STATE_CHANGE", false);
        console.error("Error adding document: ", e);
        return {
          code: 500,
          msg: "server error!",
          data: [],
        };
      }
    },
  },
  modules: {},
});
