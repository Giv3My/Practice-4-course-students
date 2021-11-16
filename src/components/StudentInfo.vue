<template>
  <div>
    <Modal v-if="modalOpen" :img="student.photo" :toggleModal="toggleModal" />
    <p>Всего студентов: {{ studentsCount }}</p>
    <div class="student-profile">
      <div class="student-photo">
        <img :src="student.photo" alt="student-photo" @click="toggleModal" />
      </div>
      <div class="student-info">
        <p class="student-name">{{ student.name }}</p>
        <p class="student-group">Группа: {{ student.group }}</p>
        <p class="student-mark">Средняя оценка: {{ studentMark }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Modal from "./Modal.vue";

export default {
  props: {
    id: "",
  },
  components: {
    Modal,
  },
  data: function () {
    return {
      student: {},
      studentMark: null,
      modalOpen: false,
    };
  },
  created: function () {
    Vue.axios
      .get(`http://46.101.212.195:3000/students/${this.id}`)
      .then(({ data: student }) => {
        this.student = student;
      })
      .then(
        () =>
          (this.studentMark =
            this.student.mark <= 0 || this.student.mark > 5
              ? "?"
              : this.student.mark)
      );
  },
  methods: {
    toggleModal: function () {
      this.modalOpen = !this.modalOpen ? true : false;
    },
  },
  computed: {
    studentsCount: function () {
      return this.$store.getters.getCount;
    },
  },
};
</script>

<style scoped>
.student-profile {
  display: flex;
  max-width: 600px;
  border: 3px solid rgb(5, 14, 53);
  border-radius: 5px;
}

.student-photo {
  position: relative;
  width: 300px;
  height: 300px;
}

.student-photo::after {
  content: "";
  position: absolute;
  height: 100%;
  border-right: 2px solid rgb(5, 14, 53);
}

.student-info {
  padding: 40px 0 0 40px;
  font-size: 20px;
}

.student-info p {
  margin: 0;
}

.student-info p:not(:first-child) {
  margin-top: 40px;
}

.student-name {
  font-weight: 700;
}
</style>