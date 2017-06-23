import Highlighter from '../app/highlighter';
import {JsonParser} from '../app/parsers/json-parser';
import {Parser} from '../app/index';

import 'jshl-default.css';

const textArea: HTMLTextAreaElement = document.getElementById('input')! as HTMLTextAreaElement;

const update: EventListener = () => {

    const json: string = textArea.value;

    const parser: Parser = new JsonParser();
    document.getElementById('beautified')!.innerHTML = Highlighter.highlight(parser, json);
};

update(<any>null);
textArea.addEventListener('input', update);
