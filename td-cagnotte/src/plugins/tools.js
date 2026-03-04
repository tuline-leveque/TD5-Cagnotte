const MyPlugin = {};

MyPlugin.install = function (app, options) {
  app.directive('focus', {
    mounted(el) {
      el.focus();
    }
  });

  app.mixin({
    methods: {
      // DD/MM/YYYY -> YYYY-MM-DD
      dateToDB: function (date) {
        if (!date) return '';
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
      },

      // YYYY-MM-DD -> DD/MM/YYYY
      dbDateToFr: function (date) {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
      },

      // YYYY-MM-DD HH:mm:ss -> DD/MM/YYYY à HH:mm
      dbDateHourToFr: function (dateTime) {
        if (!dateTime) return '';
        const [date, time] = dateTime.split(' ');
        return `${this.dbDateToFr(date)} à ${time.substring(0, 5)}`;
      },

      // Format monétaire (1540.45 -> 1 540,45 €)
      formatAmount: function (amount) {
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR'
        }).format(amount);
      },

      // Coupe le texte avec la limite X passée dans options
      cutText: function (text) {
        const limit = options.limit || 50;
        if (!text || text.length <= limit) return text;
        return text.substring(0, limit) + '...';
      }
    }
  });
};

export default MyPlugin;
