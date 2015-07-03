/**
 * Created by mac on 15/7/3.
 */

var Queue = function(limit){
    this.limit = limit || 1000;
    this.length = 0;

    this.head = 0;
    this.tail = 0;

    this.__array = new Array(this.limit);
}

Queue.prototype.push = function(e){
    if(this.length >= this.limit){
        return false;
    }

    this.__array[this.tail] = e;
    ++this.tail;
    ++this.length;

    if(this.tail == this.__array.length){
        this.tail = 0;
    }
    return true;
}

Queue.prototype.pop = function(){
    if(this.length === 0){
        return null;
    }
    var e = this.__array[this.head];
    ++this.head;
    --this.length;

    if(this.head == this.__array.length){
        this.head = 0;
    }
    return e;
}

Queue.prototype.size = function(){
    return this.length;
}

module.exports = Queue;