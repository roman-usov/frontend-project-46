const parserController = {
  parsers: {},
  allowedParsers: ['yaml', 'yml', 'json'],
  addParser(type, parser) {
    if (this.allowedParsers.includes(type) && typeof parser === 'function') {
      this.parsers[type] = parser;
    } else {
      console.error('The provided parser type is not supported yet.');
    }
  },
  // eslint-disable-next-line consistent-return
  getParser(type) {
    if (this.allowedParsers.includes(type)) {
      return this.parsers[type];
    }
    console.error(`Can't parse the file of ${type} type.`);
  },
};

export default parserController;
