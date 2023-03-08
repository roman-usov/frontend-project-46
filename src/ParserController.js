export class ParserController {
  constructor() {
    this.parsers = {};
    this.allowedParsers = ['json', 'yml', 'yaml'];
  }

  addParser(type, parser) {
    if (this.allowedParsers.includes(type) && typeof parser === 'function') {
      this.parsers[type] = parser;
    } else {
      throw new Error('This parser type is not supported yet.');
    }
  }

  getParser(type) {
    return this.parsers[type] || (() => null);
  }
}

const parserController = new ParserController();

Object.freeze(parserController);

export default parserController;
