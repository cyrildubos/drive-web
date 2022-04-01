class Path {
    constructor(path) {
        this.path = path;
    }

    next(path) {
        return new Path(
            [...this.path, path]
        );
    }

    previous() {
        let path = [...this.path];

        path.pop();

        return new Path(path);
    }

    withRoot() {
        return new Path(['drive', ...this.path]);
    }

    toString() {
        return this.path.join('/');
    }

    toFormatedString() {
        return '/ ' + this.path.join(' / ');
    }
}