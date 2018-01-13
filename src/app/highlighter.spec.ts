import highlighter from './highlighter';
import JsonParser from './parsers/json-parser';
import * as chai from 'chai';

describe('highlighter', () => {

    it('highlight() happy path', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '{ value: 5 }';

        const code: string = highlighter.highlight(parser, json);
        chai.assert.equal(code, '<span class="jshl-bracket">{</span>' +
                '<span class="jshl-whitespace"> </span><span class="jshl-identifier">value</span>' +
                '<span class="jshl-separator">:</span><span class="jshl-whitespace"> </span>' +
                '<span class="jshl-number">5</span><span class="jshl-whitespace"> </span>' +
                '<span class="jshl-bracket">}</span>');
    });
});
