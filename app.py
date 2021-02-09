from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')


@app.route('/api/hello')
def hello():
    return 'Hello Word !!!'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')