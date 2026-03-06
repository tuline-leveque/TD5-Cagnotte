<script>
import api from '../plugins/api.js';
import Cagnotte from "@/views/Cagnotte.vue";

export default {
  components: {
    Cagnotte
  },
  data() {
    return {
      // Pour un détail, on attend UN objet, pas un tableau
      cagnotte: null
    };
  },
  async mounted() {
    // On utilise this.$route pour récupérer l'ID de l'URL
    const id = this.$route.params.id;
    try {
      const response = await api.get('/api/cagnottes/' + id);
      this.cagnotte = response.data;
    } catch (e) {
      console.error("Erreur chargement cagnotte", e);
    }
  }
}
</script>

<template>
  <div class="container" v-if="cagnotte">
    <header class="header">
      <h1>Détail de la cagnotte</h1>
      <router-link to="/cagnottes" class="back-link">← Retour</router-link>
    </header>

    <div class="detail-card">
      <router-link :to="'/cagnottes/' + cagnotte.id + '/donations'">Dodododo...nez, donnez moi d'la moulaga!</router-link>
      <Cagnotte :cagnotte="cagnotte" />

      <div class="stats-section">
        <div class="donation-badge">
          <span class="icon">🎁</span>
          <span class="count">{{ cagnotte._nb_donations }}</span>
          <span class="label">donation{{ cagnotte._nb_donations > 1 ? 's' : '' }}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="loading" v-else>
    <div class="spinner"></div>
    <p>Chargement de la cagnotte...</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-link {
  text-decoration: none;
  color: #666;
  font-size: 0.9rem;
}

.back-link:hover {
  color: #42b883;
}

.detail-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 20px;
}

.stats-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.donation-badge {
  display: inline-flex;
  align-items: center;
  background-color: #f0fdf4;
  border: 1px solid #dcfce7;
  padding: 8px 16px;
  border-radius: 50px;
  color: #166534;
}

.icon {
  margin-right: 8px;
  font-size: 1.2rem;
}

.count {
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 5px;
}

.label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.loading {
  text-align: center;
  margin-top: 50px;
  color: #666;
}

/* Petit effet de chargement */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
