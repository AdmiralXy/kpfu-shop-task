<script lang="ts" setup>
const products = ref([
  { id: 1, name: 'Кроссовки', price: 100, image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRwsjSfdjUAk6I22Ue7WtEYthnBcm_Rj7m04NYL0XfRBI7Y9dbm_Bqjmzi0HCDHVlt01ixB9PLS0McDz22Vap_EVb91xOJJvJAV64GbLj8&usqp=CAE' },
  { id: 2, name: 'Худи', price: 200, image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQhqQgdjbBIqNp7Pyo70RibUnwlWOHlKe7nEEWpOGENRjWOQm4x2FcsH5ZwPTjWd9gg7gd49CizoJf-SzYlXiTGfdsQYar61bySHLsKw_LLN8bk1xtsNnSOSQ&usqp=CAE' },
  { id: 3, name: 'Футболка', price: 300, image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTL45Uipg5o2rOnVVlEijEUXymGcvKIvawT2t4t5sNX-ima2mYiUocqKNLQOVJ62d7TtUKxAS5PrjAcX1oZRQp30262RTEnngQYH2sL--I&usqp=CAE' },
  { id: 4, name: 'Бейсболка', price: 400, image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR316ZCjScNmtVUxL3HWQH07_CbrUhjAYL_q0XNgClaf0u2G4XS_V8UfS_9VNqSK1vaviLOE2MiQX6zZmrOiGGDQkft8dkANr1P3UribYFTnSscBEkmx-MHvQ&usqp=CAE' },
  { id: 5, name: 'Штаны', price: 500, image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcShZhF9SLFwJmNR4w374XFtECyaVLgvNYy1omCn7SnP2jqzpBUuy1EJ541JbT7N69vek0OWXQDenzWnU0_G5vS-y572G8x9naWETGUm8L0&usqp=CAE' },
  { id: 6, name: 'Шорты', price: 600, image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQqzlb9U7TydceON-jxwTK0FzwX0aCvHtTHdbMhDKL23wrBo6WwXiG8WZ032HZnxBwTZy4SAYpi_Sj3H7SBrBNiq6sBoadwDMYzOkgrpNe9fkBfs0X3VmLDsQ&usqp=CAE' },
]);

onMounted(() => {
    let smtp = document.createElement('script')
    smtp.setAttribute('src', 'https://smtpjs.com/v3/smtp.js')
    document.head.appendChild(smtp)
})

const { toastError, toastSuccess } = useToast()

const cart = ref([]);

const addToCart = (product: any) => {
  cart.value.push(product)
};

const removeFromCart = (product: any) => {
  const index = cart.value.findIndex((item: any) => item.id === product.id);
  cart.value.splice(index, 1);
};

const clearCart = () => {
  cart.value = [];
};

const total = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price, 0);
});

const email = ref('')
const phone = ref('')

const sendMail = () => {
  if (cart.value.length === 0) {
    toastError('Корзина пуста')
    return
  }
  if (email.value === '') {
    toastError('Пожалуйста, укажите почту')
    return
  }
  if (phone.value === '') {
      toastError('Пожалуйста, укажите номер телефона')
      return
  }
  window.Email.send({
      SecureToken : "8b3c5537-a8ec-4707-b282-548e571b99a5",
      To : email.value,
      From : "gameproblem80@gmail.com",
      Subject : "Спасибо за заказ в интернет-магазине",
      Body : `<h1>Информация о заказе:</h1>
           ${getCartContentForMail()}
           <h2>Телефон для связи: ${phone.value}</h2>
           <h2>Итого: ${total.value} ₽</h2>
       `
  }).then(message => {
      console.log(message)
  })
  cart.value = []
  email.value = ''
  phone.value = ''
  toastSuccess('Заказ успешно оформлен. Скоро с вами свяжется менеджер')
}

const getCartContentForMail = () => {
  return cart.value.map((item) => {
    return `
      <div>
        <img src="${item.image}" alt="" style="width: 100px; height: 100px;">
        <h1>${item.name}</h1>
        <h2>${item.price} ₽</h2>
      </div>
    `
  }).join('')
}

</script>

<template>
  <div class="app h-screen">
    <div class="app__container">
      <div class="col-span-2">
        <h1 class="app-header-text p-8">Мерч от <span class="text-yellow-400">студентов ЮРФАКА КФУ</span></h1>
        <div class="product-container">
          <div v-for="product in products" :key="product.id" class="product">
            <div class="product__product-card">
              <div class="product__product-card__image">
                <img :src="product.image" alt="" class="rounded object-none h-48 w-96">
              </div>
              <div class="p-4">
                <h2 class="product__product-card__header">{{ product.name }}</h2>
                <p class="product__product-card__price">Цена: {{ product.price }} ₽</p>
                <button class="product__product-card__button" @click="addToCart(product)">Купить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-black cart col-span-1 p-8">
        <h1 class="cart__header app-header-text app-header-text--bg-black">
          Корзина
          <span v-if="!cart.length" class="text-yellow-400">
            пустая
            <Icon name="ri:emotion-sad-line" />
          </span>
        </h1>
        <button type="button" class="cart__close" @click="clearCart">
          <Icon name="carbon:shopping-cart-clear" />
        </button>
        <div class="cart__content">
          <div v-for="item in cart" :key="item.id" class="cart__item bg-gray-100">
            <img class="cart__item__image" :src="item.image">
            <div class="cart__item__content">
              <div class="cart__item__content__info">
                <h2 class="text-lg font-medium">{{ item.name }}</h2>
                <p>Цена: {{ item.price }} ₽</p>
              </div>
              <div class="cart__item__content__remove" @click="removeFromCart(item)">
                <Icon name="material-symbols:delete-forever-rounded" />
              </div>
            </div>
          </div>
        </div>
        <div class="cart__footer">
          <div class="cart__footer__form">
            <p class="cart__footer__form__total">Сумма заказа: <span>{{ total }} ₽</span> </p>
            <div class="cart__footer__form__container">
              <input v-model="email" type="text" class="cart__footer__form__container__input" placeholder="Ваша почта*" required />
                <input v-model="phone" type="text" class="cart__footer__form__container__input" placeholder="Ваш номер телефона*" required />
              <button type="submit" class="cart__footer__form__container__confirm" @click="sendMail">Оформить<span>
                  <Icon name="carbon:rocket" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 5px
}

::-webkit-scrollbar-track {
  background: #f1f1f1
}

::-webkit-scrollbar-thumb {
  background: #888
}

::-webkit-scrollbar-thumb:hover {
  background: #555
}

.app {
  font-family: "Montserrat", sans-serif;
  &__container {
    @apply bg-white lg:grid lg:grid-cols-3 gap-4 h-full;
  }
}

.app-header-text {
  @apply text-4xl font-bold mb-4;
  &--bg-black {
    @apply text-white bg-black;
  }
}

.product-container {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4;
}

.product {
  @apply col-span-1 shadow bg-white flex justify-center items-center;
  &__product-card {
    @apply flex flex-col justify-between h-full;

    &__image {
      @apply max-w-full max-h-64 mb-4;
    }

    &__header {
      @apply text-lg;
    }
    &__price {
      @apply font-black text-xl;
    }
    &__button {
      @apply bg-black text-white py-2 px-4 shadow rounded my-3;
      &:hover {
        @apply bg-gray-800;
      }
    }
  }
}

.cart {
  @apply flex flex-col h-full;
  &__content {
    @apply max-h-[75vh] overflow-auto;
  }
  &__close {
    @apply text-white text-2xl absolute top-8 right-8;
    &:hover {
      @apply cursor-pointer text-gray-400;
    }
  }
  &__footer {
    @apply bg-neutral-100 mt-auto;
    &__form {
      @apply p-4;
      &__total {
        @apply text-2xl font-bold mb-4;
        & span {
          @apply text-yellow-400;
        }
      }
      &__container {
        @apply block;
        &__input {
          @apply border-2 border-gray-200 rounded px-4 py-2 mt-3;
          &:focus-visible {
            @apply outline-none;
          }
        }
        &__confirm {
          @apply bg-black text-white py-2 px-4 shadow rounded flex items-center justify-center mt-3;
          &:hover {
            @apply bg-gray-800;
          }
          span {
            @apply ml-2 text-yellow-100;
          }
        }
      }
    }
  }
  &__item {
    @apply flex flex-row items-center mb-4;
    &__image {
      @apply w-24 h-24;
    }
    &__content {
      @apply flex justify-between grow ml-4;
      &__info {
        @apply flex flex-col;
      }
      &__remove {
        @apply flex items-center text-red-400 text-4xl ml-auto duration-300;
        &:hover {
          @apply cursor-pointer text-red-700 transition duration-300 ease-in-out;
        }
      }
    }
  }
}

</style>
