<template>
  <div class="modal-mask" @click="toggleModal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <img :src="img" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: "",
    toggleModal: null,
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-wrapper {
  position: relative;
  top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
}
</style>