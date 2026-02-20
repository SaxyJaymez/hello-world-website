class Editor {
    constructor(term, filePath, onExit) {
        this.term = term;
        this.filePath = filePath;
        this.onExit = onExit;
        this.buffer = [''];
        this.cursor = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.term.clear();
        this.term.writeln(`Editing ${this.filePath}`);
        this.term.writeln('Press Ctrl-X to save and exit.');
        this.term.textarea.focus();
        this.render();
        this.onData = this.term.onData(e => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        if (e.charCodeAt(0) === 24) { // Ctrl-X
            this.onExit(this.buffer.join('\n'));
            this.onData.dispose();
            return;
        }

        switch (e) {
            case '\r': // Enter
                this.buffer.splice(this.cursor.y + 1, 0, this.buffer[this.cursor.y].substring(this.cursor.x));
                this.buffer[this.cursor.y] = this.buffer[this.cursor.y].substring(0, this.cursor.x);
                this.cursor.y++;
                this.cursor.x = 0;
                break;
            case '\x7f': // Backspace
                if (this.cursor.x > 0) {
                    this.buffer[this.cursor.y] = this.buffer[this.cursor.y].substring(0, this.cursor.x - 1) + this.buffer[this.cursor.y].substring(this.cursor.x);
                    this.cursor.x--;
                } else if (this.cursor.y > 0) {
                    const prevLine = this.buffer[this.cursor.y - 1];
                    this.buffer.splice(this.cursor.y, 1);
                    this.cursor.y--;
                    this.cursor.x = prevLine.length;
                    this.buffer[this.cursor.y] += this.buffer[this.cursor.y+1] || '';
                }
                break;
            default:
                this.buffer[this.cursor.y] = this.buffer[this.cursor.y].substring(0, this.cursor.x) + e + this.buffer[this.cursor.y].substring(this.cursor.x);
                this.cursor.x++;
        }
        this.render();
    }

    render() {
        this.term.clear();
        this.term.writeln(`Editing ${this.filePath}`);
        this.term.writeln('Press Ctrl-X to save and exit.');
        this.buffer.forEach(line => this.term.writeln(line));
        this.term.write(`\x1b[${this.cursor.y + 3};${this.cursor.x + 1}H`);
    }
}
