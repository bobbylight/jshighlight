import Highlighter from '../app/highlighter';
import {JsonParser} from '../app/parsers/json-parser';
import {Parser} from '../app/typedefs';

import 'jshl-default.css';

const textArea: HTMLTextAreaElement = document.getElementById('input')! as HTMLTextAreaElement;

const update: EventListener = () => {

    const json: string = textArea.value;

    const parser: Parser = new JsonParser();
    const markup: string = Highlighter.highlight(parser, json);

    document.getElementById('beautified')!.innerHTML = markup;
};

update(<any>null);
textArea.addEventListener('input', update);
