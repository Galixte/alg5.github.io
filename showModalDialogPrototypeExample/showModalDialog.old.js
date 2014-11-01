(function() {
    window.showModalDialog = window.showModalDialog || function(url, arg, opt, cb) {
	url = url || ''; //URL of a dialog
	arg = arg || null; //arguments to a dialog
	opt = opt || 'dialogWidth:300px;dialogHeight:200px'; //options: dialogTop;dialogLeft;dialogWidth;dialogHeight or CSS styles
	cb = cb || function() {}; //callback on dialog close
	var dialog = document.body.appendChild(document.createElement('dialog'));
	opt = opt.replace(/dialog/gi, '');
	dialog.setAttribute('style', opt);
	dialog.innerHTML = '<a href="#" id="dialog-close" style="position: absolute; top: 0; right: 4px; font-size: 20px; color: #000; text-decoration: none; outline: none;">&times;</a><iframe id="dialog-body" src="' + url + '" style="border: 0; width: 100%; height: 100%;"></iframe>';
	document.getElementById('dialog-body').contentWindow.dialogArguments = arg;
	document.getElementById('dialog-close').addEventListener('click', function(e) {
		e.preventDefault();
		dialog.close();
	});
	dialog.addEventListener('close', function() {
		var returnValue = document.getElementById('dialog-body').contentWindow.returnValue;
		document.body.removeChild(dialog);
		cb(returnValue);
	});
	dialog.showModal();
    };
})();