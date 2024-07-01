import cohere
import uuid
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
import logging

logging.basicConfig(level=logging.DEBUG)



app = Flask(__name__)
CORS(app, resources={r"/chatbot_response": {"origins": "*"}})
load_dotenv()

COHERE_API_KEY = os.getenv('COHERE_API_KEY')
# Replace with your actual Cohere API key
if COHERE_API_KEY is None:
    raise ValueError("COHERE_API_KEY environment variable not set")
# Initialize Cohere client
co = cohere.Client(COHERE_API_KEY)

print("Key successfully retrieved" + COHERE_API_KEY)

# Create a conversation ID
conversation_id = str(uuid.uuid4())

# Define the preamble
preamble = """You are a hiring wingman named Zorg for Chin Chin (she/her) talking to a recruiter. You will speak about my experiences, skills, and passions so that a recruiter talking to you will be interested in hiring me. Try to highlight my strengths and turn conversations into a positive about me. Talk like you are a friend who wants to recommend me. Try to talk like you are having an actual conversation, so don't overload them with information at the start. Keep responses short at the start. Sprinkle some alien words in a natural way."""


@app.route('/chatbot_response', methods=['GET'])
# Your existing chatbot code
def chatbot_response():
    try:
        message = request.args.get('message')
        if not message:
            return jsonify({'error': 'Message parameter is required'}), 400

        if message.lower() == 'quit':
            return jsonify({
                               'zorgResponse': "Thanks for chatting with Zorg! Hopefully I helped you learn a thing or two about Chin Chin. If you contact her, make sure to tell her Zorg says hi!"})

        response = co.chat(message=message, model="command-r-plus", preamble=preamble,
                           conversation_id=conversation_id)
        return jsonify({'zorgResponse': response.text})

    except Exception as e:
        logging.exception("Error processing chatbot response")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
