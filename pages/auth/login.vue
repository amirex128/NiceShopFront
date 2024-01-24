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
const {$moment} = useNuxtApp()
console.log($moment().jDayOfYear())
async function sendCode() {
  loading.value = true


  let {status, error} = await useMyFetch('/Users/LoginRegister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (status.value === "error") {
    showError("خطا در ارسال کد تائید.")
    loading.value = false
  } else {
    settings.state.phone = formData.phone
    otpSent.value = true
    loading.value = false
  }
}


const approveOtp = async (e) => {
  loading.value = true

  try {
    e.preventDefault()
    let res = await signIn(
        {...formData},
        {callbackUrl: '/'}
    )
    loading.value = false
    console.log("res", res);

  } catch (error) {
    loading.value = false
    console.log("error", error);
  }
}

</script>

<template>
  <div class="t-flex t-justify-center t-items-center t-h-full">
    <div v-if="!otpSent"
         class="t-flex t-flex-col t-justify-between t-items-center t-shadow-2xl t-rounded-2xl t-p-10 t-w-96 t-h-96">
      <div class="t-text-xl t-text-center">
        ورود / عضویت
        <hr/>
        <div class="t-text-lg">
          پنل مدیریت فروشگاه
        </div>
      </div>
      <div>
        <v-text-field
            type="number"
            class="t-w-full"
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
         class="t-flex t-flex-col t-justify-between t-items-center t-shadow-2xl t-rounded-2xl t-p-10 t-w-96 t-h-96">
      <div class="t-text-xl">
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
        <v-btn @click="approveOtp" :loading="loading">تائید کد</v-btn>
      </div>
      <div>
        <v-btn @click="sendCode" :loading="loading">ارسال مجدد کد تائید</v-btn>
      </div>
      <div>
        <v-btn @click="otpSent=false" :loading="loading">تغییر شماره موبایل</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>