<template>
  <form @submit.prevent="submit" class="flex flex-col relative">
    <input v-model="salaryInput" type="number" class="input" :placeholder="placeholder" />
    <button type="submit" class="button" :disabled="disabled">Submit</button>
    <div v-if="submitted" class="overlay absolute left-0 top-0 bottom-0 right-0 z-10 flex justify-center items-center">
      <b>Thank you!</b>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SalaryInput',
  props: {
    type: {
      type: String,
      default: 'employer',
      validator: value => {
        return value.match(/(employer|employee)/)
      }
    },
    value: {
      type: Number,
      required: true
    }
  },
  watch: {
    value: {
      handler: 'watchInput',
      immediate: true
    }
  },
  data() {
    return {
      salaryInput: null,
      submitted: false
    }
  },
  computed: {
    placeholder() {
      return `your ${this.type === 'employer' ? 'maximally' : 'minimally'} expected salary`
    },
    salary() {
      return parseInt(this.salaryInput)
    },
    disabled() {
      return isNaN(this.salary) || this.salary <= 0
    }
  },
  methods: {
    watchInput(newValue) {
      this.salaryInput = newValue > 0 ? newValue : null
      this.submitted = false
    },
    submit() {
      this.$emit('salarySubmit', {
        type: this.type,
        salary: parseInt(this.salary)
      })

      this.$nextTick(() => {
        this.submitted = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  @apply border-orange-500
         border-solid
         border
         block
         mb-6
         mt-4
         rounded
         shadow
         px-3
         py-1
         text-right
         w-full;
  
  &::placeholder {
    text-align: left;
  }
}

.overlay {
  background: rgba(255, 255, 255, 0.75);
}
</style>