from flask import render_template, request, jsonify, session
import markdown

from server import app
from .game import game

def response(response_type, body):
    return jsonify({
        'type': response_type,
        'body': body,
    })

not_valid_input_message = "That is not a valid input right now."

@app.route('/')
def home():
    if 'current_scene_name' in session:
        game.current_scene_name = session['current_scene_name']
    else:
        game.current_scene_name = 'start'
    return render_template("home.html")

@app.route('/user_input', methods=['POST'])
def handle_input():
    user_input = request.get_json().get('userInput')
    next_scene = game.handle_input(user_input)
    if next_scene:
        session['current_scene_name'] = next_scene.name
        return response('scene', markdown.markdown(next_scene.description))
    else:
        return response('not valid input', not_valid_input_message)

@app.route('/restart_game', methods=['POST'])
def restart_game():
    session.clear()
    game.current_scene_name = 'start'
    return '200'
