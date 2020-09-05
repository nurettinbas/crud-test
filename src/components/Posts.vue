<template>
  <div class="card w-75 p-3 mx-auto d-block align-middle">
    <div class="card-body mr-3 ml-3">
      <table class="table">
        <tbody>
          <tr
            v-for="(post,pKey) in posts"
            :key="pKey"
          >
            <th scope="row">
              {{ pKey+1 }}
            </th>
            <td class="text-left">
              {{post.title}}
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="$router.push('post/'+post.id)"
              >
                Detay
              </button>
              <button
                type="button"
                class="btn btn-info"
                data-toggle="modal"
                data-target="#editModal"
                @click="openModal(post)"
              >
                Düzenle
              </button>
              <button type="button" class="btn btn-danger" @click="remove(post.id,Pkey)">
                Sil
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      id="editModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="editModalLabel"
              class="modal-title font-weight-bold"
              @click="edit()"
            >
              Düzenle
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="font-weight-bold float-left" for="title">Title</label>
              <input id="title" v-model="editModal.title" type="text" class="form-control">
            </div>
            <div class="form-group">
              <label class="font-weight-bold float-left" for="body">Body</label>
              <textarea v-model="editModal.body" class="form-control" id="body" rows="4" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="edit()">Güncelle</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Posts',
  created() {
    this.load();
  },
  data() {
    return {
      posts: [],
      editModal: {
        id: null,
        title: null,
        body: null,
      },
    };
  },
  methods: {
    edit() {
      this.$axios
        .patch(`https://jsonplaceholder.typicode.com/posts/${this.editModal.id}`, {
          title: this.editModal.title,
          body: this.editModal.body,
        })
        .then(
          (sr) => {
            // eslint-disable-next-line no-console
            console.log(sr.data);
            const data = sr.data;
            // eslint-disable-next-line no-undef
            const key = _.findIndex(this.posts, ['id', data.id]);
            this.posts[key] = data;
            this.$forceUpdate();
            this.closeModal();
            this.$swal('Düzenleme işlemi başaralı!');
          },
        )
        .catch((er) => {
          this.$swal({
            text: 'Hata oluştu Lütfen sayfayı yenileyip tekrar deneyiniz!',
            icon: 'error',
          });
          // eslint-disable-next-line no-console
          console.log(er);
        });
    },
    load() {
      this.$axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((sr) => {
          this.posts = sr.data;
        })
        .catch((er) => {
          this.$swal({
            text: 'Hata oluştu Lütfen sayfayı yenileyip tekrar deneyiniz!',
            icon: 'error',
          });
          // eslint-disable-next-line no-console
          console.log(er);
        });
    },
    openModal(post) {
      this.editModal.title = post.title;
      this.editModal.body = post.body;
      this.editModal.id = post.id;
      this.$forceUpdate();
    },
    closeModal() {
      this.editModal.title = null;
      this.editModal.body = null;
      this.editModal.id = null;
      this.$forceUpdate();
      // eslint-disable-next-line no-undef
      $('#editModal').modal('hide');
    },
    remove(postId, pKey) {
      this.$swal({
        title: 'Emin misiniz?',
        text: 'Bir kere silerseniz bir daha ulaşamazsınız!',
        icon: 'warning',
        buttons: ['Hayır', 'Evet'],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            this.$axios
              .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
              .then(
                () => {
                  this.posts.splice(pKey, 1);
                  this.$swal('Silme işlemi başarılı!', {
                    icon: 'success',
                  });
                },
              )
              .catch((er) => {
                this.$swal({
                  text: 'Hata oluştu Lütfen sayfayı yenileyip tekrar deneyiniz!',
                  icon: 'error',
                });
                // eslint-disable-next-line no-console
                console.log(er);
              });
          } else {
            this.$swal('Silme işleminden vazgeçildi!');
          }
        });
    },
  },
};
</script>

<style scoped>
</style>
