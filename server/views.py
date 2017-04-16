from flask import render_template, request

from server import app

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/input', methods=['POST'])
def user_input():
    text = request.get_json().get('input', '')
    print(text)
    return '200'
