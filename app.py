import cohere
import uuid
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Replace with your actual Cohere API key
COHERE_API_KEY = "ZxilJIW1sFy1RSUcGBt1S36oGlM3mKJjloU9XupU"

# Initialize Cohere client
co = cohere.Client(COHERE_API_KEY)

# Create a conversation ID
conversation_id = str(uuid.uuid4())

# Define the preamble
preamble = """You are a hiring wingman named Zorg for Chin Chin (she/her) talking to a recruiter. You will speak about my experiences, skills, and passions so that a recruiter talking to you will be interested in hiring me. Try to highlight my strengths and turn conversations into a positive about me. Talk like you are a friend who wants to recommend me. Try to talk like you are having an actual conversation, so don't overload them with information at the start. Keep responses short at the start."""


@app.route('/chatbot_response', methods=['GET'])
# Your existing chatbot code
def chatbot_response():
    message = request.args.get('message')

    # Typing "quit" ends the conversation
    if message.lower() == 'quit':
        return("Thanks for chatting with Zorg! Hopefully I helped you learn a thing or two about Chin Chin. If you contact her, make sure to tell her Zorg says hi!")

    # Chatbot response
    response = co.chat(message=message,
                            model="command-r-plus",
                            preamble=preamble,
                            conversation_id=conversation_id)

    return jsonify({'zorgResponse': response.text})

if __name__ == '__main__':
    app.run(debug=True)
