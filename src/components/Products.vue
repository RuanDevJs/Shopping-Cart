<template>
  <section class="products" v-show="!loading">
    <div class="products-container">
      <div class="product" v-for="(product, index) of products" :key="index">
        <div class="product-img">
          <img 
            draggable="false" 
            :src="product.fotos[0].src" 
            :alt="product.nome"
            @click="handleClick(product, product)"
          />
        </div>
        <div class="product-info">
          <h1>{{ product.nome }}</h1>
          <span>{{ product.preco | parseProduct }}</span>
        </div>
        <button class="product-btn" @click="handleClick(product, product)">
          Comprar
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      product: null,
      loading: true
    };
  },
  methods: {
    ...mapActions(['updateCart']),
    fetchProducts() {
      fetch("https://ranekapi.origamid.dev/json/api/produto")
        .then((r) => r.json())
        .then((r) => (this.products = r));
      this.loading = false;
    },
    handleClick({nome, preco, fotos}, product){
      this.updateCart({
        nome,
        preco,
        photo: fotos[0].src
      });
      this.product = product;
      window.scrollTo({
        behavior: "smooth",
        top: 0
      })
      this.$emit("update:product", this.product);
    }
  },
  filters: {
    parseProduct(value) {
      const price = Number(value)
      return price.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.products {
  padding: 50px;
}

.products-container {
  max-width: 960px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;

  align-items: center;
  flex-wrap: wrap;
}

.product {
  max-width: 300px;
  margin: 18px 0;
}

.product-img img {
  display: block;
  max-width: 100%;

  border-radius: 4px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 5%);

  filter: contrast(0.8);
  transition: 0.3s ease-in-out;

  transform: translate3d(0,0px,0);
}

.product-img img:hover {
  filter: contrast(1);
  cursor: pointer;

  transform: translate3d(0,-10px,0);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 10%);
}

.product-info h1 {
  font-size: 22px;
  font-weight: 400;
  color: #333;

  margin: 8px 0 4px 0;
}

.product-info span {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.product-btn {
  font-family: "Roboto";

  margin: 18px 0;
  padding: 14px;

  width: 260px;
  border: 0;

  background: #84e;
  color: #fff;

  font-size: 18px;
  font-weight: 600;

  cursor: pointer;
  border-radius: 4px;

  transition: .3s ease-in-out;
}

.product-btn:hover {
  background: #85ef;
}
</style>
