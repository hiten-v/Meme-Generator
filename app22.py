from flask import Flask, request, jsonify, render_template_string, send_from_directory
import requests
import os

app = Flask(__name__)

IMGFLIP_USERNAME = "hitenv"
IMGFLIP_PASSWORD = "okokapi234"
IMGFLIP_URL = "https://api.imgflip.com"

# Serve HTML from the same folder
@app.route("/")
def index():
#     with open("index.html") as f:
#         return f.read()
    with open("index.html", encoding="utf-8") as f:
        return f.read(), 200, {"Content-Type": "text/html"}

# Serve CSS and JS directly
@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory(os.getcwd(), filename)

# Fetch meme templates based on user query
@app.route("/search_meme", methods=["POST"])
def search_meme():
    query = request.json.get("query", "").lower()
    response = requests.get(f"{IMGFLIP_URL}/get_memes")
    memes = response.json()["data"]["memes"]
    matching_memes = [m for m in memes if query in m["name"].lower()]
    return jsonify(matching_memes[:5]) if matching_memes else jsonify({"error": "No matching memes found"}), 404

# Generate meme with selected template
@app.route("/generate_meme", methods=["POST"])
def generate_meme():
    data = request.json
    template_id = data.get("template_id")
    top_text = data.get("top_text", "")
    bottom_text = data.get("bottom_text", "")

    response = requests.post(f"{IMGFLIP_URL}/caption_image", data={
        "template_id": template_id,
        "username": IMGFLIP_USERNAME,
        "password": IMGFLIP_PASSWORD,
        "text0": top_text,
        "text1": bottom_text
    })

    result = response.json()
    return jsonify({"meme_url": result["data"]["url"]}) if result["success"] else jsonify({"error": "Failed to generate meme"}), 400

if __name__ == "__main__":
    app.run(debug=True)
