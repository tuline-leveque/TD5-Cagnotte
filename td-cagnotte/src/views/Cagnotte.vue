<template>
  <div class="card" :class="colorClass">
    <h3>{{ cagnotte.nom }}</h3>
    <p>{{ cutText(cagnotte.description) }}</p>

    <div class="progress-bg">
      <div class="progress-bar" :style="{ width: percent + '%' }"></div>
    </div>
    <small>{{ percent }}% atteint ({{ formatAmount(cagnotte.montant_actuel) }})</small>

    <p>Fin le : {{ dbDateToFr(cagnotte.date_fin) }}</p>
  </div>
</template>

<script>
export default {
  props: ['cagnotte'],
  computed: {
    percent() {
      // Attention aux noms des champs venant de ton API (nom/name, objectif/goal ?)
      const actuel = this.cagnotte.montant_actuel || 0;
      const objectif = this.cagnotte.objectif || 1;
      const p = (actuel / objectif) * 100;
      return Math.min(Math.round(p), 100);
    },
    colorClass() {
      const diff = new Date(this.cagnotte.date_fin) - new Date();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (days < 0) return 'gray';
      if (days < 5) return 'red';
      if (days <= 30) return 'orange';
      return 'blue';
    }
  }
}
</script>

<style scoped>
.card { padding: 15px; border-radius: 8px; margin-bottom: 10px; color: white; cursor: pointer; }
.blue { background-color: #3498db; }
.orange { background-color: #f39c12; }
.red { background-color: #e74c3c; }
.gray { background-color: #95a5a6; opacity: 0.8; }

.progress-bg { background: rgba(255,255,255,0.3); height: 12px; border-radius: 6px; margin-top: 10px; }
.progress-bar { background: #2ecc71; height: 100%; border-radius: 6px; transition: width 0.5s; }
</style>
