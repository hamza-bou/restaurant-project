<template>
  <div class="auth-wrapper mt-5">
    <div class="auth-inner">
      <form @submit.prevent="controllEmail">
        <h3>Sign Up</h3>
        <div class="mb-3">
          <label>Name</label>
          <input
            type="text"
            v-model="name"
            class="form-control"
            placeholder="First name"
          />
          <div class="invalid-feedback d-block" v-if="v$.name.$error">
            {{ v$.name.$errors[0].$message }}
          </div>
        </div>
        <div class="mb-3">
          <label>Email address</label>
          <input
            type="text"
            v-model="email"
            class="form-control"
            placeholder="Enter email"
          />
          <div class="invalid-feedback d-block" v-if="v$.email.$error">
            {{ v$.email.$errors[0].$message }}
          </div>
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Enter password"
          />
          <div class="invalid-feedback d-block" v-if="v$.password.$error">
            {{ v$.password.$errors[0].$message }}
          </div>
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Sign Up</button>
        </div>
        <div class="alert alert-danger mt-3" role="alert" v-if="errorMailExist">
            {{ errorMailExist }}
        </div>
        <p class="forgot-password text-right">
          Already registered
          <button class="btn btn-link" @click="redirectTo({ val: 'login' })">
            Login?
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import axios from "axios";

export default {
  name: "SignupForm",
  data() {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      password: "",
      errorMailExist:"",
    };
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      password: { required },
    };
  },
  mounted() {
    const user = localStorage.getItem("userinfo");
    if (user) {
      this.redirectTo({ val: "home" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async controllEmail() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let mailControl = await axios.get(
          `http://localhost:3000/users?email=${this.email}`
        );
        if (mailControl.status === 200 && mailControl.data.length > 0) {
            this.errorMailExist = "Email already exists";
        }else {
            this.signup();
            this.errorMailExist = "";
        }
      } else {
        console.log("form failed !!!");
      }
    },
    async signup() {
      const result = await axios.post("http://localhost:3000/users", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      if (result.status === 201) {
        localStorage.setItem("userinfo", JSON.stringify(result.data));
        this.redirectTo({ val: "home" });
      } else {
        console.log("user error");
      }
    },
  },
};
</script>

<style lang="scss">
$color_1: #7f7d7d;
$color_2: #167bff;
$border-color_1: #167bff;

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;

  .form-control {
    &:focus {
      border-color: $border-color_1;
      box-shadow: none;
    }
  }

  h3 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 20px;
  }
}

.auth-inner {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}

.custom-control-label {
  font-weight: 400;
}

.forgot-password {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: $color_1;
  margin: 0;

  a {
    text-align: right;
    font-size: 13px;
    padding-top: 10px;
    color: $color_1;
    margin: 0;
    color: $color_2;
  }
}
</style>
