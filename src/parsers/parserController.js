const parserController = {
  parsers: {},
  allowedParsers: ['yaml', 'yml', 'json'],
  addParser(type, parser) {
    if (this.allowedParsers.includes(type) && typeof parser === 'function') {
      this.parsers[type] = parser;
    } else {
      throw new Error('The provided parser type is not supported yet.');
    }
  },
  getParser(type) {
    return this.parsers[type];
  },
};

export default parserController;
