function log() {
    var strs = []
    for (var i in arguments) {
        switch (typeof(arguments[i])) {
            case 'string':
                strs.push(arguments[i])
                break
            case 'number':
                strs.push(arguments[i])
                break
            case 'function':
                strs.push('function ' + arguments[i] + '()')
                break
            case 'object':
                var str = ''
                for (var k in arguments[i]) {
                    if (typeof(arguments[i][k]) == 'function') {
                        str += 'function ' + k + '()\n'
                    } else if (typeof(arguments[i][k]) == 'object') {
                        str += 'object ' + k + '\n'
                    } else {
                        str += k + ' = ' + arguments[i][k] + '\n'
                    }
                }
                strs.push(str)
                break
        }
    }
    var modal = weex.requireModule('modal')
    modal.alert({
        'message': strs.join(', '),
        'okTitle': '确定'
    }, function() {
    })
}

if (typeof(exports) != 'undefined') {
    exports.log = log
}