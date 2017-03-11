class scFileTree {
    constructor(_files,_path) {
        this.files = _files;
        this.path = _path;
        this.tree = [];
    }

    startTree() {
        this.tree =  this.buildTree(this.path,null);
    }
    
    buildTree(_path,_parent_path) {
        var file_list = this.enumerateFiles(_path);
        file_list = this.sortPathList(file_list);
        var nodes = [];
        for(var i=0;i<file_list.length;i++) {
            var current_path = file_list[i];
            current_path.parent_id = (_parent_path!= null) ? _parent_path.id : null;
            nodes.push(current_path);

            if (current_path.is_folder)
                nodes = nodes.concat(this.buildTree(current_path.location,current_path));
        }

        return nodes;
    }

    walkTree() {
        var nodes = [];
        for(var i =0;i<this.tree.length;i++) 
            nodes.push(this.createNode(this.tree[i]));
        return nodes;
    }

    isDirectory(_path) {
        var stats = this.files.statSync(_path);
        return stats.isDirectory();
    }

    findPath(_id) {
        for(var i=0;i<this.tree.length;i++) 
            if (this.tree[i].id == _id) 
                return this.tree[i];
    }

    createNode(_path) {
        var icon = "../icons/breeze/mimetypes/32/application-x-zerosize.svg";
        switch (_path.ext) {
            // plain folder
            case "folder":
                icon = "../icons/breeze/places/32/folder.svg";
                break;
            // folder types
            case "css_folder":
                icon = "../icons/breeze/places/32/folder-yellow.svg";
                break;
            case "sass_folder":
                icon = "../icons/breeze/places/32/folder-yellow.svg";
                break;
            case "font_folder":
                icon = "../icons/breeze/places/32/folder-black.svg";
                break;
            // folder types
            case "img_folder":
                icon = "../icons/breeze/places/32/folder-cyan.svg";
                break;
            case "html_folder":
                icon = "../icons/breeze/places/32/folder-magenta.svg";
                break;
            case "sound_folder":
                icon = "../icons/breeze/places/32/folder-blue.svg";
                break;
            case "temp_folder":
                icon = "../icons/breeze/places/32/folder-temp.svg";
                break;
            case "template_folder":
                icon = "../icons/breeze/places/32/folder-brown.svg";
                break;
            case "text_folder":
                icon = "../icons/breeze/places/32/folder-green.svg";
                break;
            case "script_folder":
                icon = "../icons/breeze/places/32/folder-orange.svg";
                break;
            case "video_folder":
                icon = "../icons/breeze/places/32/folder-yellow.svg";
                break;
            case "home_folder":
                icon = "../icons/breeze/places/32/user-home.svg";
                break;
            case "trash_folder":
                icon = "../icons/breeze/places/32/user-trash-full.svg";
                break;
            case "bootstrap_folder":
                icon = "../icons/breeze/places/32/folder-violet.svg";
                break;
            case "documentation_folder":
                icon = "../icons/breeze/places/32/folder-red.svg";
                break;
            case "socorro_folder":
            case "tk_folder":
                icon = "../icons/breeze/places/32/folder-forest.svg";
                break;
            // file types
            case "html":
                icon = "../icons/breeze/mimetypes/32/text-html.svg";
                break;
            case "js":
                icon = "../icons/breeze/mimetypes/32/application-x-javascript.svg";
                break;
            case "jpg":
            case "jpeg":
                icon = "../icons/breeze/mimetypes/32/image-jpeg.svg";
                break;
            case "tif":
            case "tiff":
                icon = "../icons/breeze/mimetypes/32/image-tiff.svg";
                break;
            case "gif":
                icon = "../icons/breeze/mimetypes/32/image-gif.svg";
                break;
            case "png":
                icon = "../icons/breeze/mimetypes/32/image-png.svg";
                break;
            case "bmp":
                icon = "../icons/breeze/mimetypes/32/image-bmp.svg";
                break;
            case "svg":
                icon = "../icons/breeze/mimetypes/32/libreoffice-drawing.svg";
                break;
            case "bat":
            case "sh":
                icon = "../icons/breeze/apps/32/utilities-terminal.svg";
                break;
            case "exe":
                icon = "../icons/breeze/mimetypes/32/application-x-executable.svg";
                break;
            case "css":
                icon = "../icons/breeze/mimetypes/32/text-css.svg";
                break;            
            case "ttf":
                icon = "../icons/breeze/preferences/32/preferences-desktop-font.svg";
                break;
            case "txt":
                icon = "../icons/breeze/mimetypes/32/text-x-generic.svg";
                break;
            case "json":
                icon = "../icons/breeze/mimetypes/32/application-json.svg";
                break;
            case "readme_file":
                icon = "../icons/breeze/mimetypes/32/urgent-file.svg";
        }
        
        if(_path.parent_id != null) {
            return {"id" : _path.id, "text" : _path.name, "icon": icon, "parent": _path.parent_id};
        }
        else
            return {"id" : _path.id, "text" : _path.name, "icon": icon, "parent": "#"};
    }

    enumerateFiles(_path) {
        var file_list = this.files.readdirSync(_path);
        var files = [];
        for(var i=0;i<file_list.length;i++) 
            files.push(new Path(_path+"/"+file_list[i],file_list[i],this.isDirectory(_path+"/"+file_list[i])));
        return files;
    }

    sortPathList(_paths) {
        var folders = [];
        var files = [];

        for(var i=0;i<_paths.length;i++) {
            if(_paths[i].is_folder)
                folders.push(_paths[i]);
            else
                files.push(_paths[i]);
        }

        folders = this.sortAlpha(folders);
        files = this.sortAlpha(files);

        return folders.concat(files);
    }

    comparePath(a,b) {
        if (a.name<b.name)
                 return -1;
        if (a.name>b.name) 
            return 1;
        return 0;
    }

    sortAlpha(_paths) {
        return _paths.sort((a,b) => this.comparePath(a,b));
    }
}

var id_list = [];
class Path {
    constructor(_location,_name,_is_folder,_id,_parent_id) {
        this.location = _location;
        this.name = _name;
        this.is_folder = _is_folder;
        this.id = (_id == null) ? this.makeId() : this.id = _id;
        this.parent_id = _parent_id;
        this.is_editable = true;

        if (this.is_folder) {
            this.ext = "folder";
            this.is_editable = false;
            switch (this.name.toLowerCase()) {
                case "css":
                    this.ext = "css_folder";
                    break;
                case "sass":
                    this.ext = "sass_folder";
                    break;
                case "ttf":
                case "otf":
                case "font":
                case "fonts":
                    this.ext = "font_folder";
                    break;
                case "photos":
                case "images":
                case "photo":
                case "image":
                case "img":
                case "ico":
                case "icon":
                case "icons":
                case "png":
                case "svg":
                case "jpg":
                case "jpeg":
                case "gif":
                case "gifs":
                    this.ext = "img_folder";
                    break;
                case "html":
                    this.ext = "html_folder";
                    break;
                case "sound":
                case "music":
                case "mp3":
                    this.ext = "sound_folder";
                    break;
                case "temp":
                    this.ext = "temp_folder";
                    break;
                case "template":
                    this.ext = "template_folder";
                    break;
                case "text":
                case "txt":
                    this.ext = "text_folder";
                    break;
                case "script":
                case "scripts":
                case "js":
                case "ts":
                case "javascript":
                case "typescript":
                    this.ext = "script_folder";
                    break;
                case "video":
                case "clips":
                    this.ext = "video_folder";
                    break;
                case "home":
                    this.ext = "home_folder";
                    break;
                case "trash":
                case "old":
                    this.ext = "trash_folder";
                    break;
                case "bootstrap":
                    this.ext = "bootstrap_folder";
                    break;
                case "socorro":
                    this.ext = "socorro_folder";
                    break;
                case "tamarack":
                    this.ext = "tk_folder";
            }
        } else {
            var dotSplit = this.name.split(".");
            this.ext = dotSplit[dotSplit.length-1].toLowerCase();
            switch (this.name.split(".")[0].toLowerCase()) {
                case "readme":
                case "read":
                case "license":
                    this.ext = "readme_file";
            }
        }

    }
    
    randId() {
        return "path_" + Math.floor((Math.random() * 1000000) + 1);
    }

    makeId() {
        var new_id = this.randId();
        while(id_list.includes(new_id)) 
            new_id = this.randId();

        return new_id;
    }
}