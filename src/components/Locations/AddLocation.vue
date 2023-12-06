<template>
  <div>
    <button
      type="button"
      class="btn btn-primary mt-3"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      Add New Restaurant
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add New Restaurant</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @click.prevent>
                <div class="mb-3">
                    <input type="text" v-model="name" class="form-control" placeholder="Name" />
                    <div class="invalid-feedback d-block" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</div>
                  </div>
                <div class="mb-3">
                    <input type="text" v-model="phone" class="form-control" placeholder="Phone" />
                    <div class="invalid-feedback d-block" v-if="v$.phone.$error">{{v$.phone.$errors[0].$message}}</div>
                </div>
                <div class="mb-3">
                    <input type="text" v-model="address" class="form-control" placeholder="Adresse" />
                    <div class="invalid-feedback d-block" v-if="v$.address.$error">{{v$.address.$errors[0].$message}}</div>
                </div>
            </form>
            <div class="alert alert-danger" role="alert" v-if="errorAdded">
              Probleme added Location
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              ref="Close"
            >
              Close
            </button>
            <button type="button" @click="addLocation()" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import useValidate from '@vuelidate/core';
import { required,minLength,numeric } from '@vuelidate/validators';
import axios from "axios";

export default {
    name:"AddLocation",
    data() {
      return {
        v$: useValidate(),
        name: "",
        phone: "",
        address: "",
        userId:"",
        errorAdded: false
      }
    },
    validations(){
        return  {
            name : {required,minLength:minLength(10)},
            phone: {required,numeric,minLength:minLength(10)},
            address: {required,minLength:minLength(10)},
        }
    },
    mounted () {
        const user = localStorage.getItem("userinfo");
        if (!user) {
          this.redirectTo({val: "signup"});
        }else {
          this.userId = JSON.parse(user).id;
        }
    },
    methods: {
      ...mapActions(['redirectTo']),
      async addLocation(){
        this.v$.$validate();
        if (!this.v$.$error) {
          const newLocation = await axios.post("http://localhost:3000/Locations",{
            name: this.name,
            phone: this.phone,
            address: this.address,
            userId: this.userId
          });
          if (newLocation.status === 201) {
            this.redirectTo({val: "home"});
            this.errorAdded = false;
            this.name="";
            this.phone="";
            this.address="";
            this.v$.name.$errors[0].$message = "";
            this.v$.phone.$errors[0].$message = "";
            this.v$.address.$errors[0].$message = "";
            this.$refs.Close.click();

          } else {
            this.errorAdded = true;
          }
        }else {
          console.log("not Good");
        }
      }
    },
};
</script>

<style lang="scss" scoped></style>
