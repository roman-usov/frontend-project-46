const formatterController = {
  formatters: {},
  allowedFormatters: ['stylish', 'plain', 'json'],
  addFormatter(type, formatter) {
    if (this.allowedFormatters.includes(type) && typeof formatter === 'function') {
      this.formatters[type] = formatter;
    } else {
      console.error('The provided formatter type is not supported yet.');
    }
  },
  // eslint-disable-next-line consistent-return
  getFormatter(type) {
    if (this.allowedFormatters.includes(type)) {
      return this.formatters[type];
    }
    console.error(`Can't format the output using the formatter of ${type} type.`);
  },
};

export default formatterController;
