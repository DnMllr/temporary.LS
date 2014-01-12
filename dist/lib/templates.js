window.templatesB = {index:function anonymous(locals, cb, __) {
    __ = __ || [];
    __.r = __.r || blade.Runtime;
    if (!__.func) __.func = {}, __.blocks = {}, __.chunk = {};
    __.locals = locals || {};
    __.filename = "/Users/danielmiller/Desktop/experiment/index";
    try {
        with (__.locals) {
            __.line = 1, __.col = 1;
            __.push("<div" + ' id="todoHolder"' + ">");
            __.line = 2, __.col = 3;
            __.push("<div" + ' id="target"' + ">" + "</div>");
            __.line = 3, __.col = 3;
            __.r.bind("submit", "blade_" + __.r.ueid, function(e) {
                emit("submitted", find("#newTodo"));
                find("#newTodo").value = "";
                return false;
            }, __);
            __.push("<form" + ' onsubmit="return blade.Runtime.trigger(this,arguments);"');
            __.r.attrs({
                id: {
                    v: "blade_" + __.r.ueid++
                }
            }, __);
            __.push(">");
            __.line = 8, __.col = 5;
            __.push("<input" + ' type="text"' + ' id="newTodo"' + "/>" + "</form>" + "</div>");
        }
    } catch (e) {
        return cb(__.r.rethrow(e, __));
    }
    if (!__.inc) __.r.done(__);
    cb(null, __.join(""), __);
},todos:function anonymous(locals, cb, __) {
    __ = __ || [];
    __.r = __.r || blade.Runtime;
    if (!__.func) __.func = {}, __.blocks = {}, __.chunk = {};
    __.locals = locals || {};
    __.filename = "/Users/danielmiller/Desktop/experiment/todos";
    try {
        with (__.locals) {
            __.line = 1, __.col = 1;
            var i = 0;
            __.line = 2, __.col = 1;
            __.r.foreach(__, todos, function(todo) {
                __.line = 3, __.col = 3;
                if (todo.done) {
                    __.line = 4, __.col = 5;
                    __.push("<div" + ' class="todo done"' + ">");
                    __.line = 5, __.col = 7;
                    __.push(__.r.escape(i));
                    __.line = 6, __.col = 7;
                    __.push("<input" + ' type="checkbox"' + ' checked="checked"' + ' disabled="disabled"' + ' class="todoBox"' + "/>");
                    __.line = 7, __.col = 7;
                    __.push(__.r.escape(todo.name));
                    __.line = 8, __.col = 7;
                    __.r.bind("click", "blade_" + __.r.ueid, function(e) {
                        todo.remove = true;
                        emit("remove");
                    }, __);
                    __.push("<input" + ' type="button"' + ' class="remove"' + ' onclick="return blade.Runtime.trigger(this,arguments);"');
                    __.r.attrs({
                        id: {
                            v: "blade_" + __.r.ueid++
                        }
                    }, __);
                    __.push("/>" + "</div>");
                } else {
                    __.line = 13, __.col = 5;
                    __.push("<div" + ' class="todo"' + ">");
                    __.line = 14, __.col = 7;
                    __.push(__.r.escape(i));
                    __.line = 15, __.col = 7;
                    __.r.bind("click", "blade_" + __.r.ueid, function(e) {
                        todo.done = true;
                        render("#target");
                    }, __);
                    __.push("<input" + ' type="checkbox"' + ' class="todoBox"' + ' onclick="return blade.Runtime.trigger(this,arguments);"');
                    __.r.attrs({
                        id: {
                            v: "blade_" + __.r.ueid++
                        }
                    }, __);
                    __.push("/>");
                    __.line = 19, __.col = 7;
                    __.push(__.r.escape(todo.name) + "</div>");
                }
                i++;
            });
            __.line = 21, __.col = 1;
            __.push(__.r.escape("number of todos is " + __.r.escape((__.z = count) == null ? "" : __.z) + "\nnumber of todos completed is " + __.r.escape((__.z = left) == null ? "" : __.z) + ""));
            __.line = 24, __.col = 1;
            console.log(left);
        }
    } catch (e) {
        return cb(__.r.rethrow(e, __));
    }
    if (!__.inc) __.r.done(__);
    cb(null, __.join(""), __);
}};