<template>
  <v-card color="grey-lighten-3">
    <v-layout>
      <v-app-bar
          elevation="5"
          color="teal-darken-4"
          image="https://picsum.photos/1920/1080?random"
      >
        <template v-slot:image>
          <v-img
              gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>مدیریت فروشگاه اینترنتی</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer
          expand-on-hover
          elevation="5"
          :rail="drawer"
      >
        <v-list density="compact" nav>
          <v-list-item exact to="/" prepend-icon="mdi-folder" title="داشبورد" value="home"></v-list-item>
          <v-list-item to="/products" prepend-icon="mdi-account-multiple" title="محصولات" value="products"></v-list-item>
          <v-list-item to="/articles" prepend-icon="mdi-star" title="مقالات" value="articles"></v-list-item>
          <v-list-item to="/categories" prepend-icon="mdi-star" title="دسته بندی ها" value="categories"></v-list-item>
          <v-list-item to="/coupons" prepend-icon="mdi-star" title="کد های تخفیف" value="coupons"></v-list-item>
          <v-list-item to="/addresses" prepend-icon="mdi-star" title="آدرس ها" value="addresses"></v-list-item>
          <v-list-item to="/customers" prepend-icon="mdi-star" title="مشتریات" value="customers"></v-list-item>
          <v-list-item to="/medias" prepend-icon="mdi-star" title="گالری" value="medias"></v-list-item>
          <v-list-item to="/orders" prepend-icon="mdi-star" title="سفارشات" value="orders"></v-list-item>
          <v-list-item to="/returns" prepend-icon="mdi-star" title="مرجوعی" value="returns"></v-list-item>
          <v-list-item to="/reviews" prepend-icon="mdi-star" title="نظرات" value="reviews"></v-list-item>
          <v-list-item to="/cities" prepend-icon="mdi-star" title="شهر ها" value="cities"></v-list-item>
          <v-list-item to="/provinces" prepend-icon="mdi-star" title="استان ها" value="provinces"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container fluid>
          <slot/>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
const drawer = ref(false)
</script>