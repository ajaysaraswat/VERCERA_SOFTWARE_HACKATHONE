from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route("/getTranscript", methods=["GET"])
def get_transcript():
    video_id = request.args.get("videoId")
    if not video_id:
        return jsonify({"error": "No videoId provided"}), 400

    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text_content = " ".join([entry["text"] for entry in transcript])
        return jsonify({"transcript": text_content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
