<template>
  <transition
    name="fade"
  >
    <section class="modal" v-if="product" @click="handleClick">
      <div class="modal-container">
        <div class="modal-img">
          <img :src="product.fotos[0].src" :alt="product.nome" />
        </div>
        <div class="modal-info">
          <h2 class="modal-product--title">{{ product.nome }}</h2>
          <p class="modal-product--description">{{ product.descricao }}</p>
          <span class="modal-product--price">{{
            product.preco | parseProduct
          }}</span>
          <button class="modal-btn">Comprar</button>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: ["product"],
  data() {
    return {
      active: true,
    };
  },
  methods: {
    handleClick({currentTarget, target}){
      if(currentTarget === target){
          this.$emit("update:product")
      }
    }
  },
  updated() {},
  filters: {
    parseProduct(value) {
      const price = Number(value);
      return price.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;

  flex-wrap: wrap;
  align-items: center;

  animation: FadeIn .3s forwards;
  background: rgba(0, 0, 0, 12%);
}

.modal-container {
  max-width: 60%;
  margin: 0 auto;
  padding: 20px;

  display: flex;
  justify-content: center;

  flex-wrap: wrap;
  align-items: center;

  gap: 10px;
  background: white;

  border-radius: 4px;
  box-shadow: 6px 6px 16px rgba(0, 0, 0, 16%);
}

.modal-img {
  flex: 3;
  margin-right: 20px;
}

.modal-img > img {
  flex: 1;
  height: 460px;

  object-fit: cover;
  border-radius: 4px;
}

.modal-info {
  align-self: flex-start;

  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-product--title {
  padding: 12px 0 12px 0;

  font-size: 32px;
  font-weight: 500;
  color: #222;
}

.modal-product--description {
  font-size: 16px;
  font-weight: 400;

  max-width: 360px;
  color: #333;

  line-height: 1.5em;
}

.modal-product--price {
  padding: 12px 0;

  font-size: 22px;
  font-weight: 300;

  max-width: 360px;
  color: #1f1f1f;

  line-height: 1.5em;
}

.modal-btn {
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

  transition: 0.3s ease-in-out;
}

.modal-btn:hover {
  background: #85ef;
}

/* .fade-enter,
.fade-leave-to {
  animation: FadeIn .5s forwards;
}  */

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}  */

@keyframes FadeIn {
  from {
    opacity: 0;
    transform: translate3d(-8px,0,0);
  }to {
    opacity: 1;
    transform: translate3d(0px,0,0);
  }
}

</style>
