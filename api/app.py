from flask import Flask, request, jsonify
from predict import get_prediction
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


@app.route('/')
def hello_world():
    return 'React App for Image Classification'


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
        img_bytes = file.read()
        class_id, class_name = get_prediction(image_bytes=img_bytes)
        return jsonify({'class_id': class_id, 'class_name': class_name})
