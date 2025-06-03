
from flask import Flask, jsonify, render_template_string
import json

app = Flask(__name__)

@app.route("/")
def index():
    return render_template_string(open("index.html").read())

@app.route("/api/reports")
def reports():
    try:
        with open("reports.json", "r") as f:
            data = json.load(f)
    except FileNotFoundError:
        data = {}
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
