<template>
  <div>
    <router-link to="/cagnottes/new">Créer une cagnotte</router-link>

    <h2>Cagnottes en cours</h2>
    <div class="list">
      <Cagnotte
        v-for="c in activeCagnottes"
        :key="c.id"
        :cagnotte="c"
        @click="$router.push('/cagnottes/' + c.id)"
      />
    </div>

    <hr>

    <button @click="showFinished = !showFinished">
      {{ showFinished ? 'Masquer' : 'Voir' }} les cagnottes terminées
    </button>

    <div v-if="showFinished">
      <h2>Cagnottes terminées</h2>
      <Cagnotte
        v-for="c in finishedCagnottes"
        :key="c.id"
        :cagnotte="c"
        class="is-finished"
        @click="$router.push('/cagnottes/' + c.id)"
      />
    </div>
  </div>
</template>

<script>
import api from '../plugins/api.js';
import Cagnotte from "@/views/Cagnotte.vue";

export default {
  components: {
    Cagnotte
  },
  data() {
    return {
      cagnottes: [],
      showFinished: false
    };
  },
  computed: {
    activeCagnottes() {
      const now = new Date();
      const a = this.cagnottes
        .filter(c => new Date(c.end_date) >= now);
      console.log(a)
      return a;
    },

    finishedCagnottes() {
      const now = new Date();
      return this.cagnottes
        .filter(c => new Date(c.end_date) <= now);
    }
  },
  async mounted() {
    try {
      const response = await api.get('/api/cagnottes');
      this.cagnottes = response.data;
      console.log(this.cagnottes)
    } catch (e) {
      console.error("Erreur chargement cagnottes", e);
    }
  }
}
</script>
