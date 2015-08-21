var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ErrorTolerantWalker = (function (_super) {
    __extends(ErrorTolerantWalker, _super);
    function ErrorTolerantWalker() {
        _super.apply(this, arguments);
    }
    ErrorTolerantWalker.prototype.visitNode = function (node) {
        try {
            _super.prototype.visitNode.call(this, node);
        }
        catch (e) {
            var msg = 'An error occurred visiting a node.'
                + '\nWalker: ' + this.getClassName()
                + '\nNode: ' + (node.getFullText ? node.getFullText() : '<unknown>')
                + '\n' + e;
            this.addFailure(this.createFailure(node.getStart ? node.getStart() : 0, node.getWidth ? node.getWidth() : 0, msg));
        }
    };
    ErrorTolerantWalker.prototype.getClassName = function () {
        var result = this.constructor.toString().match(/function\s+([\w\$]+)\s*\(/)[1] || '';
        if (result == null || result.length === 0) {
            throw new Error('Could not determine class name from input: ' + this.constructor.toString());
        }
        return result;
    };
    return ErrorTolerantWalker;
})(Lint.RuleWalker);
module.exports = ErrorTolerantWalker;
//# sourceMappingURL=ErrorTolerantWalker.js.map