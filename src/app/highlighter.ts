import { Highlighter, Parser, Token } from './index';

const highlighter: Highlighter = {

    highlight: (parser: Parser, code: string): string => {

        let markup = '<div class="jshl-line">';

        parser.reset(code);

        let token: Token | null;

        // eslint-disable-next-line no-cond-assign
        while (token = parser.nextToken()) {
            if (token.type === 'NEWLINE') {
                markup += '</div><div class="jshl-line">';
            }
            else {
                const className = `jshl-${token.type.toLowerCase()}`;
                markup += `<span class="${className}">${token.lexeme}</span>`;
            }
        }

        markup += '</div>';
        return markup;
    }

};

export default highlighter;
