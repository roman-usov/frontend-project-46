const formatterController = {
  formatters: {},
  allowedFormatters: ['stylish'],
  addFormatter(type, formatter) {
    if (this.allowedFormatters.includes(type) && typeof formatter === 'function') {
      this.formatters[type] = formatter;
    } else {
      throw new Error('The provided formatter type is not supported yet.');
    }
  },
  getFormatter(type) {
    return this.formatters[type];
  },
};

export default formatterController;
