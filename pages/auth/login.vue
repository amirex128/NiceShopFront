<script setup>
definePageMeta({
  title: 'login',
  layout: 'guest',
  public: true,
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})
const {
  status,
  data,
  lastRefreshedAt,
  getSession,
  signIn,
  signOut,
} = useAuth()

const formData = reactive({
  phone: '09024809750',
  otp: '',
})

const otpSent = ref(false)
const loading = ref(false)

let settings = useSettingsStore();

async function sendCode() {
  loading.value = true


  let {error} = await useMyFetch('/Users/LoginRegister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  settings.state.phone = formData.phone
  loading.value = false
  if(!error.value){
    otpSent.value = true
  }
}


const approveOtp = () => {
  loading.value = true
  signIn(
      {
        phone: formData.phone,
        otp: parseInt(formData.otp),
      },
      {callbackUrl: '/'}
  ).then((res) => {
    showSuccess("ورود موفقیت آمیز بود.")
  }).catch((err) => {
    showError("خطا در ورود.")
  }).finally(() => {
    loading.value = false
  })
}

</script>

<template>
  <div class="flex justify-center items-center h-full">
    <div v-if="!otpSent"
         class="flex flex-col justify-between items-center shadow-2xl rounded-2xl p-10 w-96 h-96">
      <div class="text-xl text-center">
        ورود / عضویت
        <hr/>
        <div class="text-lg">
          پنل مدیریت فروشگاه
        </div>
      </div>
      <div>
        <v-text-field
            type="number"
            class="w-full"
            label="شماره موبایل"
            variant="outlined"
            v-model="formData.phone"
            :rules="[v => !!v || 'Phone is required', v => (/^09[0-9]{9}$/).test(v) || 'Invalid phone number']"
        ></v-text-field>
      </div>
      <div>
        <v-btn @click="sendCode" :loading="loading">ارسال کد ورود</v-btn>
      </div>
    </div>
    <div v-if="otpSent"
         class="flex flex-col justify-between items-center shadow-2xl rounded-2xl p-10 w-96 h-96">
      <div class="text-xl">
        کد تائید برای شما ارسال شده است آن را وارد نمایید
      </div>
      <div>
        <v-otp-input
            @keydown.enter="approveOtp"
            dir="ltr"
            autofocus
            variant="solo"
            v-model="formData.otp"
            :length="4"
        ></v-otp-input>
      </div>
      <div>
        <v-btn variant="tonal" elevation="2" @click="approveOtp" :loading="loading">تائید کد</v-btn>
      </div>
      <div>
        <v-btn variant="tonal" elevation="2" color="secondary" @click="sendCode" :loading="loading">ارسال مجدد کد تائید</v-btn>
      </div>
      <div>
        <v-btn variant="tonal" elevation="2" color="accent" @click="otpSent=false" :loading="loading">تغییر شماره موبایل</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>