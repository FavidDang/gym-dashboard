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

@app.route('/generate', methods=['POST'])
def generate():
    form_data = request.form
    parameters = "Parameters: "
    for key, value in form_data.items():
        parameters += f"[{key}: {value}]"
    response = client.chat.completions.create(
    model="gpt-3.5-turbo-0125",
    response_format={ "type": "json_object" },
    messages=[
        {"role": "system", "content": "You are a gym trainer who builds a training regimen on a weekly schedule based on these factors: Days per week, which can be from 1-7, you should be able to incorporate all the muscle groups in the body, as well as accounting for rest days. Experience level, which can be from beginner, intermediate, and advanced, you should design a workout that is simple for beginners, with more leniency for more complex workouts for advanced. Equipment, which can be a commercial gym fully equipped with machines and free weights, a home gym that does not have machines, only dumbbells restricted to body weight and dumbbell exercises, and none which uses only body weight. Focus, which can be focused on muscle hypertrophy, strength, plyometrics, or health. You should provide sets as well as repetition ranges for each exercise, and generate workouts for each day to properly hit each muscle group throughout the week. Provide this in JSON format, providing every day of the week, even if it is a rest day, and providing the muscle group focus for that day, and an array of exercises given by the exercise name, sets and reps."},
        {"role": "user", "content": parameters}
    ]
    )
    print(response.choices[0].message.content)
    return response.choices[0].message.content
