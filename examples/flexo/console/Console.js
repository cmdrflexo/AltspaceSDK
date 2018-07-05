altspaceutil.behaviors.Console = function(config) {
    this.type = 'Console'
    this.config = Object.assign({ maxlines: 10, passive: true, spacing: 0.5 }, config || {});

    this.awake = function(o) {
        this.object3d = o;
        altspaceutil.manageBehavior(this, this.object3d);

        this.lines = new THREE.Group();
        this.lines.position.y = this.config.maxlines * this.config.spacing;
        this.object3d.add(this.lines);
/*
        window.onerror = function(msg, url, lineNo, columnNo, error) {
            //var args = Array.prototype.slice.call(arguments);
            //args.unshift('#FF0000');
            //this.log.apply(this, args);
            console.log(msg, url, lineNo, columnNo, error);
            //if(this.config.passive) this.oldError.apply(console, arguments);
            return false;
        };*/

        this.oldLog = console.log;
        console.log = (function(message) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('#FFFFFF');
            this.log.apply(this, args);
            if(this.config.passive) this.oldLog.apply(console, arguments);
        }).bind(this);

        this.oldError = console.error;
        console.error = (function(message) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('#FF0000');
            this.log.apply(this, args);
            if(this.config.passive) this.oldError.apply(console, arguments);
        }).bind(this);

        this.oldWarn = console.warn;
        console.warn = (function(message) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('#FFFF00');
            this.log.apply(this, args);
            if(this.config.passive) this.oldWarn.apply(console, arguments);
        }).bind(this);
    }

    this.log = function(color, message) {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        var message = (color ? ('<color=' + color + '>') : '') + args.join(',');
        if(this.lines.children.length < this.config.maxlines) {
            var line = new THREE.Object3D();
            line.position.y -= this.config.spacing * this.lines.children.length;
            line.addBehavior(new altspaceutil.behaviors.NativeComponent('n-text', { text: message, height: 10, width: 20, fontSize: 4, horizontalAlign: 'left', verticalAlign: 'top' }));
            this.lines.add(line);
        } else {
            for(var line of this.lines.children) line.position.y += this.config.spacing;
            var line = this.lines.children[0];
            line.position.y = -this.config.spacing * (this.lines.children.length - 1);
            line.getBehaviorByType('n-text').data.text = message;
            this.lines.remove(line);
            this.lines.add(line);
        }
    }

    this.dispose = function() {
        if(this.oldLog) console.log = this.oldLog;
        if(this.oldError) console.error = this.oldError;
        if(this.oldWarn) console.warn = this.oldWarn;
        if(this.lines && this.lines.parent) this.lines.parent.remove(this.lines);
        this.oldLog = null;
        this.oldError = null;
        this.oldWarn = null;
        this.lines = null;
    }
};