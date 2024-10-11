<template>
  tradingview_container
  <div ref="tradingview_container" id="tradingview_container" class="tradingview-widget-container"></div>
</template>

<script>
/* global TradingView */
export default {
  name: 'TradingViewWidget',
  props: {
    symbol: {
      type: String,
      default: 'AAPL'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  mounted() {
    this.loadTradingViewWidget();
  },
  methods: {
    loadTradingViewWidget() {
      if (typeof TradingView !== 'undefined') {
        this.createWidget();
      } else {
        // Essayez de charger le widget après un certain délai
        const interval = setInterval(() => {
          if (typeof TradingView !== 'undefined') {
            clearInterval(interval);
            this.createWidget();
          }
        }, 100);
      }
    },
    createWidget() {
      console.log('this.$refs.tradingview_container ==>', this.$refs.tradingview_container)
      console.log('TradingView ==>', TradingView)
      new TradingView.widget({
        symbol: this.symbol,
        width: this.width,
        height: this.height,
        theme: this.theme,
        container_id: 'tradingview_container',
      });
    }
  }
};
</script>

<style scoped>
.tradingview-widget-container {
  width: 100%;
  height: 100%;
  min-height: 500px; /* Assurez-vous que la hauteur est suffisante */
  position: relative; /* Ajoutez si nécessaire pour le positionnement */
}
</style>
