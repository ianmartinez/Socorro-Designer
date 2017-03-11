function isArray(test) {
    return (test.constructor === Array);
}

function copyArr(arr) {
    var new_arr = [];
    for(var i=0;i<arr.length;i++)
        new_arr[i] = arr[i];
    return new_arr;
}

function removeAt(arr,pos) {
   return arr.slice(0, pos) + arr.slice(pos+1);
}

function removeThru(arr,start,end) {
    return arr.splice(start,end);
}

function insertAt(arr,pos,item) {
    var new_arr = copyArr(arr);
    new_arr.splice(pos,0, item);
    return new_arr;
}

const sc_version = ".22";
class SocorroState {
    constructor(_project,_theme,_e) {
        this.project = _project;
        this.e = _e;
        this.theme = _theme;
        this.layout = "";
        this.version = sc_version;
    }

    getEditorName(_file_id) {
        return 'editor_file_ui_'+_file_id;
    }

    
    getEditorId(_file_id) {
        return 'editor_file_ui_'+_file_id+"_id";
    }

    openFile(_path,_name,_id) {
        try {
            this.layout.registerComponent(this.getEditorName(_id), function (container, state) {
                var startPage = $('<iframe class="fill" src="screens/editor.html?loc=' + _path +'">');
                container.getElement().append(startPage);
            }); 
            var editor = this.layout.root.getItemsById('editor_main')[0];
            var newEditor = {
                title: _name,
                id: this.getEditorId(_id),
                type: 'component',
                componentName: this.getEditorName(_id)
            };
            editor.addChild(newEditor);
        } catch(err) {
            var editor = this.layout.root.getItemsById('editor_main')[0];
            var tab = this.layout.root.getItemsById(this.getEditorId(_id))[0];
            editor.setActiveContentItem(tab);
        }
    }
}
class SocorroProject {
    constructor(_folder_path,_build_options) {
        this.folder_path = _folder_path;
        this.build_options = _build_options;
        this.variables = [];
        this.favicon = "favicon.ico";
        this.apple_icon = "apple-touch-icon.png";
        this.selected_node = "";
    }

    // variables
    addVariable(_key,_value) {
        this.variables.push(new SocorroVariable(_key,_value));
    }

    removeVariable(_key) {
        this.variables.forEach((item, i) => {
            if (item.key =- _key) 
                this.variables = removeAt(this.variables,i);
        });
    }
}

class SocorroVariable {
    constructor(_key,_value) {
        this.key = _key;
        this.value = _value;
    }

    insertVariable(_text) {
        var replace = new RegExp(this.key,"g");
        return _text.replace(replace, _value);
    }
}

class SocorroBuildOptions {
    constructor() {
        // Automatically add vendor prefixes on CSS
        this.auto_vendor_prefixes = true;
        
        // Automatically minify to compress size
        this.minify_css = false;
        this.minify_js = false;
        this.minify_html = false;
    }
}

class ElectronApi {
    constructor(_app,_fs,_clipboard,_dialog,_shell) {
        this.app = _app;
        this.files = _fs;
        this.clipboard = _clipboard;
        this.dialog = _dialog;
        this.shell = _shell;
    }
}