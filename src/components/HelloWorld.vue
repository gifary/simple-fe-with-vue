<template>
  <v-container>
    <v-layout
            text-xs-center
            wrap
    >
      <v-flex xs12>
        <v-img
                :src="require('../assets/logo.svg')"
                class="my-3"
                contain
                height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <v-btn color="primary" v-on:click="greet" >Login</v-btn>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data: () => ({

    }),
    methods: {
        greet: function () {
            // `this` inside methods points to the Vue instance
            this.$router.push('/login');
        }
    }
}
</script>

<style>

</style>
