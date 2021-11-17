<template>
  <div :class="getTheme">
    <input
      type="radio"
      name="theme"
      :checked="getTheme === 'default'"
      @change="setTheme('default')"
    />Стандартная
    <input
      type="radio"
      name="theme"
      :checked="getTheme === 'dark'"
      @change="setTheme('dark')"
    />Тёмная

    <div class="new_student">
      <p style="font-weight: bold">Новый студент</p>
      <input
        type="text"
        class="add-student"
        placeholder="Имя студента"
        v-model="studName"
      />

      <div class="section">
        <span>Сдал / Не сдал</span>
        <input type="checkbox" v-model="studStat" />
      </div>

      <div class="section">
        <span class="section">Группа</span>
        <input type="text" v-model="studGroup" />
      </div>

      <button
        @click="addStudent"
        :class="isVisible ? 'not-visible' : 'visible'"
      >
        Добавить
      </button>
      <button
        @click="updateStudent"
        :class="isVisible ? 'visible' : 'not-visible'"
      >
        Применить
      </button>
    </div>

    <input type="text" class="search" placeholder="Поиск" v-model="search" />
    <p>Всего студентов: {{ studentsCount }}</p>
    <div class="student" v-for="student in students" :key="student._id">
      <router-link class="student-link" :to="`/student-info/${student._id}`">
        <p :class="search && student.name.includes(search) ? 'bold' : 'null'">
          Студент: {{ student.name }}
        </p>
      </router-link>
      <p>Группа: {{ student.group }}</p>
      <div class="section">
        <span>{{ student.isDonePr ? "Сдал" : "Не сдал" }}</span>
        <input type="checkbox" v-model="student.isDonePr" />
        <button
          @click.prevent="deleteStudent(student._id)"
          v-if="getCurrentUser.group === student.group"
        >
          Удалить
        </button>
        <button @click="updateForm(student)">Редактировать</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

const students = [];
let newStudent = {};

export default {
  data: function () {
    return {
      search: "",
      students: students,
      newStudent: newStudent,
      studId: null,
      studName: "",
      studGroup: "",
      studStat: null,
      isVisible: false,
    };
  },

  mounted: function () {
    Vue.axios
      .get("http://46.101.212.195:3000/students")
      .then(({ data: students }) => {
        this.students = [...students];
      })
      .then(() => this.$store.commit("setCount", this.students.length));
  },

  methods: {
    addStudent: function () {
      newStudent = {
        name: this.studName,
        group: this.studGroup,
        isDonePr: this.studStat,
      };
      Vue.axios
        .post("http://46.101.212.195:3000/students", newStudent)
        .then(({ data }) => this.students.push(data))
        .then(() => this.$store.commit("setCount", this.students.length));

      this.studName = this.studGroup = "";
      this.studStat = null;
    },

    deleteStudent: function (id) {
      Vue.axios
        .delete(`http://46.101.212.195:3000/students/${id}`)
        .then(
          () =>
            (this.students = this.students.filter(
              (student) => student._id !== id
            ))
        )
        .then(() => this.$store.commit("setCount", this.students.length));
    },

    updateForm: function (student) {
      this.studId = student._id;
      this.studName = student.name;
      this.studGroup = student.group;
      this.studStat = student.isDonePr;

      this.isVisible = true;
    },

    updateStudent: function () {
      const updatedStudent = {
        _id: this.studId,
        name: this.studName,
        group: this.studGroup,
        isDonePr: this.studStat,
      };

      this.isVisible = false;

      Vue.axios
        .put(
          `http://46.101.212.195:3000/students/${this.studId}`,
          updatedStudent
        )
        .then(
          () =>
            (this.students = this.students.map((student) =>
              this.studId === student._id ? updatedStudent : student
            ))
        );

      this.studName = this.studGroup = "";
      this.studStat = null;
    },

    setTheme: function (theme) {
      this.$store.commit("setTheme", theme);
    },
  },

  computed: {
    studentsCount: function () {
      return this.$store.getters.getCount;
    },

    getTheme: function () {
      return this.$store.getters.getTheme;
    },

    getCurrentUser() {
      return this.$store.getters.getUser;
    },
  },
};
</script>

<style scoped>
.default {
  background: #fff;
}

.dark {
  background: rgb(158, 158, 158);
}

.not-visible {
  display: none;
}

.visible {
  display: inline-block;
}

.new_student {
  display: flex;
  flex-direction: column;
  width: 10%;
  margin-top: 10px;
  padding: 0 20px 20px;
  border: 1px dashed #000;
}

.new_student input[type="text"] {
  width: 160px;
}

.new_student button {
  width: 100px;
  align-self: center;
  margin-top: 20px;
}

.section {
  margin-top: 10px;
}

.student {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.student-link {
  width: fit-content;
}

.student p {
  width: fit-content;
  margin: 10px 0;
}

.search {
  display: block;
  margin: 20px 0 0 40px;
  margin-left: 40px;
}

.bold {
  font-weight: 700;
}

.red {
  color: red;
}
</style>