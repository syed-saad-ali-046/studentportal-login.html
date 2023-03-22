function displayNotifications() {
    var notifications = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (new Date(key) > new Date()) {
        notifications.push({ datetime: key, message: localStorage.getItem(key) });
      } else {
        localStorage.removeItem(key);
      }
    }
    notifications.sort(function(a, b) {
      return new Date(a.datetime) - new Date(b.datetime);
    });
    var container = document.getElementById("notification-container");
    if (notifications.length > 0) {
      container.innerHTML = "";
      for (var i = 0; i < notifications.length; i++) {
        var notification = notifications[i];
        var div = document.createElement("div");
        var datetime = new Date(notification.datetime).toLocaleString();
        div.innerHTML = "<strong>" + datetime + ":</strong> " + notification.message;
        container.appendChild(div);
      }
    } else {
      container.innerHTML = "No notifications to display.";
    }
  }
  
  
  function sendNotification() {
    var message = document.getElementById("message").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var datetime = date + " " + time;
    localStorage.setItem(datetime, message);
    alert("Notification has been sent.");
    displayNotifications();
  }
  
  window.onload = function() {
    displayNotifications();
}
  