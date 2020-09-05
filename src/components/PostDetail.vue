<template>
<div class="row h-100">
    <div class="col-sm-12 my-auto">
      <div class="card w-75 p-3 mx-auto d-block align-middle text-left">
        <h5 class="card-title">{{post.title}}</h5>
        <p class="card-text">{{post.body}}</p>
        <router-link :to="'/profile/'+user.id">{{user.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostDetail',
  created() {
    this.load();
  },
  data() {
    return {
      post: {},
      user: {},
    };
  },
  methods: {
    load() {
      this.$axios
        .get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
        .then((sr) => {
          this.post = sr.data;
        })
        .then(() => {
          this.getUserName();
        },
        );
    },
    getUserName() {
      this.$axios
        .get(`https://jsonplaceholder.typicode.com/users/${this.post.userId}`)
        .then((sr) => {
          this.user = sr.data;
        });
    },
  },
};
</script>

<style scoped>
</style>
