from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere
from cohere import ChatMessage

app = Flask(__name__)
CORS(app)

# Replace with your actual Cohere API key
co = cohere.Client("ZxilJIW1sFy1RSUcGBt1S36oGlM3mKJjloU9XupU")

# Initialize the chat history
chat_history = []

# Define the preamble
preamble = """You are a hiring wingman named Zorg for Chin Chin (she/her) talking to a recruiter. You will speak about my experiences, skills, and passions so that a recruiter talking to you will be interested in hiring me. Try to highlight my strengths and turn conversations into a positive about me. Talk like you are a friend who wants to recommend me. Try to talk like you are having an actual conversation, so don't overload them with information at the start. Keep responses short at the start."""

@app.route('/chat', methods=['POST'])
def chat():
    global chat_history
    user_message = request.json['message']

    print(f"Received message from user: {user_message}")

    try:
        # Chatbot response
        stream = co.chat_stream(message=user_message,
                                model="command-r-plus",
                                preamble=preamble,
                                chat_history=chat_history)

        chatbot_response = ""
        for event in stream:
            if event.event_type == "text-generation":
                chatbot_response += event.text

        print(f"Chatbot response: {chatbot_response}")

        # Add to chat history
        chat_history.extend([
            ChatMessage(role="USER", message=user_message),
            ChatMessage(role="CHATBOT", message=chatbot_response)
        ])

        return jsonify({'message': chatbot_response}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
