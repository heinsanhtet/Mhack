from flask import Flask, flash, request, redirect, url_for, render_template
from werkzeug.utils import secure_filename

import io
import os

# Imports the Google Cloud client library
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types

# Instantiates a client
client = speech.SpeechClient()

# The name of the audio file to transcribe

app = Flask(__name__)

UPLOAD_FOLDER = '/Users/heinsan/Documents/Mhack/flask-by-example/uploads'
ALLOWED_EXTENSIONS = {'m4a', 'mp3', 'wav', 'wma', 'raw'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def hello():
    return "Hello World!"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'audio' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['audio']
        # if user does not select file, browser also
        # submit an empty part without filename
        print(file)
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            # file_name = os.path.join(
            #     os.path.dirname(__file__),
            #     'resources',
            #     'audio.raw')

            # Loads the audio into memory
            with io.open(os.path.join(app.config['UPLOAD_FOLDER'], filename), 'rb') as audio_file:
                content = audio_file.read()
                audio = types.RecognitionAudio(content=content)

            config = types.RecognitionConfig(
                encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
                sample_rate_hertz=16000,
                language_code='en-US')

            # Detects speech in the audio file
            response = client.recognize(config, audio)
            print("Obtained client response")
            print(response)

            for result in response.results:
                print('Transcript: {}'.format(result.alternatives[0].transcript))

            # return redirect(url_for('upload',
            #                         filename=filename))
            return response.results

@app.route('/<string:page_name>/')
def render_static(page_name):
    return render_template('%s.html' % page_name)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
