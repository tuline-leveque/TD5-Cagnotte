<template>
  <div class="container">
    <h1>Modifier la cagnotte</h1>

    <form v-if="loaded" @submit.prevent="update">
      <div>
        <label>Nom :</label>
        <input v-model="name" type="text" required>
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

      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

      <div class="actions">
        <button type="button" @click="$router.go(-1)">Annuler</button>
        <button v-if="valide" type="submit" class="btn-save">Enregistrer les modifications</button>
      </div>
    </form>

    <div v-else class="loading">Chargement des données...</div>
  </div>
</template>

<script>
import api from '../plugins/api.js'

export default {
  data() {
    return {
      id: this.$route.params.id,
      name: '',
      description: '',
      end_date: '',
      goal: 0,
      errorMessage: null,
      loaded: false
    }
  },
  computed: {
    valide() {
      return this.name.trim() !== '' && this.end_date !== '' && this.goal > 0
    }
  },
  async mounted() {
    try {
      // 1. On récupère les infos actuelles de la cagnotte
      const response = await api.get('/api/cagnottes/' + this.id);
      const c = response.data;

      this.name = c.name;
      this.description = c.description;
      // On s'assure que la date est au format YYYY-MM-DD pour l'input date
      this.end_date = new Date(c.end_date).toISOString().split('T')[0];
      this.goal = c.goal;

      this.loaded = true;
    } catch (e) {
      this.errorMessage = "Impossible de charger la cagnotte.";
      console.error(e);
    }
  },
  methods: {
    async update() {
      this.errorMessage = null;
      try {
        await api.put('/api/cagnottes/' + this.id, {
          name: this.name,
          description: this.description,
          end_date: this.end_date,
          goal: this.goal
        });

        // Retour à la page de détail après modification
        this.$router.push('/cagnottes/' + this.id);
      } catch (err) {
        this.errorMessage = err.response?.data?.message || "Erreur lors de la modification.";
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}
form div {
  margin-bottom: 15px;
}
label {
  display: block;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.error {
  color: red;
  margin-bottom: 10px;
}
.actions {
  display: flex;
  gap: 10px;
}
.btn-save {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
