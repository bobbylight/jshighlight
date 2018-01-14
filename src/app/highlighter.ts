import { Highlighter, Parser, Token } from './index';

const highlighter: Highlighter = {

    highlight: (parser: Parser, code: string): string => {

        let markup: string = '<div class="jshl-line">';

        parser.reset(code);

        let token: Token | null;

        while (token = parser.nextToken()) {
            if (token.type === 'NEWLINE') {
                markup += '</div><div class="jshl-line">';
            }
            else {
                const className: string = `jshl-${token.type.toLowerCase()}`;
                markup += `<span class="${className}">${token.lexeme}</span>`;
            }
        }

        markup += '</div>';
        return markup;
    }

};

export default highlighter;
