$(function () {
    $('#channel').val(localStorage.getItem('channel'));

    $('#getDweets').on('click', function () {
        var channel = $('#channel').val();
        localStorage.setItem('channel', channel);
        storedLogs(channel);
        realtimeLogs(channel);
    });
});

function storedLogs(channel) {
    var storedDiv = $('#stored');
    storedDiv.text("Waiting for data...");
    var first = true;
    dweetio.get_all_dweets_for(channel, function (err, dweets) {
        var logList = []
        if (dweets === 404) {
            storedDiv.text("No data found!");
            return;
        }
        for (var dweet of dweets) {
            if (first) {
                storedDiv.text("");
                first = false;
            }
            var text = dweet.content['msg'];
            var dt = new Date(dweet.created);
            var time = ("0" + dt.getHours()).slice(-2) + ":" + ("0" + dt.getMinutes()).slice(-2) + ":" + ("0" + dt.getSeconds()).slice(-2);
            logList.unshift(" [ " + time + " ] " + text);
        }

        storedDiv.append(logList.join([seperator = '<BR>']));

    });
}

function realtimeLogs(channel) {
    dweetio.stop_listening();
    var realtimeDiv = $('#realtime');
    realtimeDiv.text("Waiting for data...");
    var first = true;
    dweetio.listen_for(channel, function (dweet) {

        if (first) {
            realtimeDiv.text("");
            first = false;
        }
        var text = dweet.content['msg'];
        var dt = new Date(dweet.created);
        var time = ("0" + dt.getHours()).slice(-2) + ":" + ("0" + dt.getMinutes()).slice(-2) + ":" + ("0" + dt.getSeconds()).slice(-2);
        realtimeDiv.append(" [ " + time + " ] " + text + '<BR>');
    });
}