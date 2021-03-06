function removeAt(arr,pos) {
    return arr.slice(0,pos) + arr.slice(pos + 1);
}

var current_editor;
var editors = [];
class scCodeEditor extends tkControl {
    constructor(_editor_id,_state,_associated_file) {
        super(_editor_id);

        this.editorId = _editor_id;
        this.editor = ace.edit(_editor_id);
        this.editor.$blockScrolling = Infinity;
        this.modified = false;
        this.editor.setOption("showPrintMargin", false);
        this.state = _state;
        this.setTheme(this.state.theme);

        // File to read from and save to
        this.associated_file = _associated_file;
        // If associated_file exists
        if (this.associated_file) {
            // File extension
            var split_dot = _associated_file.split(".");
            this.ext = split_dot[split_dot.length -1];
            this.setExt(this.ext);
        }

        this.e = _state.e;
        editors.push(this);
    }

    setTheme(_theme) {
        this.editor.setTheme("ace/theme/" + _theme);
    }
    
    initText() {
        this.readFile(this.associated_file);
    }

    setText(_value,_position) {
        this.editor.setValue(_value,_position);
    }

    readFile(_file) {
        this.e.files.readFile(_file, 'utf-8', (err, data) => this.setText(data,-1));
    }

    destroy() {
        var editor_pos = editors.indexOf(this);
        editors = removeAt(editors, editor_pos);
    }

    setExt(_ext) {
        var ext = _ext.toLowerCase();
        if (ext == "html")
            this.editor.session.setMode("ace/mode/html");
        else if (ext == "xml")
            this.editor.session.setMode("ace/mode/xml");
        else if (ext == "scui")
            this.editor.session.setMode("ace/mode/xml");
        else if (ext == "js")
            this.editor.session.setMode("ace/mode/javascript");
        else if (ext == "pug")
            this.editor.session.setMode("ace/mode/jade");
        else if (ext == "css")
            this.editor.session.setMode("ace/mode/css");
        else if (ext == "sass")
            this.editor.session.setMode("ace/mode/sass");
        else if (ext == "less")
            this.editor.session.setMode("ace/mode/less");
        else if (ext == "md")
            this.editor.session.setMode("ace/mode/markdown");
        else if (ext == "ini")
            this.editor.session.setMode("ace/mode/ini");
        else if (ext == "json")
            this.editor.session.setMode("ace/mode/json");
        else if (ext == "bat")
            this.editor.session.setMode("ace/mode/batchfile");
        else if (ext == "sh")
            this.editor.session.setMode("ace/mode/sh");
        else
            this.editor.session.setMode("ace/mode/plain_text");
    }

}
