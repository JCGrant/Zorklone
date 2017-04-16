from flask import render_template, request, jsonify

from server import app

scenes = {}
scenes['start'] = """
This is the start!
"""

def response(response_type, body):
    return jsonify({
        'type': response_type,
        'body': body,
    })

not_valid_input_message = "That is not a valid input right now."

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/user_input', methods=['POST'])
def handle_input():
    user_input = request.get_json().get('userInput')
    next_scene = scenes.get(user_input)
    if next_scene:
        return response('scene', next_scene)
    else:
        return response('not valid input', not_valid_input_message)
