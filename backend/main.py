from flask import Flask, request, jsonify
import transformers
import torch
import accelerate

app = Flask(__name__)

# Initialize the model and pipeline outside of the function to avoid unnecessary reloading
model_id = "meta-llama/Meta-Llama-3-8B"
pipeline = transformers.pipeline(
    "text-generation",
    model=model_id,
    model_kwargs={"torch_dtype": torch.bfloat16},
    device_map="auto",
)

@app.route('/generate', methods=['POST'])
def generate():
    pipeline('give me a joke')

def main():
    pipeline('give me a joke')

if __name__ == '__main__':
    main()