from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

client = OpenAI()
app = Flask(__name__)
CORS(app)

# Initialize the model and pipeline outside of the function to avoid unnecessary reloading

@app.route('/', methods=['GET'])
def test():
    return "Hello World."

@app.route('/generate', methods=['GET'])
def generate():
    return "Hello World!"
