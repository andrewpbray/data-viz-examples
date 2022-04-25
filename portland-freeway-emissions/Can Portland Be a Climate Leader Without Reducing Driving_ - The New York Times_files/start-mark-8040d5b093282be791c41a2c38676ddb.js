/* eslint-disable */
if ((typeof window !== 'undefined') && window.performance && window.performance.mark) {
  performance.mark('interactiveResourceTime');
  window.dataLayer && window.dataLayer.push({
    event: 'performance',
    pageview: {
      performance: {
        interactiveResourceTime: Math.round(performance.getEntriesByName('interactiveResourceTime')[0].startTime),
      },
    }
  });
}
