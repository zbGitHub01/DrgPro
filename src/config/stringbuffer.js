
export default function StringBuffer() {
    this.__strings__ = [];
};
StringBuffer.prototype.append = function(str) {
    this.__strings__.push(str);
};
StringBuffer.prototype.toString = function() {
    return this.__strings__.join('');
};