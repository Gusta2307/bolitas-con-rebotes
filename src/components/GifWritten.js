var rec = null;
var chunks = []; // here we will store our recorded media chunks (Blobs)

export function startRecording(canvas, duration) {
	chunks = [];
	const stream = canvas.captureStream(); // grab our canvas MediaStream
	const options = {
		audioBitsPerSecond : 128000,
		videoBitsPerSecond : 2500000,
		mimeType : 'video/webm'
	}

	rec = new MediaRecorder(stream, options); // init the recorder 

	// every time the recorder has new data, we will store it in our array
	rec.ondataavailable = e => chunks.push(e.data);
	// only when the recorder stops, we construct a complete Blob from all the chunks
	// rec.onstop = e => exportVid(new Blob(chunks, {type: 'video/webm'}));
	
	rec.start();
	console.log(rec)
	setTimeout(()=>rec.stop(), duration*1000 + 500); // stop recording in 3s
  }


export function stopRecording(){
	console.log(rec)
	rec.stop();
	return chunks;
}


function exportVid(blob) {
	const vid = document.createElement('video');
	vid.src = URL.createObjectURL(blob);
	vid.controls = true;
	document.body.appendChild(vid);
	const a = document.createElement('a');
	a.download = 'myvid.webm';
	a.href = vid.src;
	a.textContent = 'download the video';
	a.style.color = '#fff';
	document.body.appendChild(a);
}