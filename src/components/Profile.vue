<template>
  <div class="card w-75 p-3 mx-auto d-block text-left mt-3">
    <div class="row" v-if="user">
      <div class="col-md-6">
        <div class="row mb-3">
          <div class="col-md-12">
            <h5 class="card-title">{{user.name}}</h5>
            <p v-if="user.address" class="card-text">{{user.address.city}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <span class="font-weight-light">
              Username
            </span>
          </div>
          <div class="col-md-9 font-weight-bold">
            {{user.username}}
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <span class="font-weight-lighter">
              Email
            </span>
          </div>
          <div class="col-md-9 font-weight-bold">
            {{user.email}}
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <span class="font-weight-lighter">
              Phone
            </span>
          </div>
          <div class="col-md-9 font-weight-bold">
            {{user.phone}}
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <span class="font-weight-lighter">
              Website
            </span>
          </div>
          <div class="col-md-9 font-weight-bold">
            <a :href="'https://'+user.website">
              {{user.website}}
            </a>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <span class="font-weight-lighter">
              Company
            </span>
          </div>
          <div v-if="user.company" class="col-md-9 font-weight-bold">
            {{user.company.name}}
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <GmapMap
          :center="center"
          :zoom="7"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        >
        <GmapMarker
            ref="myMarker"
            :position="google && new google.maps.LatLng(center.lat, center.lng)"
          />
        </GmapMap>
      </div>
    </div>
    <div class="mt-3" :style="!hidden ? 'max-height:40px;overflow:hidden;' : ''">
      <p class="text-center">
        {{ text }}
      </p>
    </div>
    <p style="cursor:pointer;" class="text-center text-primary" @click="hidden = !hidden">Show {{!hidden ? ' More' : 'Less'}}</p>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';

export default {
  name: 'Profile',
  created() {
    this.getUser();
  },
  data() {
    return {
      hidden: false,
      text: 'Nulla laoreet eleifend leo nec porta. Ut sagittis mi et mi vehicula, eu varius nisi eleifend. Nulla in faucibus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam nec lorem bibendum, tempor nulla quis, faucibus turpis. Praesent enim risus, convallis eleifend lorem id, dapibus sollicitudin diam. Sed ac laoreet orci. Nunc pretium mauris ac tellus viverra, eu venenatis mi venenatis. Suspendisse id blandit nisi. Donec vitae viverra turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin lacinia tortor sed metus finibus, sit amet ullamcorper leo gravida. Sed varius aliquam enim, blandit ultrices augue porttitor id. Vestibulum lobortis, mauris feugiat blandit lobortis, arcu risus dignissim orci, vitae suscipit elit velit at ligula',
      center: {
        lat: '',
        lng: '',
      },
      user: {},
    };
  },
  computed: {
    google: gmapApi,
  },
  methods: {
    getUser() {
      this.$axios
        .get(`https://jsonplaceholder.typicode.com/users/${this.$route.params.id}`)
        .then((sr) => {
          this.user = sr.data;
          this.center.lat = parseFloat(this.user.address.geo.lat);
          this.center.lng = parseFloat(this.user.address.geo.lng);
          this.$forceUpdate();
        });
    },
  },
};
</script>

<style scoped>


</style>
