<template>
  <div class="flex flex-col justify-center">
    <h1 class="text-4xl text-center uppercase text-gray-400">Salary Negotiation</h1>
    <tabs class="max-w-sm my-8 mx-6">
      <tab name="Employer" :selected="true">
        <h2 class="text-xl mb-2">Hi, employer</h2>
        <p class="mb-2">Please insert how much salary you will pay maximally:</p>
        <salary-input v-model="employerMax" type="employer" @salarySubmit="setSalary" />
      </tab>
      <tab name="Employee">
        <h2 class="text-xl mb-2">Hi, employee</h2>
        <p class="mb-2">Please insert how much salary you expect minimally:</p>
        <salary-input v-model="employeeMin" type="employee" @salarySubmit="setSalary" />
      </tab>
    </tabs>

    <button @click="reset" class="button-ghost">Reset</button>

    <message-box :show="bothFilled" :has-error="!negotiationSuccessfull">
      <template v-if="negotiationSuccessfull">
        <h1 class="text-2xl text-green-600 text-center mb-4">Great! Success!</h1>
        <p>You have an agreement! See your results:</p>
      </template>
      <template v-else>
        <h1 class="text-2xl text-red-600 text-center mb-4">Uupps! Failure!</h1>
        <p>You did not come to an agreement! See your results:</p>
      </template>
      
      <ul class="my-3">
        <li class="flex">
          <span class="flex-1">Employer:</span>
          <span class="text-right">{{ employerMax | toCurrency }}</span>
        </li>
        <li class="flex">
          <span class="flex-1">Employee:</span>
          <span class="text-right">{{ employeeMin | toCurrency }}</span>
        </li>
      </ul>
      <template v-if="temperature">
        <h4 class="font-semibold mb-1">Meanwhile in London</h4>
        <p>By the way, the current temperature in London is <b>{{ temperature | toDegree }}</b>.</p>
      </template>

      <button @click="reset" class="button-ghost block w-full mt-4">Reset</button>
    </message-box>
  </div>
</template>

<script>
import Tabs from '../Tabs'
import Tab from '../Tab'
import SalaryInput from '../SalaryInput'
import MessageBox from '../MessageBox'

export default {
  name: 'SalaryNegotiation',
  components: {
    Tabs,
    Tab,
    SalaryInput,
    MessageBox
  },
  filters: {
    toCurrency(value) {
      if (typeof value !== "number") {
        return value
      }

      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      })

      return formatter.format(value);
    },
    toDegree(value) {
      if (typeof value !== "number") {
        return value
      }

      return `${Math.round(value - 273.15)} degrees`
    }
  },
  data() {
    return {
      employerMax: 0,
      employeeMin: 0,
      temperature: null
    }
  },
  computed: {
    bothFilled() {
      return this.employerMax > 0 && this.employeeMin > 0
    },
    negotiationSuccessfull() {
      return this.employeeMin <= this.employerMax
    }
  },
  mounted() {
    this.getWeather()
  },
  created() {
    document.title = 'Salary Negotiation Tool'
  },
  methods: {
    reset() {
      this.employerMax = 0
      this.employeeMin = 0
    },
    setSalary({ type, salary }) {
      switch (type) {
        case 'employer':
          this.employerMax = salary
          break

        case 'employee':
          this.employeeMin = salary
          break
      }
    },
    async getWeather() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${process.env.VUE_APP_API_TOKEN}`
      try {
        const { main: { temp } } = await fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }

            return response
          })
          .then((res) => res.json())

        this.temperature = temp
      } catch(e) {
        console.error(e)
      }
    }
  }
}
</script>