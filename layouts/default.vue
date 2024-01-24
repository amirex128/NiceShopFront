<template>
  <v-card color="grey-lighten-3">
    <v-layout>
      <v-app-bar
          elevation="5"
          color="secondary"
      >
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


        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
                icon
                v-bind="props"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="dialog = true">
              <v-list-item-title>پروفایل</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dialog = true">
              <v-list-item-title>خروج</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title class="headline">آیا مطمئن هستید میخواهید خارج شوید؟</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">خیر</v-btn>
              <v-btn color="red darken-1" text @click="exit">بله</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app-bar>
      <v-navigation-drawer
          expand-on-hover
          elevation="5"
          :rail="false"
          v-model="drawer"

      >
        <v-list density="compact" nav>
          <v-list-item color="secondary" exact to="/" prepend-icon="mdi-home" title="داشبورد"
                       value="home"></v-list-item>
          <v-list-item color="secondary" to="/products" prepend-icon="mdi-cart" title="محصولات"
                       value="products"></v-list-item>
          <v-list-item color="secondary" to="/articles" prepend-icon="mdi-book-open-page-variant" title="مقالات"
                       value="articles"></v-list-item>
          <v-list-item color="secondary" to="/categories" prepend-icon="mdi-folder" title="دسته بندی ها"
                       value="categories"></v-list-item>
          <v-list-item color="secondary" to="/coupons" prepend-icon="mdi-ticket-percent" title="کد های تخفیف"
                       value="coupons"></v-list-item>
          <v-list-item color="secondary" to="/addresses" prepend-icon="mdi-map-marker" title="آدرس ها"
                       value="addresses"></v-list-item>
          <v-list-item color="secondary" to="/customers" prepend-icon="mdi-account-group" title="مشتریات"
                       value="customers"></v-list-item>
          <v-list-item color="secondary" to="/medias" prepend-icon="mdi-image" title="گالری"
                       value="medias"></v-list-item>
          <v-list-item color="secondary" to="/orders" prepend-icon="mdi-cart-arrow-down" title="سفارشات"
                       value="orders"></v-list-item>
          <v-list-item color="secondary" to="/returns" prepend-icon="mdi-undo" title="مرجوعی"
                       value="returns"></v-list-item>
          <v-list-item color="secondary" to="/reviews" prepend-icon="mdi-comment-text-multiple" title="نظرات"
                       value="reviews"></v-list-item>
          <v-list-item color="secondary" to="/cities" prepend-icon="mdi-city" title="شهر ها"
                       value="cities"></v-list-item>
          <v-list-item color="secondary" to="/provinces" prepend-icon="mdi-domain" title="استان ها"
                       value="provinces"></v-list-item>
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


const drawer = ref(true)

const dialog = ref(false);

const exit = () => {
  const auth = useAuth()
  auth.signOut({redirect: false})
  window.location.href = `/auth/login`
};
</script>