# Python app using Flask

from flask import Flask, render_template, url_for
from os import environ
app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/signUpButton', methods=['GET', 'POST'])
def signUpButton():
    _email = request.form['email']
    _password = request.form['password']
    return "this is data"

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(environ.get('PORT', 8000))
    app.run(host='localhost', port=port)
