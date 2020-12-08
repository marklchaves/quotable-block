let quotableClipboard = new ClipboardJS(".quotable", {
  text: function (trigger) {
    return trigger.firstChild.innerText + 
        " - " + 
        trigger.childNodes[1].innerText;
  },
});

quotableClipboard.on('success', function(e) {
  alert('Quote copied!');
});