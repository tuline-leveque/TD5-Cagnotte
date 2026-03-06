<template>
  <h1>Créer une nouvelle cagnotte</h1>
  <form @submit.prevent="create">
    <div>
      <label>Nom :</label>
      <input v-model="name" v-focus type="text" required>
    </div>

    <div>
      <label>Description :</label>
      <input v-model="description" type="text">
    </div>

    <div>
      <label>Date limite :</label>
      <input v-model="end_date" type="date" required>
    </div>

    <div>
      <label>Valeur attendue en € :</label>
      <input v-model="goal" type="number" required>
    </div>

    <button v-if="valide" type="submit">Créer la cagnotte</button>
  </form>
</template>


<script>

import api from '../plugins/api.js'

export default {
  data() {
    return {
      name: '',
      description: '',
      end_date: new Date().toISOString().split('T')[0],
      goal: 1,
      errorMessage: null
    }
  },
  computed: {
    valide() {
      console.log(this.end_date)
      return this.name !== '' && this.end_date !== '' && this.goal > 0
    }
  },
  methods: {
    async create() {
      this.errorMessage = null;

      try {
        await api.post('/api/cagnottes',
          {
            "name": this.name,
            "description": this.description,
            // "end_date": this.dateToDB(this.end_date),
            // le format est bon par defaut
            "end_date": this.end_date,
            "goal": this.goal
          })
          .then((axiosResp) => {
            console.log(axiosResp);
            this.$router.go(-1);
          })
          .catch(err => {
            console.log(err);
          });
      } catch (err) {
        if (err.response && err.response.data) {
          this.errorMessage = "Erreur : " + err.response.data.message;
        } else {
          this.errorMessage = "Impossible de contacter le serveur.";
        }
      }
    }
  }
}
</script>
