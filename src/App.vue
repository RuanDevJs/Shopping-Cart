<template>
  <div id="app">
    <Products @update:product="product = $event" />
    <Modal @update:product="handleUpdateProduct" :product="product" />
  </div>
</template>

<script>
import Products from './components/Products.vue';
import Modal from './components/Modal.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      product: null
    }
  },
  methods: {
    ...mapActions(['getCart']),
    handleUpdateProduct(){
      this.product = null;
    }
  },
  created(){
    this.getCart()
  },
  components: {
    Products,
    Modal
  }
}
</script>

<style>
body,h1,h2,h3,ul,li,span,p,a {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

body {
  font-family: 'Poppins', sans-serif;
  color: #222;
}

</style>
